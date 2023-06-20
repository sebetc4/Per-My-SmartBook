export const allAccountFormEmailErrors = ['already-associated-account', 'is-required', 'not-valid'] as const;
export type AccountFormEmailError = typeof allAccountFormEmailErrors[number];

export const allAccountFormUsernameErrors = ['is-required', 'too-short', 'too-long'] as const;
export type AccountFormUsernameError = typeof allAccountFormUsernameErrors[number];

export const allPasswordFormCurrentPasswordErrors = ['wrong'] as const;
export type PasswordFormCurrentPasswordError = typeof allPasswordFormCurrentPasswordErrors[number];

export const allPasswordFormNewPasswordErrors = ['same-as-the-old', 'is-required', 'too-short', 'too-long'] as const;
export type PasswordFormNewPasswordError = typeof allPasswordFormNewPasswordErrors[number];

export const allPasswordFormConfirmPasswordErrors = ['is-required', 'not-same-as-the-old'] as const;
export type PasswordFormConfirmPasswordError = typeof allPasswordFormConfirmPasswordErrors[number];

export const allAddModifyOpenaiKeyErrors = ['is-required', 'not-valid'] as const;
export type AddModifyOpenaiKeyError = typeof allAddModifyOpenaiKeyErrors[number];
