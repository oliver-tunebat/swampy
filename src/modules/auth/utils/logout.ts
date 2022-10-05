import { NextRouter } from "next/router";
import { supabase } from "../../../common/utils/supabaseClient";

export async function logOut(router: NextRouter) {
    const { error } = await supabase.auth.signOut();

    router?.push("/api/auth/logout");
}
