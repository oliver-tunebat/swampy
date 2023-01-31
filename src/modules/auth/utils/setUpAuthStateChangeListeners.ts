import { supabaseClient } from "../../../common/utils/supabaseClient";
import Router from "next/router";

let isAlreadySetUp = false;

export function setUpAuthStateChangeListeners() {
    if (isAlreadySetUp) {
        return;
    }

    supabaseClient.auth.onAuthStateChange(async (event) => {
        // reload the page when the user logs out
        if (event == "SIGNED_OUT") {
            await Router.push("/");
            location.reload();
        }
    });

    isAlreadySetUp = true;
}
