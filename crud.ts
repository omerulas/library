import { useProcess } from "@/stores/process";
import type { ExecutionResponse } from "./interface";
import { INITAL_EXECUTION } from "./inital";

export async function crud({
    create,
    update
}: {
    create?: () => Promise<ExecutionResponse>,
    update?: () => Promise<ExecutionResponse>,
}) {

    const process = useProcess()
    let result: ExecutionResponse = {...INITAL_EXECUTION};

    switch (true) {
        case process.isAddMode: {
            if (create) {
                result = await create()
            }
            break;
        }
        case process.isEditMode: {
            if (update) {
                result = await update()
            }
            break;
        }
        default: {
            break;
        }
    }

    return result
}
