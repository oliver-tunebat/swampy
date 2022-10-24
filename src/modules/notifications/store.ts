import { AlertProps } from "@mui/material";
import create from "zustand";

interface NotificationsState {
    alertProps: AlertProps;
    isBannerShowing: boolean;
    setBanner: (showBanner: boolean, alertProps: AlertProps) => void;
}

const useNotificationsStore = create<NotificationsState>((set) => ({
    alertProps: {},
    isBannerShowing: false,
    setBanner: (showBanner, alertProps) =>
        set({ isBannerShowing: showBanner, alertProps }),
}));

export default useNotificationsStore;
