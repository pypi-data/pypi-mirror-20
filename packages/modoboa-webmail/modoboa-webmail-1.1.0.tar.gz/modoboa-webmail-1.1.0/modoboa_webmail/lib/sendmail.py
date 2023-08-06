import smtplib

from django.template.loader import render_to_string

from modoboa.lib.email_utils import prepare_addresses
from modoboa.lib.cryptutils import get_password
from modoboa.parameters import tools as param_tools

from ..exceptions import WebmailInternalError
from . import get_imapconnector, clean_attachments


def send_mail(request, form, posturl=None):
    """Email verification and sending.

    If the form does not present any error, a new MIME message is
    constructed. Then, a connection is established with the defined
    SMTP server and the message is finally sent.

    :param request: a Request object
    :param posturl: the url to post the message form to
    :return: a 2-uple (True|False, HttpResponse)
    """
    if not form.is_valid():
        editormode = request.user.parameters.get_value("editor")
        listing = render_to_string(
            "modoboa_webmail/compose.html",
            {"form": form, "noerrors": True,
             "body": form.cleaned_data.get("body", "").strip(),
             "posturl": posturl},
            request
        )
        return False, dict(status="ko", listing=listing, editor=editormode)

    msg = form.to_msg(request)
    rcpts = prepare_addresses(form.cleaned_data["to"], "envelope")
    for hdr in ["cc", "cci"]:
        if form.cleaned_data[hdr]:
            msg[hdr.capitalize()] = prepare_addresses(form.cleaned_data[hdr])
            rcpts += prepare_addresses(form.cleaned_data[hdr], "envelope")
    try:
        conf = dict(param_tools.get_globa_parameters("modoboa_webmail"))
        if conf["smtp_secured_mode"] == "ssl":
            s = smtplib.SMTP_SSL(conf["smtp_server"], conf["smtp_port"])
        else:
            s = smtplib.SMTP(conf["smtp_server"], conf["smtp_port"])
            if conf["smtp_secured_mode"] == "starttls":
                s.starttls()
    except Exception as text:
        raise WebmailInternalError(str(text))

    if conf["smtp_authentication"]:
        try:
            s.login(request.user.username, get_password(request))
        except smtplib.SMTPException as err:
            raise WebmailInternalError(str(err))
    try:
        s.sendmail(request.user.email, rcpts, msg.as_string())
        s.quit()
    except smtplib.SMTPException as err:
        raise WebmailInternalError(str(err))

    sentfolder = request.user.parameters.get_value("sent_folder")
    get_imapconnector(request).push_mail(sentfolder, msg)
    clean_attachments(request.session["compose_mail"]["attachments"])
    del request.session["compose_mail"]
    return True, {}
