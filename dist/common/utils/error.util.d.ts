export declare class ErrorUtil {
    static getErrorCode(error: Error): string;
    static getErrorMessage(error: Error): string;
    static createErrorResponse(error: Error): {
        success: boolean;
        message: string;
        error: {
            code: string;
            details: string;
        };
    };
}
