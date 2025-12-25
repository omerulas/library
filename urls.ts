import type { IRoleFlags, URLRequirements } from "./interface";
import { BASE_URL } from "./settings";

function createUrl({ path, query }: URLRequirements) {
    const url = new URL(path, BASE_URL);

    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }

    return url.toString();
}

export const urls = {
    /* Static create url */
    csrf: createUrl({ path: 'set-csrf' }),
    check: createUrl({ path: 'check-user' }),
    login: createUrl({ path: 'login' }),
    logout: createUrl({ path: 'logout' }),
    /* Method based create url */
    // users: (filter?: IRoleFlags) => createUrl({ path: 'users', query: filter }),
}