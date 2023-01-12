import { NextApiHandler } from "next";
import { adminSupabaseClient } from "../../../common/utils/adminSupabaseClient";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const handler: NextApiHandler = async (req, res) => {
    if (req.method === "DELETE") {
        const supabaseClient = createServerSupabaseClient({req, res});

        const {
            data: { session },
        } = await supabaseClient.auth.getSession();

        if (!session) {
            res.status(401).send("Unable to verify user.");
            return;
        }

        const { error } = await adminSupabaseClient.auth.admin.deleteUser(
            session?.user?.id,
        );
        if (error) {
            res.status(500).send({});
            return;
        }

        // clear auth token cookie to deauthenticate user
        res.setHeader("Set-Cookie", "supabase-auth-token=; Max-Age=0; Path=/");
        res.status(200).send({});
        return;
    }

    res.status(405).send("Operation unavailable.");
};

export default handler;