export interface loginResType  {
    isAuthenticated: boolean;
    user: {
        _id: string,
        username: string,
        email: string,
        role: string,
    }
    token: string,
}