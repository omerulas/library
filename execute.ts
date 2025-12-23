import { useProcess } from "@/stores/process";
import Cookies from "js-cookie"
import type { ExecutionResponse, IExecution, RequestMethods } from "./interface";
import { useMessage } from "@/stores/message";

export class PersonalizedRequest {

    private getBaseHeaders() {
        return new Headers({
            "Accept": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken") || ""
        })
    }

    private createInit(
        method: RequestMethods,
        body?: any,
        multipart?: boolean
    ) {
        const headers = this.getBaseHeaders();
        const methodUpper = method.toUpperCase();

        const base: RequestInit = { credentials: "include" as const, headers: headers, method: methodUpper };

        if (["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
            if (multipart) {
                // body bir FormData nesnesi olmalı, onu doğrudan döndürün.
                return { ...base, body: body };
            } else {
                // Content-Type başlığını ekleyin
                headers.append("Content-Type", "application/json");
                return { ...base, body: JSON.stringify(body || {}) };
            }
        }

        return base;
    }

    async send({
        method = 'GET',
        path = '',
        body = {},
        multipart = false
    }: IExecution
    ) {
        const process = useProcess()
        const message = useMessage()

        const value: ExecutionResponse = { data: null, status: null }

        try {
            process.loading = true

            const init = this.createInit(method, body, multipart)

            const request = await fetch(path, init)
            const response = await request.json()
            console.log(path, response)

            value.data = response.data;
            value.status = request.status;

            if (response.message) {
                message.show(response.message)
            }
        }
        catch (error: any) {
            console.log(error)
        }
        finally { process.loading = false }

        return { data: value.data, status: value.status }
    }

}

export const request = new PersonalizedRequest()