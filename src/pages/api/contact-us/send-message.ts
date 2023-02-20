import { NextApiHandler } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { sendInternalEmail } from "../../../modules/messaging/utils/sendEmail";

const handler: NextApiHandler = async (req, res) => {
    if (req.method === "POST") {
        const supabaseClient = createServerSupabaseClient({ req, res });

        // get authenticated user
        const {
            data: { user },
        } = await supabaseClient.auth.getUser();

        if (!user?.email) {
            res.status(401).send("Unable to verify user.");
            return;
        }

        // get message from body and replace line breaks with <br>
        const message = (req.body.data.message as string).replace(/(?:\r\n|\r|\n)/g, "<br>");

        const messageLengthLimit = 5000;
        if (message.length > messageLengthLimit) {
            res.status(400).send(`The message is longer than the character limit of ${messageLengthLimit}.`);
            return;
        }

        const { error } = await sendInternalEmail(
            process.env.SUPPORT_EMAIL_ADDRESS ?? "",
            process.env.CONTACT_US_TEMPLATE_ID ?? "",
            user.email,
            {
                USER_EMAIL: user.email,
                USER_MESSAGE: message,
            },
        );

        if (error) {
            res.status(500).send("Failed to send message.");
            return;
        }

        res.status(200).send({});
        return;
    }

    res.status(405).send("Operation unavailable.");
    return;
};

export default handler;