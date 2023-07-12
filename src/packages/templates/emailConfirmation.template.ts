import { Language, Path } from '../types';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

const logoUrl = 'https://my-storybook-public.s3.eu-west-3.amazonaws.com/mail/logo.png'

const logoTextUrl = 'https://my-storybook-public.s3.eu-west-3.amazonaws.com/mail/logo-text.png'

const padlockUrl = 'https://my-storybook-public.s3.eu-west-3.amazonaws.com/mail/padlock.png'

const getMailTitle = (language: Language): string => {
    switch (language) {
        case 'fr':
            return 'réinitilisation-mot-de-passe';
        case 'en':
            return `reset-password`;
    }
};

const getTitle = (language: Language): string => {
    switch (language) {
        case 'fr':
            return 'Vous avez oublié votre mot de passe ?';
        case 'en':
            return `FORGOT YOUR PASSWORD?`;
    }
};

const getHi = (language: Language): string => {
    switch (language) {
        case 'fr':
            return 'Bonjour';
        case 'en':
            return `Hi`;
    }
};

const getMainSentence = (language: Language): string => {
    switch (language) {
        case 'fr':
            return "Si vous n'avez pas effectué cette demande, veuillez ignorer cet e-mail. Dans le cas contraire, veuillez cliquer sur le bouton ci-dessous pour procéder à la modification de votre mot de passe :";
        case 'en':
            return `If you have not done so, please ignore this e-mail. Otherwise, please click on the button below to change your password:`;
    }
};

const getRequestSentence = (language: Language): string => {
    switch (language) {
        case 'fr':
            return 'Vous avez fait une demande de changement de mot de passe !';
        case 'en':
            return 'You have requested a password change!';
    }
};

const getResetButtonText = (language: Language): string => {
    switch (language) {
        case 'fr':
            return 'RÉINITIALISER LE MOT DE PASSE';
        case 'en':
            return 'RESET PASSWORD';
    }
};

const getLinkSentence = (language: Language): string => {
    switch (language) {
        case 'fr':
            return "Si vous rencontrez des problèmes avec le bouton ci-dessus, copiez et collez l'URL ci-dessous dans votre navigateur Web.";
        case 'en':
            return 'If you are having trouble with the button above, copy and paste the URL below into your web browser.';
    }
};

const getQuestionTitle = (language: Language): string => {
    switch (language) {
        case 'fr':
            return 'Vous avez une question?';
        case 'en':
            return 'Have a question?';
    }
};

const getQuestionSentence = (language: Language): string => {
    switch (language) {
        case 'fr':
            return 'Nous sommes là pour vous aider, cliquez ici pour';
        case 'en':
            return "We're here to help, click here to";
    }
};

const getContactSentence = (language: Language): string => {
    switch (language) {
        case 'fr':
            return 'nous contacter';
        case 'en':
            return 'contact us';
    }
};

const getHome = (language: Language): string => {
    switch (language) {
        case 'fr':
            return 'Accueil';
        case 'en':
            return 'Home';
    }
};

const getContact = (language: Language): string => {
    switch (language) {
        case 'fr':
            return 'Contact';
        case 'en':
            return 'Contact';
    }
};

const getLibrary = (language: Language): string => {
    switch (language) {
        case 'fr':
            return 'Librairie';
        case 'en':
            return 'Library';
    }
};

type ResetPasswordEmailHtmlOptions = {
    username: string;
    resetUrl: string;
    language: Language;
};

export const resetPasswordEmail = ({ username, resetUrl, language }: ResetPasswordEmailHtmlOptions) =>
    `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>${getMailTitle(language)}</title><!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><style type="text/css">.rollover:hover .rollover-first { max-height:0px!important; display:none!important; } .rollover:hover .rollover-second { max-height:none!important; display:inline-block!important; } .rollover div { font-size:0px; } u ~ div img + div > div { display:none; } #outlook a { padding:0; } span.MsoHyperlink,span.MsoHyperlinkFollowed { color:inherit; mso-style-priority:99; } a.es-button { mso-style-priority:100!important; text-decoration:none!important; } a[x-apple-data-detectors] { color:inherit!important; text-decoration:none!important; font-size:inherit!important; font-family:inherit!important; font-weight:inherit!important; line-height:inherit!important; } .es-desk-hidden { display:none; float:left; overflow:hidden; width:0; max-height:0; line-height:0; mso-hide:all; } .es-header-body a:hover { color:#1376c8!important; } .es-content-body a:hover { color:#0b5394!important; } .es-footer-body a:hover { color:#333333!important; } .es-infoblock a:hover { color:#cccccc!important; } .es-button-border:hover { border-color:#3d5ca3 #3d5ca3 #3d5ca3 #3d5ca3!important; background:#ffffff!important; } .es-button-border:hover a.es-button,.es-button-border:hover button.es-button { background:#ffffff!important; } .es-button-border:hover a.es-button { background:#ffffff!important; } td .es-button-border-1689012022303:hover { border-color:#507948 #507948 #507948 #507948!important; background:#ffffff!important; } td .es-button-border:hover a.es-button-1689012059094 { color:#A7B677!important; }@media only screen and (max-width:600px) {*[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } .es-header-body p { } .es-content-body p { } .es-footer-body p { } .es-infoblock p { } h1 { font-size:20px!important; text-align:center } h2 { font-size:16px!important; text-align:left } h3 { font-size:20px!important; text-align:center } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:20px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:16px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body a { font-size:10px!important } .es-content-body p, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body a { font-size:12px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img, .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover div, .es-m-txt-c .rollover div, .es-m-txt-l .rollover div { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:14px!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } .h-auto { height:auto!important } h2 a { text-align:left } a.es-button { border-left-width:0px!important; border-right-width:0px!important } a.es-button, button.es-button { display:inline-block!important } .es-button-border { display:inline-block!important } }</style></head>
<body style="width:100%;height:100%;padding:0;Margin:0"><div class="es-wrapper-color" style="background-color:#FAFAFA"><!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#fafafa"></v:fill> </v:background><![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA"><tr><td valign="top" style="padding:0;Margin:0"><table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top"><tr><td class="es-adaptive" align="center" style="padding:0;Margin:0"><table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#e8ded5;width:600px" cellspacing="0" cellpadding="0" bgcolor="#e8ded5" align="center"><tr><td style="Margin:0;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px;background-color:#3b5935" bgcolor="#3B5935" align="left"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:197px" valign="top"><![endif]--><table cellspacing="0" cellpadding="0" align="left" class="es-left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"><tr><td align="left" style="padding:0;Margin:0;width:197px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td style="padding:0;Margin:0;font-size:0px" align="center"><img class="adapt-img" src="${logoUrl}" alt="logo" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none" width="138"></td>
</tr></table></td></tr></table><!--[if mso]></td><td style="width:20px"></td><td style="width:343px" valign="top"><![endif]--><table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"><tr><td align="left" style="padding:0;Margin:0;padding-right:20px;padding-top:45px;width:343px"><table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="center" style="padding:0;Margin:0;font-size:0"><img class="adapt-img" src="${logoTextUrl}" alt="My SmartBook" width="323" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td></tr></table></td></tr></table><!--[if mso]></td></tr></table><![endif]--></td></tr></table></td>
</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important"><tr><td style="padding:0;Margin:0;background-color:#fafafa" bgcolor="#fafafa" align="center"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#e8ded5;width:600px" cellspacing="0" cellpadding="0" bgcolor="#e8ded5" align="center"><tr><td style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:45px;background-color:transparent" bgcolor="transparent" align="left"><table cellspacing="0" cellpadding="0" align="right" class="es-right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"><tr><td valign="top" align="center" style="padding:0;Margin:0;width:560px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left top" role="presentation"><tr><td style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0px" align="center"><img src="${padlockUrl}" alt="padlock" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none" width="280"></td>
</tr><tr><td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px"><h1 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:normal;line-height:24px;color:#333333"><strong>${getTitle(language)}</strong><br type="_moz"></h1></td></tr><tr><td align="center" style="padding:0;Margin:0;padding-right:40px;padding-left:40px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;letter-spacing:0;color:#666666;font-size:14px"><strong>${getHi(language)}, ${username}</strong><br></p></td>
</tr><tr><td align="left" style="padding:0;Margin:0;padding-left:40px;padding-right:35px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;letter-spacing:0;color:#666666;font-size:14px;text-align:center">${getRequestSentence(language)}</p></td></tr><tr><td align="center" style="padding:0;Margin:0;padding-right:40px;padding-left:40px;padding-top:25px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;letter-spacing:0;color:#666666;font-size:14px">${getMainSentence(language)}</p></td>
</tr><tr><td align="center" style="Margin:0;padding-top:40px;padding-right:10px;padding-bottom:40px;padding-left:10px"><span class="es-button-border es-button-border-1689012022303" style="border-style:solid;border-color:#3b5935;background:#ffffff;border-width:2px;display:inline-block;border-radius:10px;width:auto"><a href="${resetUrl}" class="es-button es-button-1689012059094" target="_blank" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;font-size:14px;color:#3b5935;padding:10px 20px 10px 20px;display:inline-block;background:#FFFFFF;border-radius:10px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:bold;font-style:normal;line-height:17px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #FFFFFF">${getResetButtonText(language)}</a></span></td>
</tr><tr><td align="center" style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px !important;letter-spacing:0;color:#666666;font-size:14px">${getLinkSentence(language)}</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px !important;letter-spacing:0;color:#666666;font-size:14px">&nbsp;</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px !important;letter-spacing:0;color:#666666;font-size:14px"><a target="_blank" style="mso-line-height-rule:exactly;text-decoration:none;font-size:14px;color:#3b5935" href="${resetUrl}">${resetUrl}</a></p></td></tr></table></td></tr></table></td>
</tr></table></td>
</tr></table><table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top"><tr><td style="padding:0;Margin:0;background-color:#fafafa" bgcolor="#fafafa" align="center"><table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"><tr><td style="Margin:0;padding-right:20px;padding-left:20px;padding-top:10px;padding-bottom:30px;background-color:#3b5935" bgcolor="#3B5935" align="left"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td valign="top" align="center" style="padding:0;Margin:0;width:560px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px"><h2 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:19px;color:#ffffff"><strong>${getQuestionTitle(language)}</strong><br type="_moz"></h2>
</td></tr><tr><td align="left" style="padding:0;Margin:0;padding-bottom:5px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;letter-spacing:0;color:#ffffff;font-size:14px">${getQuestionSentence(language)} <a target="_blank" style="mso-line-height-rule:exactly;text-decoration:none;font-size:14px;color:#ffffff" href="${baseUrl}${Path.CONTACT}">${getContactSentence(language)}</a><br type="_moz"></p></td></tr></table></td></tr></table></td></tr></table></td>
</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important"><tr><td style="padding:0;Margin:0;background-color:#fafafa" bgcolor="#fafafa" align="center"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" bgcolor="transparent" align="center"><tr><td style="padding:0;Margin:0;padding-top:15px;background-position:left top" align="left"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td valign="top" align="center" style="padding:0;Margin:0;width:600px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td style="padding:0;Margin:0"><table class="es-menu" width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr class="links"><td style="Margin:0;border:0;padding-top:0px;padding-right:5px;padding-bottom:1px;padding-left:5px" id="esd-menu-id-0" width="33.33%" valign="top" bgcolor="transparent" align="center"><a target="_blank" href="${baseUrl}" style="mso-line-height-rule:exactly;text-decoration:none;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;display:block;color:#3b5935">${getHome(language)}</a></td>
<td style="Margin:0;border:0;padding-top:0px;padding-right:5px;padding-bottom:1px;padding-left:5px;border-left:1px solid #864f27" id="esd-menu-id-1" esdev-border-color="#3d5ca3" width="33.33%" valign="top" bgcolor="transparent" align="center"><a target="_blank" href="${baseUrl}${Path.CONTACT}" style="mso-line-height-rule:exactly;text-decoration:none;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;display:block;color:#3b5935">${getContact(language)}</a></td>
<td style="Margin:0;border:0;padding-top:0px;padding-right:5px;padding-bottom:1px;padding-left:5px;border-left:1px solid #864f27" id="esd-menu-id-2" esdev-border-color="#3d5ca3" width="33.33%" valign="top" bgcolor="transparent" align="center"><a target="_blank" href="${baseUrl}${Path.PUBLIC_STORIES}" style="mso-line-height-rule:exactly;text-decoration:none;font-size:14px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;display:block;color:#3b5935">${getLibrary(language)}</a></td></tr></table></td></tr><tr><td style="padding:0;Margin:0;padding-right:20px;padding-bottom:20px;padding-left:20px;font-size:0" align="center"><table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td style="padding:0;Margin:0;border-bottom:1px solid #fafafa;background:none;height:1px;width:100%;margin:0px"></td>
</tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></div></body></html>
`;
