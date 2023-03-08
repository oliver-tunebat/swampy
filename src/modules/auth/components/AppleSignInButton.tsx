import React from "react";
import { ButtonProps } from "@mui/material";
import { Apple } from "@mui/icons-material";
import getCurrentURL from "../../../common/utils/getCurrentURL";
import { roboto } from "../../../getDesignTokens";
import SignInButton from "./SignInButton";

export default function AppleSignInButton(props: ButtonProps) {
    const { sx, ...otherProps } = props;

    return (
        <SignInButton
            color="neutral"
            variant="contained"
            startIcon={<Apple />}
            sx={{
                fontFamily: roboto.style.fontFamily,
                "& .MuiButton-startIcon": {
                    mr: 3,
                },
                ...sx,
            }}
            providerName="Apple"
            providerOptions={{
                provider: "apple",
                options: {
                    redirectTo: getCurrentURL(true),
                },
            }}
            {...otherProps}
        />
    );
}
