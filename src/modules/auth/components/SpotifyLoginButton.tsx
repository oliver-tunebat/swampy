import * as React from "react";
import { Button } from "@mui/material";
import { Spotify } from "mdi-material-ui";
import { supabase } from "../../../common/utils/supabaseClient";

export default function SpotifyLoginButton() {
    return (
        <Button
            size="large"
            variant="contained"
            color="spotify"
            startIcon={<Spotify />}
            onClick={async () => await signInWithSpotify()}
        >
            Login With Spotify
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
