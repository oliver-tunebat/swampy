import * as React from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, DialogActions, Typography } from "@mui/material";
import ResponsiveDialog, { ResponsiveDialogProps } from "./ResponsiveDialog";
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

    const handleConfirm = async () => {
        setIsContinueButtonLoading(true);
        await onConfirm();
        setIsContinueButtonLoading(false);
        onClose?.("closeButtonClick");
    };

    return (
        <ResponsiveDialog
            maxWidth="xs"
            fullWidth
            {...props}
            onClose={(reason) => onClose?.(reason)}
        >
            <DialogTitle>{titleText}</DialogTitle>
            <DialogContent>
                <Typography>{content}</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    color="neutral"
                    onClick={() => onClose?.("closeButtonClick")}
                >
                    Cancel
                </Button>
                <LoadingButton
                    color={danger ? "error" : "primary"}
                    onClick={() => handleConfirm()}
                    loading={isContinueButtonLoading && showLoading}
                >
                    {confirmText ?? "Continue"}
                </LoadingButton>
            </DialogActions>
        </ResponsiveDialog>
    );
}

interface ConfirmationDialogProps extends ResponsiveDialogProps {
    titleText?: string;
    content?: string;
    danger?: boolean;
    confirmText?: string;
    showLoading?: boolean;
    onConfirm: () => void;
}
