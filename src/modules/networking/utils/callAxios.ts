import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { trackEvent } from "../../analytics/utils/plausible";
import showSnackbar from "../../notifications/utils/showSnackbar";

// helper function for calling axios asynchronously
export async function callAxiosMethod<T>(
    method:
        | "get"
        | "delete"
        | "head"
        | "options"
        | "post"
        | "put"
        | "patch"
        | "postForm"
        | "putForm"
        | "patchForm",
    url: string,
    showErrorSnack = false,
    config?: AxiosRequestConfig,
    errorSnackMessage?: string,
): Promise<{ response?: AxiosResponse<T>; error?: AxiosError }> {
    try {
        switch (method) {
            case "get":
                return { response: await axios.get(url, config) };
            case "delete":
                return { response: await axios.delete(url, config) };
            case "head":
                return { response: await axios.head(url, config) };
            case "options":
                return { response: await axios.options(url, config) };
            case "post":
                return { response: await axios.post(url, config) };
            case "put":
                return { response: await axios.put(url, config) };
            case "patch":
                return { response: await axios.patch(url, config) };
            case "postForm":
                return { response: await axios.postForm(url, config) };
            case "putForm":
                return { response: await axios.putForm(url, config) };
            case "patchForm":
                return { response: await axios.patchForm(url, config) };
        }
    } catch (error) {
        // throw if it's not an axios error, allowing it be handled elsewhere
        if (!axios.isAxiosError(error)) {
            throw error;
        }

        if (error.response) {
            trackEvent("Axios Error", {
                status: error.response.status,
                // handle full urls and relative paths
                path: new URL(
                    url.indexOf(process.env.NEXT_PUBLIC_CURRENT_URL ?? " ") === -1
                        ? `${process.env.NEXT_PUBLIC_CURRENT_URL}${url}`
                        : url).pathname,
            });
        }

        // snack message logic for errors
        if (showErrorSnack) {
            let message = errorSnackMessage;

            if (!errorSnackMessage) {
                message = error.response?.status.toString().startsWith("5")
                    ? "Sorry. Something went wrong on our end."
                    : error.response?.data;
            }

            showSnackbar(message, "error");
        }

        return { response: error.response, error: error };
    }
}

export const callAxios = {
    get: async (
        url: string,
        showErrorSnack = false,
        config?: AxiosRequestConfig,
        errorSnackMessage?: string,
    ) => {
        return await callAxiosMethod(
            "get",
            url,
            showErrorSnack,
            config,
            errorSnackMessage,
        );
    },
    delete: async <T>(
        url: string,
        showErrorSnack = false,
        config?: AxiosRequestConfig,
        errorSnackMessage?: string,
    ) => {
        return await callAxiosMethod<T>(
            "delete",
            url,
            showErrorSnack,
            config,
            errorSnackMessage,
        );
    },
    head: async <T>(
        url: string,
        showErrorSnack = false,
        config?: AxiosRequestConfig,
        errorSnackMessage?: string,
    ) => {
        return await callAxiosMethod<T>(
            "head",
            url,
            showErrorSnack,
            config,
            errorSnackMessage,
        );
    },
    options: async <T>(
        url: string,
        showErrorSnack = false,
        config?: AxiosRequestConfig,
        errorSnackMessage?: string,
    ) => {
        return await callAxiosMethod<T>(
            "options",
            url,
            showErrorSnack,
            config,
            errorSnackMessage,
        );
    },
    post: async <T>(
        url: string,
        showErrorSnack = false,
        config?: AxiosRequestConfig,
        errorSnackMessage?: string,
    ) => {
        return await callAxiosMethod<T>(
            "post",
            url,
            showErrorSnack,
            config,
            errorSnackMessage,
        );
    },
    put: async <T>(
        url: string,
        showErrorSnack = false,
        config?: AxiosRequestConfig,
        errorSnackMessage?: string,
    ) => {
        return await callAxiosMethod<T>(
            "put",
            url,
            showErrorSnack,
            config,
            errorSnackMessage,
        );
    },
    patch: async <T>(
        url: string,
        showErrorSnack = false,
        config?: AxiosRequestConfig,
        errorSnackMessage?: string,
    ) => {
        return await callAxiosMethod<T>(
            "patch",
            url,
            showErrorSnack,
            config,
            errorSnackMessage,
        );
    },
    postForm: async <T>(
        url: string,
        showErrorSnack = false,
        config?: AxiosRequestConfig,
        errorSnackMessage?: string,
    ) => {
        return await callAxiosMethod<T>(
            "postForm",
            url,
            showErrorSnack,
            config,
            errorSnackMessage,
        );
    },
    putForm: async <T>(
        url: string,
        showErrorSnack = false,
        config?: AxiosRequestConfig,
        errorSnackMessage?: string,
    ) => {
        return await callAxiosMethod<T>(
            "putForm",
            url,
            showErrorSnack,
            config,
            errorSnackMessage,
        );
    },
    patchForm: async <T>(
        url: string,
        showErrorSnack = false,
        config?: AxiosRequestConfig,
        errorSnackMessage?: string,
    ) => {
        return await callAxiosMethod<T>(
            "patchForm",
            url,
            showErrorSnack,
            config,
            errorSnackMessage,
        );
    },
};
