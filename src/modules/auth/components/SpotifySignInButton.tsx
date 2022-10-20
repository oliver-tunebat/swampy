import * as React from "react";
import { Button, ButtonProps } from "@mui/material";
import { Spotify } from "mdi-material-ui";
import { supabaseClient } from "../../../common/utils/supabaseClient";

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
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: "spotify",
        options: {
            scopes: "user-top-read user-read-recently-played",
        },
    });
}
