// https://stackoverflow.com/questions/41179474/use-object-literal-as-typescript-enum-values
export class CustomError {
    static readonly INVALID_ID = new CustomError('This ID is invalid', 400);
    static readonly BAD_REQUEST = new CustomError('Invalid request', 400);
    static readonly EMAIL_ALREADY_EXISTS = new CustomError('This email already exists', 400);
    static readonly EMAIL_ALREADY_EXISTS_OTHER_PROVIDER = new CustomError('This email already exists with other provider',400);
    static readonly OPENAI_NO_KEY = new CustomError('OpenAI key is required', 400);
    
    static readonly USER_HAS_ALREADY_VOTED = new CustomError('The user has already voted', 400);

    static readonly UNAUTHORIZED = new CustomError('Request requires user authentication', 401);
    static readonly WRONG_PASSWORD = new CustomError('Wrong password', 401);
    static readonly WRONG_EMAIL = new CustomError('Wrong email', 401);
    static readonly FORBIDEN = new CustomError('This action is forbiden', 403);
    static readonly OPENAI_UNAUTHORIZED = new CustomError('OpenAI key is not valid', 405);
    static readonly NOT_FOUND = new CustomError('The requested resource could not be found', 404);
    static readonly METHOD_NOT_ALLOWED = new CustomError('This method is not allowed', 405);
    static readonly OPENAI_NO_CREDIT = new CustomError('No credit on OpenAI key', 405);
    static readonly STORY_IS_ALREADY_BEING_GENERATED = new CustomError('This story is already being generated', 405);
    static readonly INVALID_TOKEN = new CustomError('Invalid token', 498);
    static readonly INTERNAL_SERVER_ERROR = new CustomError('Internal server error', 500);
    static readonly OPENAI_SERVICE_UNVAILABLE = new CustomError('OpenAI service unavailable', 503);
    private constructor(public readonly message: string, public readonly statusCode: number) {}
}
