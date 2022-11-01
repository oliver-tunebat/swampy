import { callAxios } from "../../networking/utils/callAxios";

export async function deleteUser() {
    const { error } = await callAxios.delete("/api/auth/user", true);

    if (!error) location.reload();
}
