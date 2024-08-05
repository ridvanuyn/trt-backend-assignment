const ERROR_CODES = {
    DATABASE_CONNECTION_ERROR: {
        code: 'DB_CONN_ERR',
        message: 'Database connection error',
    },
    VALIDATION_ERROR: {
        code: 'VALIDATION_ERR',
        message: 'Validation error',
    },
    AUTHENTICATION_ERROR: {
        code: 'AUTH_ERR',
        message: 'You are not authenticated',
    },
    AUTHENTICATION_TIMEOUT_ERROR: {
        code: 'AUTH_TIME_ERR',
        message: 'Token timeout',
    },
    GOOGLE_AUTHENTICATION_ERROR: {
        code: 'GOOGLE_AUTH_ERR',
        message: 'Google authentication error',
    },
    AUTHORIZATION_ERROR: {
        code: 'AUTHZ_ERR',
        message: 'You are not Authorized this operation',
    },
    NOT_FOUND_ERROR: {
        code: 'NOT_FOUND_ERR',
        message: 'Not found',
    },
    UNKNOWN_ERROR: {
        code: 'UNKNOWN_ERR',
        message: 'Unknown error',
    },
    RATE_LIMIT: {
        code: 'RATE_LIMIT',
        message: 'Too many requests from this IP, please try again later',
    },
    ALREADY_REGISTERED: {
        code: 'ALRDY_REGISTRED',
        message: 'User already registered',
    },
    OPERATION_NOT_COMLETED: {
        code: 'NOT_CMPLETED',
        message: 'Operation can not completed',
    },
    INVALID_CREDENTIAL: {
        code: 'IVLD_CRDTIAL',
        message: 'Invalid credentials',
    },
};

export default ERROR_CODES;
