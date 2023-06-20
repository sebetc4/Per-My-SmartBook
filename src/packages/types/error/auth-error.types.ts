export const allSignUpUsernameErrors = ['is-required', 'too-short', 'too-long'] as const;
export type SignUpUsernameError = typeof allSignUpUsernameErrors[number]

export const allSignUpEmailErrors = ['already-associated-account', 'is-required', 'not-valid'] as const;
export type SignUpEmailError = typeof allSignUpEmailErrors[number];

export const allSignUpPasswordErrors = ['is-required', 'too-short', 'too-long'] as const;
export type SignUpPasswordError = typeof allSignUpPasswordErrors[number];

// Login
export const allLoginEmailErrors = ['no-associated-account'] as const;
export type LoginEmailError = typeof allLoginEmailErrors[number];

export const allLoginPasswordErrors= ['wrong'] as const
export type LoginPasswordError = typeof allLoginPasswordErrors[number];
