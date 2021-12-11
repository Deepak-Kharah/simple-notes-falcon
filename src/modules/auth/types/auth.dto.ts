export declare interface LoginDto {
    username: string;
    password: string;
}
export declare interface RegisterDto {
    username: string;
    password: string;
}

export declare interface UserWithoutPasswordDto {
    username: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
}
