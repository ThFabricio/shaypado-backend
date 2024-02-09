

export interface RegisterRequestDTO {
    name: string;
    email: string;
    password: string;
    userType: string;
    weigth?: string;
    height?: string;
    workoutDays?: string;
    any_disease?: string;
};

export interface RegisterResponseDTO {
    message: string;
    acessToken?: string;
};

export interface LoginRequestDTO {
    email: string;
    password: string;
};

export interface LoginResponseDTO {
    message: string;
    acessToken?: string;
};

export interface acessTokenDTO {
    id: string;
    email: string;
    userType: string;
};