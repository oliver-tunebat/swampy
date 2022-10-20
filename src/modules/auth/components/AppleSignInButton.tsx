import * as React from "react";
import { Button, ButtonProps } from "@mui/material";
import { supabaseClient } from "../../../common/utils/supabaseClient";
import { Apple } from "@mui/icons-material";

export default function AppleLoginButton(props: ButtonProps) {
    return (
        <Button
            color="apple"
            startIcon={<Apple />}
            onClick={async () => await signInWithApple()}
            {...props}
        >
            Continue with Apple
        </Button>
    );
}

async function signInWithApple() {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: "apple",
    });
}
