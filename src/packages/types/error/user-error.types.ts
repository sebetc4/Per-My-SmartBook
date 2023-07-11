export const allAccountFormEmailErrors = ['already-associated-account', 'is-required', 'not-valid'] as const;
export type AccountFormEmailError = typeof allAccountFormEmailErrors[number];

export const allAccountFormUsernameErrors = ['is-required', 'too-short', 'too-long'] as const;
export type AccountFormUsernameError = typeof allAccountFormUsernameErrors[number];

export const allAddModifyOpenaiKeyErrors = ['is-required', 'not-valid'] as const;
export type AddModifyOpenaiKeyError = typeof allAddModifyOpenaiKeyErrors[number];