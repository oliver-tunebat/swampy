import { NextApiHandler } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { prismaClient } from "../../../common/utils/prismaClient";
import { sendTransactionalEmail } from "../../../modules/messaging/utils/sendEmail";

const handler: NextApiHandler = async (req, res) => {
    if (req.method === "POST") {
        const supabaseClient = createServerSupabaseClient({ req, res });

        // get authenticated user
        const {
            data: { user },
        } = await supabaseClient.auth.getUser();

        if (!user) {
            res.status(401).send("Unable to verify user.");
            return;
        }

        // set createdAt time using db time
        const result = await prismaClient.$executeRaw
        `UPDATE "Profile" 
        SET "createdAt" = CURRENT_TIMESTAMP(3)
        WHERE id::text = ${user.id} AND "createdAt" IS NULL;`;

        if (result !== 1) {
            res.status(409).send("Already created.");
            return;
        }

        const profile = await prismaClient.profile.findUnique({
            where: {
                id: user.id,
            },
        });

        res.status(200).send(profile);

        if (profile?.email && process.env.WELCOME_EMAIL_TEMPLATE_ID) {
            sendTransactionalEmail(profile?.email, user.id, process.env.WELCOME_EMAIL_TEMPLATE_ID);
        }

        return;
    }

    res.status(405).send("Operation unavailable.");
    return;
};

export default handler;