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

export const INITAL_CORPORATE: ICorporate = {
    id: null,
    tax_id: null,
    name: null,
    authorized: null,
    slug: null,
    status: true
}

export const INITAL_PUBLICATION: IPublication = {
    id: null,
    file: null,
    corporate: null,
    isbn: null,
    name: null,
    slug: null,
    status: false
}

export const INITAL_PAGE: IPage = {
    id: null,
    publication: null,
    page_number: null,
    file: null,
    view: 0,
    status: false
}