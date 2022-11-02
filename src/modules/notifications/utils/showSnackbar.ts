import { AlertColor } from "@mui/material";
import useNotificationsStore from "../store";

export default function showSnackbar(message?: string, severity?: AlertColor) {
    useNotificationsStore.setState({
        isSiteSnackbarShowing: true,
        siteSnackbarProps: { message: message, severity: severity },
    });
}
