import { NextRouter } from "next/router";
import { supabaseClient } from "../../../common/utils/supabaseClient";

export async function logOut(router: NextRouter) {
    const { error } = await supabaseClient.auth.signOut();

    router?.push("");
}
