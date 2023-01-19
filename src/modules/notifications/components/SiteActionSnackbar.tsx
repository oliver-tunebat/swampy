import * as React from "react";
import { Slide, SlideProps, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import NotificationsActionCard from "../../user/components/NotificationsActionCard";
import useNotificationsStore from "../store";

export default function SiteActionSnackbar() {
    const siteActionSnackbarContent = useNotificationsStore(
        (state) => state.siteActionSnackbarContent,
    );
    const isSiteActionSnackbarShowing = useNotificationsStore(
        (state) => state.isSiteActionSnackbarShowing,
    );

    const content = siteActionSnackbarContent === "NOTIFICATIONS" && (
        <NotificationsActionCard />
    );

    return (
        <Snackbar
            open={isSiteActionSnackbarShowing}
            TransitionComponent={SlideComponent}
            key={siteActionSnackbarContent}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            <Box maxWidth="xxsContainer">{content}</Box>
        </Snackbar>
    );
}

function SlideComponent(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

export type SiteActionSnackbarContent = "NOTIFICATIONS" | undefined;
