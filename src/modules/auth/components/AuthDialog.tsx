import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useAuthStore from "../store";
import { useMediaQuery, useTheme } from "@mui/material";
import DialogCloseButton from "../../../common/components/DialogCloseButton";
import AuthForm from "./AuthForm";

export default function AuthDialog() {
    const viewType = useAuthStore((state) => state.authFormViewType);
    const open = useAuthStore((state) => state.authDialogOpen);
    const closeDialog = useAuthStore(
        (state) => () => state.setAuthDialogOpen(false, viewType)
    );

    const title =
        viewType === "login"
            ? "Log In"
            : viewType === "recoverPassword"
            ? "Password Recovery"
            : "Sign Up";

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Dialog
            open={open}
            onClose={closeDialog}
            maxWidth="xxsContainer"
            fullScreen={fullScreen}
            fullWidth
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <AuthForm />
            </DialogContent>
            <DialogCloseButton onClick={closeDialog} />
        </Dialog>
    );
}
