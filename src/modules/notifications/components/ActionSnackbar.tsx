import * as React from "react";
import { Slide, SlideProps, Snackbar } from "@mui/material";
import { Box } from "@mui/system";

export default function ActionSnackbar(props: SiteActionSnackbarProps) {
    const { open, children } = props;

    return (
        <Snackbar
            open={open}
            TransitionComponent={SlideComponent}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            <Box maxWidth="xxsContainer">{children}</Box>
        </Snackbar>
    );
}

function SlideComponent(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

interface SiteActionSnackbarProps {
    children: React.ReactElement
    open: boolean;
}