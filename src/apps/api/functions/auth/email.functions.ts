import { resetPasswordEmail } from '~/packages/templates';
import { sendEmail } from '../../configs';

type SendResetPasswordEmailParams = {
    email: string;
    username: string;
    resetUrl: string;
};

export const sendResetPasswordEmail = async ({ email, username, resetUrl }: SendResetPasswordEmailParams) => {
    const html = resetPasswordEmail({ username, resetUrl, language: 'fr' });
    await sendEmail({
        to: email,
        subject: 'Réinitialisation du mot de passe',
        html
    })
};
