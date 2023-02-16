import sendgridClient from "./sendgridClient";

export async function sendTransactionalEmail(to: string, userId: string, templateId: string) {
    return await sendgridClient.send({
        to: to,
        from: {
            email: process.env.TRANSACTIONAL_EMAIL_ADDRESS ?? "",
            name: process.env.TRANSACTIONAL_EMAIL_NAME,
        },
        templateId: templateId,
        dynamicTemplateData: {
            SITE_URL: process.env.NEXT_PUBLIC_CURRENT_URL,
            UNSUBSCRIBE_URL: `${process.env.NEXT_PUBLIC_CURRENT_URL}/unsubscribe?id=${userId}`,
        },
    });
}