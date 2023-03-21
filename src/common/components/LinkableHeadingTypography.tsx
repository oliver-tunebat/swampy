import * as React from "react";
import { Typography, TypographyProps } from "@mui/material";
import NavLink from "./NavLink";

export function LinkableHeadingTypography(props: LinkableHeadingTypographyProps) {
    const { children, ...otherProps } = props;

    return (
        <Typography
            {...otherProps}
        >
            <NavLink
                href={`#${children}`}
                color="inherit"
                underline="hover"
            >
                {children}
            </NavLink>
        </Typography>
    );
}

interface LinkableHeadingTypographyProps extends TypographyProps {
    component?: string
}