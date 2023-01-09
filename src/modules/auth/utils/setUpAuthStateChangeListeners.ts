import { supabaseClient } from "../../../common/utils/supabaseClient";
import Router from "next/router";
import useNotificationsStore from "../../notifications/store";

let isAlreadySetUp = false;

export function setUpAuthStateChangeListeners() {
    if (isAlreadySetUp) {
        return;
    }

    supabaseClient.auth.onAuthStateChange(async (event) => {
        if (event == "SIGNED_IN") {
            // display notification consent request
            // for logged in users that haven't made a choice
            useNotificationsStore
                .getState()
                .showSiteActionSnackbar("NOTIFICATIONS");
        }

        // reload the page when the user logs out
        if (event == "SIGNED_OUT") {
            await Router.push("/");
            location.reload();
        }
    });

    isAlreadySetUp = true;
}
