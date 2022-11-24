import * as React from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { IconButton, IconButtonProps } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export function ExpandIconButton(props: ExpandIconButtonProps) {
    const { isExpanded, setIsExpanded, ...other } = props;

    return (
        <IconButton onClick={() => setIsExpanded(!isExpanded)} {...other}>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
    );
}

interface ExpandIconButtonProps extends IconButtonProps {
    isExpanded: boolean;
    setIsExpanded: Dispatch<SetStateAction<boolean>>;
}
