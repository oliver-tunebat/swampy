import * as React from "react";
import { Button, ButtonProps } from "@mui/material";
import { supabaseClient } from "../../../common/utils/supabaseClient";
import showSnackbar from "../../notifications/utils/showSnackbar";
import { roboto } from "../../../getDesignTokens";
import { SignInWithOAuthCredentials } from "@supabase/supabase-js";

export default function SignInButton(props: SignInButtonProps) {
    const { providerOptions, providerName, sx, ...otherProps } = props;

    const handleClick = async () => {
        const { error } = await supabaseClient.auth.signInWithOAuth(providerOptions);

        if (error) {
            showSnackbar(`Unable to sign in with ${providerName}.`);
        }
    };

    return (
        <Button
            onClick={handleClick}
            sx={{
                // roboto is required by Google branding guidelines
                // https://developers.google.com/identity/branding-guidelines
                fontFamily: roboto.style.fontFamily,
                "& .MuiButton-startIcon": {
                    // must be at least 24dp/px to comply with Google branding guidelines
                    // https://developers.google.com/identity/branding-guidelines
                    mr: 3,
                },
                ...sx,
            }}
            {...otherProps}
        >
            Continue with {providerName}
        </Button>
    );
}

interface SignInButtonProps extends ButtonProps {
    providerName: string
    providerOptions: SignInWithOAuthCredentials
}