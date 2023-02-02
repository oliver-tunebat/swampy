import { NextApiHandler } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { prismaClient } from "../../../common/utils/prismaClient";

const handler: NextApiHandler = async (req, res) => {
    if (req.method === "GET") {
        const supabaseClient = createServerSupabaseClient({ req, res });

        // get authenticated user
        const {
            data: { user },
        } = await supabaseClient.auth.getUser();

        if (!user) {
            res.status(401).send("Unable to verify user.");
            return;
        }

        const profile = await prismaClient.profile.findUnique({
            where: {
                id: user.id,
            },
        });

        res.status(200).send(profile);
        return;
    }

    res.status(405).send("Operation unavailable.");
    return;
};

export default handler;