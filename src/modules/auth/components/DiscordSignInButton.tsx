import * as React from "react";
import { ButtonProps } from "@mui/material";
import getCurrentURL from "../../../common/utils/getCurrentURL";
import { roboto } from "../../../getDesignTokens";
import SignInButton from "./SignInButton";
import Image from "next/image";

export default function DiscordSignInButton(props: ButtonProps) {
    const { sx, ...otherProps } = props;

    return (
        <SignInButton
            color="discord"
            variant="contained"
            startIcon={
                <Image
                    src="/images/discord-mark-white.svg"
                    alt="Discord Icon"
                    width={24}
                    height={18}
                />
            }
            sx={{
                fontFamily: roboto.style.fontFamily,
                "& .MuiButton-startIcon": {
                    mr: 3,
                },
                ...sx,
            }}
            providerName="Discord"
            providerOptions={{
                provider: "discord",
                options: {
                    redirectTo: getCurrentURL(true),
                },
            }}
            {...otherProps}
        />
    );
}
