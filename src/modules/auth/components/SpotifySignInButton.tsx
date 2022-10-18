import * as React from "react";
import { Button, ButtonProps } from "@mui/material";
import { Spotify } from "mdi-material-ui";
import { supabase } from "../../../common/utils/supabaseClient";

export default function SpotifyLoginButton(props: ButtonProps) {
    return (
        <Button
            color="spotify"
            startIcon={<Spotify />}
            onClick={async () => await signInWithSpotify()}
            {...props}
        >
            Continue with Spotify
        </Button>
    );
}

async function signInWithSpotify() {
    const { user, session, error } = await supabase.auth.signIn(
        {
            provider: "spotify",
        },
        {
            scopes: "user-top-read user-read-recently-played",
        }
    );
}
