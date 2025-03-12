interface AuthenticationOptions {
  authenticate: (email: string, password: string) => Promise<any>;
  cookieName: string;
  cookiePassword: string;
}

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

export const authConfig: AuthenticationOptions = {
  authenticate,
  cookieName: 'adminjs',
  cookiePassword: 'secret',
};