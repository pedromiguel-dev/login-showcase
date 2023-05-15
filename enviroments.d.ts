declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string;
            ACCESS_TOKEN_S: string,
            REFRESH_TOKEN_S: string
        }
    }
    namespace Express {
        interface Request {
            user: any
        }
    }
    namespace JWT {
        interface JwtPayload {
            email: string,
            roles: string[]
        }
    }
}

export {}