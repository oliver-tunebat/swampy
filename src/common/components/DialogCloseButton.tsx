import * as React from "react";
import { Close } from "@mui/icons-material";
import { IconButton, IconButtonProps, useTheme } from "@mui/material";

export default function DialogCloseButton(props: IconButtonProps) {
    const theme = useTheme();

    return (
        <IconButton
            size="small"
            sx={{
                position: "absolute",
                right: theme.spacing(2),
                top: theme.spacing(2),
            }}
            {...props}
        >
            <Close />
        </IconButton>
    );
}
