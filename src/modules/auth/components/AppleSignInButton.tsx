import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { supabaseClient } from "../../../common/utils/supabaseClient";
import { Apple } from "@mui/icons-material";
import getCurrentURL from "../../../common/utils/getCurrentURL";
import showSnackbar from "../../notifications/utils/showSnackbar";

export default function AppleLoginButton(props: ButtonProps) {
    const handleClick = async () => {
        const { error } = await supabaseClient.auth.signInWithOAuth({
            provider: "apple",
            options: {
                redirectTo: getCurrentURL(true),
            },
        });

        if (error) showSnackbar("Unable to login with Apple.");
    };

    return (
        <Button
            color="neutral"
            startIcon={<Apple />}
            onClick={handleClick}
            {...props}
        >
            Continue with Apple
        </Button>
    );
}
