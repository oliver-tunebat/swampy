import * as React from "react";
import { Button } from "@mui/material";
import { supabase } from "../../../common/utils/supabaseClient";
import { Apple } from "@mui/icons-material";

export default function AppleLoginButton() {
    return (
        <Button
            size="large"
            variant="contained"
            color="apple"
            startIcon={<Apple />}
            onClick={async () => await signInWithSpotify()}
        >
            Login With Apple
        </Button>
    );
}

async function signInWithSpotify() {
    const { user, session, error } = await supabase.auth.signIn(
        {
            provider: "apple",
        },
        {
            // scopes: "",
        }
    );
}
