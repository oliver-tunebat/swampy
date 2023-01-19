import * as React from "react";
import { Alert, AlertColor, Slide, SlideProps, Snackbar } from "@mui/material";
import useNotificationsStore from "../store";

export default function SiteSnackbar() {
    const siteSnackbarProps = useNotificationsStore(
        (state) => state.siteSnackbarProps,
    );
    const isSiteSnackbarShowing = useNotificationsStore(
        (state) => state.isSiteSnackbarShowing,
    );
    const hideSiteSnackbar = useNotificationsStore(
        (state) => () => state.hideSiteSnackbar(),
    );

    return (
        <Snackbar
            open={isSiteSnackbarShowing}
            TransitionComponent={SlideComponent}
            key={siteSnackbarProps.message}
            autoHideDuration={6000}
            onClose={hideSiteSnackbar}
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
            <Alert
                variant="filled"
                icon={false}
                sx={{ width: "100%" }}
                severity={siteSnackbarProps.severity}
            >
                {siteSnackbarProps.message}
            </Alert>
        </Snackbar>
    );
}

function SlideComponent(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

export interface SiteSnackbarProps {
    message?: string;
    severity?: AlertColor;
}
