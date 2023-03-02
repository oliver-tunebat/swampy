import * as React from "react";
import { HelpOutlineRounded } from "@mui/icons-material";
import { IconButton, IconButtonProps, Tooltip, useTheme } from "@mui/material";

export function TooltipHelpButton(props: TooltipHelpButtonProps) {
    const { tooltipTitle, placement, sx, ...other } = props;

    const theme = useTheme();

    if (!tooltipTitle) {
        return <></>;
    }

    return (
        <Tooltip
            title={tooltipTitle}
            placement={placement ? placement : "top"}
        >
            <IconButton
                sx={{
                    p: 0,
                    cursor: "default",
                    color: theme.palette.text.secondary,
                    ...sx,
                }}
                aria-label="Show help text"
                {...other}
            >
                <HelpOutlineRounded sx={{ fontSize: 18 }} />
            </IconButton>
        </Tooltip>
    );
}

interface TooltipHelpButtonProps extends IconButtonProps {
    tooltipTitle?: string;
    placement?:
        | "bottom-end"
        | "bottom-start"
        | "bottom"
        | "left-end"
        | "left-start"
        | "left"
        | "right-end"
        | "right-start"
        | "right"
        | "top-end"
        | "top-start"
        | "top";
}
