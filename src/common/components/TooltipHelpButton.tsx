import * as React from "react";
import { HelpOutlineRounded } from "@mui/icons-material";
import { IconButton, IconButtonProps, Tooltip } from "@mui/material";

export function TooltipHelpButton(props: TooltipHelpButtonProps) {
    const { tooltipTitle, placement, sx, ...other } = props;

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
