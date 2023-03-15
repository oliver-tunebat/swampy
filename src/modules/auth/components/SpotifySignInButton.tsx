import * as React from "react";
import { ButtonProps } from "@mui/material";
import { Spotify } from "mdi-material-ui";
import getCurrentURL from "../../../common/utils/getCurrentURL";
import { roboto } from "../../../getDesignTokens";
import SignInButton from "./SignInButton";

export default function SpotifySignInButton(props: ButtonProps) {
    const { sx, ...otherProps } = props;

    return (
        <SignInButton
            color="spotify"
            variant="contained"
            startIcon={<Spotify />}
            sx={{
                fontFamily: roboto.style.fontFamily,
                "& .MuiButton-startIcon": {
                    mr: 3,
                },
                ...sx,
            }}
            providerName="Spotify"
            providerOptions={{
                provider: "spotify",
                options: {
                    scopes: "user-top-read user-read-recently-played",
                    redirectTo: getCurrentURL(true),
                },
            }}
            {...otherProps}
        />
    );
}
