export interface UserCreationDto {
    name: string;
    password: string;
}

export interface UserUpdateDto {
    name?: string;
    password?: string;
}