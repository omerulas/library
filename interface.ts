export type RequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface URLRequirements {
    path: string,
    query?: Record<string, any>
}

export interface IExecution {
    method: RequestMethods;
    path: string;
    body?: Record<string, any>;
    multipart?: boolean;
}

export interface ExecutionResponse {
    data: any | null;
    status: number | null;
}

export interface ICredentials {
    email: string,
    password: string
}

interface AbstractUser{
    id: number | null;
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    password: string | null;
    password2: string | null
    corporate: string | null;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    is_authenticated: boolean;
}

export type AuthUser = Pick<
    AbstractUser,
    'email' |
    'corporate' |
    'is_authenticated' |
    'is_superuser'
>

export type User = Omit<
    AbstractUser,
    'is_authenticated'
>

export interface ICorporate {
    id: number | null;
    tax_id: string | null;
    name: string | null;
    authorized: number | null;
    slug: string | null;
    status: boolean;
};

export interface IRoleFlags {
    is_staff: boolean;
    is_superuser: boolean;
}

export type UserRole = 'corporate' | 'standard' | 'admin';

export type RoleConfiguration = Record<UserRole, IRoleFlags>;

export interface IPublication {
    id: string | null;
    status: boolean;
    file: string | null;
    name: string | null;
    corporate: number | null;
    isbn: string | null;
    slug: string | null;
};

export interface IPage{
    id: number | null;
    publication: string | null;
    page_number: number | null;
    file: string | null;
    view: number;
    status: boolean
}