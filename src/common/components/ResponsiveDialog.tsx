import Dialog, { DialogProps } from "@mui/material/Dialog";
import { useMediaQuery, useTheme } from "@mui/material";
import DialogCloseButton from "./DialogCloseButton";

export default function ResponsiveDialog(props: DialogProps) {
    const { onClose, children } = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Dialog fullScreen={fullScreen} {...props}>
            {children}
            <DialogCloseButton
                onClick={(event) => onClose?.(event, "escapeKeyDown")}
            />
        </Dialog>
    );
}
