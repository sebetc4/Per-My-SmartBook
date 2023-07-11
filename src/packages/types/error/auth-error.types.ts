// SignUp
export const allSignUpUsernameErrors = ['is-required', 'too-short', 'too-long'] as const;
export type SignUpUsernameError = typeof allSignUpUsernameErrors[number]

export const allSignUpEmailErrors = ['already-associated-account', 'is-required', 'not-valid'] as const;
export type SignUpEmailError = typeof allSignUpEmailErrors[number];

export const allSignUpPasswordErrors = ['is-required', 'too-short', 'too-long'] as const;
export type SignUpPasswordError = typeof allSignUpPasswordErrors[number];

// SignIn
export const allSignInEmailErrors = ['no-associated-account'] as const;
export type SignInEmailError = typeof allSignInEmailErrors[number];

export const allSignInPasswordErrors= ['wrong-password'] as const
export type SignInPasswordError = typeof allSignInPasswordErrors[number];


// Modify password settings
export const allPasswordFormCurrentPasswordErrors = ['wrong'] as const;
export type PasswordFormCurrentPasswordError = typeof allPasswordFormCurrentPasswordErrors[number];

export const allPasswordFormNewPasswordErrors = ['same-as-the-old', 'is-required', 'too-short', 'too-long'] as const;
export type NewPasswordError = typeof allPasswordFormNewPasswordErrors[number];

export const allPasswordFormConfirmPasswordErrors = ['is-required', 'not-same-as-the-new-password'] as const;
export type PasswordFormConfirmPasswordError = typeof allPasswordFormConfirmPasswordErrors[number];

// Forgot password
export const allForgotPasswordEmailErrors = ['is-required', 'not-valid', 'wrong-email', 'wrong-auth-provider'] as const;
export type ForgotPasswordEmailError = typeof allForgotPasswordEmailErrors[number];

// Reset password
export const allResetPasswordNewPasswordErrors = ['is-required', 'too-short', 'too-long'] as const;
export type ResetPasswordNewPasswordError = typeof allResetPasswordNewPasswordErrors[number];

export const allResetPasswordConfirmPasswordErrors = ['is-required', 'not-same-as-the-new-password'] as const;
export type ResetPasswordConfirmPasswordError = typeof allResetPasswordConfirmPasswordErrors[number];
