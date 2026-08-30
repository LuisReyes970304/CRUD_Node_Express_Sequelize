export interface UserCreationDto {
    name: string;
    email: string;
    password: string;
    role: "user";

}

export interface UserUpdateDto {
    name?: string;
    password?: string;
}

export interface UpdateToAdmin {
    name: string;
    password: string;
    role: "admin";
}