import { NextApiHandler } from "next";
import { adminSupabaseClient } from "../../../common/utils/adminSupabaseClient";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { PrismaClient } from "@prisma/client";

const handler: NextApiHandler = async (req, res) => {
    if (req.method === "DELETE") {
        const supabaseClient = createServerSupabaseClient({ req, res });

        // get authenticated user
        const {
            data: { session },
        } = await supabaseClient.auth.getSession();

        const userId = session?.user?.id;

        if (!userId) {
            res.status(401).send("Unable to verify user.");
            return;
        }

        // delete user from supabase
        const { error } = await adminSupabaseClient.auth.admin.deleteUser(
            userId,
        );

        if (error) {
            res.status(500).send({});
            return;
        }

        // delete user from database
        const prisma = new PrismaClient();
        await prisma.user.delete({
            where: {
                id: userId,
            },
        });

        // clear auth token cookie to deauthenticate user
        res.setHeader("Set-Cookie", "supabase-auth-token=; Max-Age=0; Path=/");
        res.status(200).send({});
        return;
    }

    res.status(405).send("Operation unavailable.");
};

export default handler;