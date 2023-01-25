import { create } from "zustand";

interface AuthState {
    authFormViewType: AuthFormViewType;
    setAuthFormViewType: (viewType: AuthFormViewType) => void;
    authDialogOpen: boolean;
    setAuthDialogOpen: (open: boolean, viewType?: AuthFormViewType) => void;
}

const useAuthStore = create<AuthState>((set) => ({
    authFormViewType: "signUp",
    setAuthFormViewType: (viewType?) => set({ authFormViewType: viewType }),
    authDialogOpen: false,
    setAuthDialogOpen: (open, formType?) =>
        set((state) => ({
            authDialogOpen: open,
            authFormViewType: formType ?? state.authFormViewType,
        })),
}));

export default useAuthStore;

export type AuthFormViewType =
    | "signUp"
    | "login"
    | "completeSignUp"
    | "recoverPassword";
