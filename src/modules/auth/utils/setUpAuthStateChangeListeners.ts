import { supabaseClient } from "../../../common/utils/supabaseClient";
import Router from "next/router";

export function setUpAuthStateChangeListeners() {
    supabaseClient.auth.onAuthStateChange(async (event, session) => {
        // reload the page when the user logs out
        if (event == "SIGNED_OUT") {
            await Router.push("/");
            location.reload();
        }
    });
}
