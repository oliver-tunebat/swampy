import * as React from "react";
import { Button, ButtonProps } from "@mui/material";
import { Spotify } from "mdi-material-ui";
import { supabaseClient } from "../../../common/utils/supabaseClient";
import showSnackbar from "../../notifications/utils/showSnackbar";
import getCurrentURL from "../../../common/utils/getCurrentURL";

export default function SpotifyLoginButton(props: ButtonProps) {
    const handleClick = async () => {
        const { error } = await supabaseClient.auth.signInWithOAuth({
            provider: "spotify",
            options: {
                scopes: "user-top-read user-read-recently-played",
                redirectTo: getCurrentURL(true),
            },
        });

        if (error) {
            showSnackbar("Unable to login with Spotify.");
        }
    };

    return (
        <Button
            color="spotify"
            startIcon={<Spotify />}
            onClick={handleClick}
            {...props}
        >
            Continue with Spotify
        </Button>
    );
}
