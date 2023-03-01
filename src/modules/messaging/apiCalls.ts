import { callAxios } from "../networking/utils/callAxios";
import { trackEvent } from "../analytics/utils/plausible";

// MODIFY DATA

export async function sendMessage(message: string) {
    trackEvent("Sent Contact Us Message");

    return await callAxios.post("/api/contact-us/send-message", true, { data: { message } });
}