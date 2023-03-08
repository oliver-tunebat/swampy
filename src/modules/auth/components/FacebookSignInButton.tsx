import * as React from "react";
import { ButtonProps } from "@mui/material";
import getCurrentURL from "../../../common/utils/getCurrentURL";
import { roboto } from "../../../getDesignTokens";
import SignInButton from "./SignInButton";
import { FacebookRounded } from "@mui/icons-material";

export default function FacebookSignInButton(props: ButtonProps) {
    const { sx, ...otherProps } = props;

    return (
        <SignInButton
            color="facebook"
            variant="contained"
            startIcon={<FacebookRounded />}
            sx={{
                fontFamily: roboto.style.fontFamily,
                "& .MuiButton-startIcon": {
                    mr: 3,
                },
                ...sx,
            }}
            providerName="Facebook"
            providerOptions={{
                provider: "facebook",
                options: {
                    redirectTo: getCurrentURL(true),
                },
            }}
            {...otherProps}
        />
    );
}
