import * as React from "react";
import { ButtonProps, darken, useTheme } from "@mui/material";
import getCurrentURL from "../../../common/utils/getCurrentURL";
import { roboto } from "../../../getDesignTokens";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import SignInButton from "./SignInButton";

export default function GoogleSignInButton(props: ButtonProps) {
    const { sx, ...otherProps } = props;

    const theme = useTheme();

    return (
        <SignInButton
            color="neutral"
            variant="outlined"
            startIcon={
                <Image
                    src="/images/google-icon.png"
                    alt="Google Icon"
                    width={18}
                    height={18}
                />}
            sx={{
                fontFamily: roboto.style.fontFamily,
                backgroundColor: "#fff",
                color: grey[900],
                "&:hover": {
                    backgroundColor: darken("#fff", Number(theme.palette.tonalOffset)),
                },
                "&:active": {
                    backgroundColor: darken("#fff", Number(theme.palette.tonalOffset) * 2),
                },
                "& .MuiButton-startIcon": {
                    mr: 3,
                },
                ...sx,
            }}
            providerName="Google"
            providerOptions={{
                provider: "google",
                options: {
                    redirectTo: getCurrentURL(true),
                    queryParams: {
                        access_type: "offline",
                        prompt: "consent",
                    },
                },
            }}
            {...otherProps}
        />
    );
}
