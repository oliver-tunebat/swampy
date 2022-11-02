import { Button, ButtonProps } from "@mui/material";
import { supabaseClient } from "../../../common/utils/supabaseClient";
import { Apple } from "@mui/icons-material";
import getCurrentURL from "../../../common/utils/getCurrentURL";
import showSnackbar from "../../notifications/utils/showSnackbar";

export default function AppleLoginButton(props: ButtonProps) {
    return (
        <Button
            color="neutral"
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
        options: {
            redirectTo: getCurrentURL(true),
        },
    });

    if (error) showSnackbar("Unable to login with Apple.");
}
