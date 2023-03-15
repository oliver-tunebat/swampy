import sendgrid from "@sendgrid/mail";

const sendgridClient = sendgrid;

sendgridClient.setApiKey(process.env.SENDGRID_API_KEY ?? "");

export default sendgridClient;