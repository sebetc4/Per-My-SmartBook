/**
 * Visibility
 */
export enum Visibility {
    PUBLIC = 'public',
    PRIVATE = 'private',
}

export enum ColorMode {
    LIGHT = 'light',
    DARK = 'dark',
}

export enum AuthProvider {
    CREDENTIALS = 'credentials',
    GOOGLE = 'google'
}

export const allVisibilityValues = ['public', 'private'] as const;

export type FormItems = {
    value: string;
    label: string;
}