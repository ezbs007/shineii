interface AuthenticationOptions {
    authenticate: (email: string, password: string) => Promise<any>;
    cookieName: string;
    cookiePassword: string;
}
export declare const authConfig: AuthenticationOptions;
export {};
