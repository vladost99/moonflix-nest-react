export interface IJwtPayload {
    username: string;
    displayName: string;
    _id: string;
    iat: number;
    exp: number;
}