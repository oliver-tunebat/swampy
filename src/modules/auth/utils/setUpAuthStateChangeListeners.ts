import { supabaseClient } from "../../../common/utils/supabaseClient";

export function setUpAuthStateChangeListeners() {
    supabaseClient.auth.onAuthStateChange((event, session) => {
        // reload the page when the user logs out
        if (event == "SIGNED_OUT") {
            location.reload();
        }
    });
}
