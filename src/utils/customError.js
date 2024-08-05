class CustomError extends Error {
    constructor(message, code, details = []) {
        super(message);
        this.code = code;
        this.details = details || [];
    }
}

export default CustomError;
