import * as React from "react";
import { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, DialogActions, Typography } from "@mui/material";
import ResponsiveDialog from "./ResponsiveDialog";

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
    const { titleText, content, danger, confirmText, onConfirm, onClose } =
        props;

    const handleConfirm = (event: React.MouseEvent) => {
        onConfirm();
        onClose?.(event, "escapeKeyDown");
    };

    return (
        <ResponsiveDialog maxWidth="xs" fullWidth {...props}>
            <DialogTitle>{titleText}</DialogTitle>
            <DialogContent>
                <Typography>{content}</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    color="neutral"
                    onClick={(event) => onClose?.(event, "escapeKeyDown")}
                >
                    Cancel
                </Button>
                <Button
                    color={danger ? "error" : "primary"}
                    onClick={(event) => handleConfirm(event)}
                >
                    {confirmText ?? "Continue"}
                </Button>
            </DialogActions>
        </ResponsiveDialog>
    );
}

interface ConfirmationDialogProps extends DialogProps {
    titleText?: string;
    content?: string;
    danger?: boolean;
    confirmText?: string;
    onConfirm: () => void;
}
