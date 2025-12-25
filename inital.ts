import type { ExecutionResponse, ICorporate, IPage, IPublication, User } from "./interface"

export const INITAL_EXECUTION: ExecutionResponse = {
    data: null,
    status: null,
}

export const INITIAL_USER: User = {
    id: null,
    email: null,
    first_name: null,
    last_name: null,
    password: null,
    password2: null,
    corporate: null,
    is_active: true,
    is_staff: false,
    is_superuser: false,
}
