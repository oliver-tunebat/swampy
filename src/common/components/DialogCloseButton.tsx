import * as React from "react";
import { Close } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";

export default function DialogCloseButton(props: DialogCloseButtonProps) {
    const { onClick } = props;

    const theme = useTheme();

    return (
        <IconButton
            size="small"
            sx={{
                position: "absolute",
                right: theme.spacing(2),
                top: theme.spacing(2),
            }}
            onClick={onClick}
        >
            <Close />
        </IconButton>
    );
}

interface DialogCloseButtonProps {
    onClick: () => void;
}
