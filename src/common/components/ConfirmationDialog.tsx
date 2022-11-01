import * as React from "react";
import { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, DialogActions, Typography } from "@mui/material";
import ResponsiveDialog from "./ResponsiveDialog";
import { LoadingButton } from "@mui/lab";

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
    const {
        titleText,
        content,
        danger,
        confirmText,
        showLoading,
        onConfirm,
        onClose,
    } = props;

    const [isContinueButtonLoading, setIsContinueButtonLoading] =
        React.useState(false);

    const handleConfirm = async (event: React.MouseEvent) => {
        setIsContinueButtonLoading(true);
        await onConfirm();
        setIsContinueButtonLoading(false);
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
                <LoadingButton
                    color={danger ? "error" : "primary"}
                    onClick={(event) => handleConfirm(event)}
                    loading={isContinueButtonLoading && showLoading}
                >
                    {confirmText ?? "Continue"}
                </LoadingButton>
            </DialogActions>
        </ResponsiveDialog>
    );
}

interface ConfirmationDialogProps extends DialogProps {
    titleText?: string;
    content?: string;
    danger?: boolean;
    confirmText?: string;
    showLoading?: boolean;
    onConfirm: () => void;
}
