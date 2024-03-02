

export interface RegisterRequestDTO {
    name: string;
    email: string;
    password: string;
    userType: string;
};

export interface RegisterResponseDTO {
    message: string;
    acessToken?: string;
    userType?: string;
};

export interface LoginRequestDTO {
    email: string;
    password: string;
};

export interface LoginResponseDTO {
    message: string;
    acessToken?: string;
    userType?: string;
};

export interface acessTokenDTO {
    id: string;
    email: string;
    userType: string;
};