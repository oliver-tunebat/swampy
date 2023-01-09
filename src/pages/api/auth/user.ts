// TODO replace deprecated method
import { withApiAuth } from "@supabase/auth-helpers-nextjs";
import { adminSupabaseClient } from "../../../common/utils/adminSupabaseClient";

export default withApiAuth(async (req, res, supabaseClient) => {
    if (req.method === "DELETE") {
        const {
            data: { user },
        } = await supabaseClient.auth.getUser();

        if (!user?.id) {
            res.status(400).send("Unable to delete user.");
            return;
        }

        const { error } = await adminSupabaseClient.auth.admin.deleteUser(
            user.id,
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
});
