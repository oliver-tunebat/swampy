import { MailDataRequired, ResponseError } from "@sendgrid/mail";
import sendgridClient from "./sendgridClient";

// send a single email
async function sendEmail(mailData: MailDataRequired) {
    try {
        return { response: (await sendgridClient.send(mailData))[0] };
    } catch (error) {
        return { response: (error as ResponseError).response, error: error };
    }
}

export async function sendTransactionalEmail(to: string, userId: string, templateId: string, dynamicTemplateData?: { [key: string]: unknown }) {
    return await sendEmail({
        to: to,
        from: {
            email: process.env.TRANSACTIONAL_EMAIL_ADDRESS ?? "",
            name: process.env.TRANSACTIONAL_EMAIL_NAME,
        },
        templateId: templateId,
        dynamicTemplateData: {
            SITE_URL: process.env.NEXT_PUBLIC_CURRENT_URL,
            UNSUBSCRIBE_URL: `${process.env.NEXT_PUBLIC_CURRENT_URL}/unsubscribe?id=${userId}`,
            ...dynamicTemplateData,
        },
    });
}

export async function sendInternalEmail(to: string, templateId: string, replyTo?: string, dynamicTemplateData?: { [key: string]: unknown }) {
    return await sendEmail({
        to: to,
        replyTo: replyTo,
        from: {
            email: process.env.INTERNAL_EMAIL_ADDRESS ?? "",
            name: process.env.INTERNAL_EMAIL_NAME,
        },
        templateId: templateId,
        dynamicTemplateData: {
            ...dynamicTemplateData,
        },
    });
}