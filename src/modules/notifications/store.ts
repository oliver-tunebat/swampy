import { AlertProps } from "@mui/material";
import create from "zustand";
import { SiteSnackbarProps } from "./components/SiteSnackbar";

interface NotificationsState {
    alertProps: AlertProps;
    isBannerShowing: boolean;
    setBanner: (showBanner: boolean, alertProps: AlertProps) => void;
    siteSnackbarProps: SiteSnackbarProps;
    isSiteSnackbarShowing: boolean;
    showSiteSnackbar: (props: SiteSnackbarProps) => void;
    hideSiteSnackbar: () => void;
}

const useNotificationsStore = create<NotificationsState>((set) => ({
    alertProps: {},
    isBannerShowing: false,
    setBanner: (showBanner, alertProps) =>
        set({ isBannerShowing: showBanner, alertProps }),
    siteSnackbarProps: {},
    isSiteSnackbarShowing: false,
    showSiteSnackbar: (props: SiteSnackbarProps) =>
        set({ isSiteSnackbarShowing: true, siteSnackbarProps: props }),
    hideSiteSnackbar: () => set({ isSiteSnackbarShowing: false }),
}));

export default useNotificationsStore;
