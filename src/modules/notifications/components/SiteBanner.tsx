import { Close } from "@mui/icons-material";
import { Alert, Container, IconButton } from "@mui/material";
import useNotificationsStore from "../store";

export default function SiteBanner() {
    const alertProps = useNotificationsStore((state) => state.alertProps);
    const isBannerShowing = useNotificationsStore(
        (state) => state.isBannerShowing
    );
    const closeBanner = useNotificationsStore(
        (state) => () => state.setBanner(false, {})
    );

    if (!isBannerShowing) return <></>;

    return (
        <Alert
            variant="filled"
            sx={{
                justifyContent: "center",
                "& .MuiAlert-message": {
                    width: "100%",
                },
            }}
            icon={false}
            {...alertProps}
        >
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                }}
            >
                {/* hidden icon button to help center children */}
                <IconButton size="small" sx={{ visibility: "hidden" }}>
                    <Close />
                </IconButton>
                {alertProps.children}
                <IconButton
                    size="small"
                    sx={{ color: "inherit" }}
                    onClick={closeBanner}
                >
                    <Close />
                </IconButton>
            </Container>
        </Alert>
    );
}
