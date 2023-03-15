import * as React from "react";
import { Paper, Typography, TypographyProps } from "@mui/material";

export function Code(props: CodeProps) {
    const { inline } = props;

    return (
        <Paper
            sx={{
                display: inline ? "inline" : "block",
                px: inline ? 1 : 2,
                py: inline ? 0 : 2,
            }}
            component={inline ? "span" : "div"}
        >
            <Typography
                variant="body1"
                sx={{
                    display: inline ? "inline" : "block",
                    fontFamily: "monospace",
                }}
                component="code"
                {...props}
            />
        </Paper>
    );

}

interface CodeProps extends TypographyProps {
    inline?: boolean
}
