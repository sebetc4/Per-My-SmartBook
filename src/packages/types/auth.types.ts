import { UserSession } from './user.types';

export enum SessionStatus {
    VALID = 'valid',
    INVALID = 'invalid',
}

export type Session = {
    status: SessionStatus;
    user: UserSession | null;
} | null;
