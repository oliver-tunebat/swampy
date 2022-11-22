import Dialog, { DialogProps } from "@mui/material/Dialog";
import { useMediaQuery, useTheme } from "@mui/material";
import DialogCloseButton from "./DialogCloseButton";
import { useRouter } from "next/router";
import { useEffect } from "react";

const dialogHash = "#dialog";

export default function ResponsiveDialog(props: ResponsiveDialogProps) {
    const { onClose, open, children } = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const router = useRouter();

    useEffect(() => {
        // full screen dialogs add a hash to the route
        if (open && fullScreen) {
            router.push(dialogHash);
        }
    }, [open]);

    useEffect(() => {
        // when the dialog hash is removed from the route, close the dialog
        const handleHashChangeStart = (url: string) => {
            console.log(url);
            if (!url.includes(dialogHash)) {
                onClose?.("hashChange");
            }
        };

        router.events.on("hashChangeStart", handleHashChangeStart);

        return () => {
            router.events.off("hashChangeStart", handleHashChangeStart);
        };
    }, []);

    return (
        <Dialog
            fullScreen={fullScreen}
            {...props}
            open={open}
            onClose={(event, reason) => {
                // if the dialog hash is in use, navigate back to close
                // otherwise, call onclose
                if (router.asPath.includes(dialogHash)) {
                    router.back();
                } else {
                    onClose?.(reason);
                }
            }}
        >
            {children}
            <DialogCloseButton
                onClick={() => {
                    // if the dialog hash is in use, navigate back to close
                    // otherwise, call onclose
                    if (router.asPath.includes(dialogHash)) {
                        router.back();
                    } else {
                        onClose?.("closeButtonClick");
                    }
                }}
            />
        </Dialog>
    );
}

interface ResponsiveDialogProps extends DialogProps {
    onClose?: (
        reason:
            | "escapeKeyDown"
            | "backdropClick"
            | "closeButtonClick"
            | "hashChange"
    ) => void;
}
