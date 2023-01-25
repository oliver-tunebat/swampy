import { AlertProps } from "@mui/material";
import { create } from "zustand";
import { SiteActionSnackbarContent } from "./components/SiteActionSnackbar";
import { SiteSnackbarProps } from "./components/SiteSnackbar";

interface NotificationsState {
    alertProps: AlertProps;
    isBannerShowing: boolean;
    setBanner: (showBanner: boolean, alertProps: AlertProps) => void;

    siteSnackbarProps: SiteSnackbarProps;
    isSiteSnackbarShowing: boolean;
    showSiteSnackbar: (props: SiteSnackbarProps) => void;
    hideSiteSnackbar: () => void;

    siteActionSnackbarContent: SiteActionSnackbarContent;
    isSiteActionSnackbarShowing: boolean;
    showSiteActionSnackbar: (content: SiteActionSnackbarContent) => void;
    hideSiteActionSnackbar: () => void;
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

    siteActionSnackbarContent: undefined,
    isSiteActionSnackbarShowing: false,
    showSiteActionSnackbar: (content: SiteActionSnackbarContent) =>
        set({
            isSiteActionSnackbarShowing: true,
            siteActionSnackbarContent: content,
        }),
    hideSiteActionSnackbar: () => set({ isSiteActionSnackbarShowing: false }),
}));

export default useNotificationsStore;
