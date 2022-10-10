import { alpha, darken, ThemeOptions } from "@mui/material/styles";
import { green, grey } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";

const tonalOffset = 0.2;

const getDesignTokens = (mode: PaletteMode): ThemeOptions => {
    const isLightMode = mode === "light";

    return {
        palette: {
            mode,
            primary: {
                main: isLightMode ? green[800] : green["A200"],
            },
            secondary: {
                main: "#fcd655",
            },
            neutral: {
                main: grey[600],
                dark: darken(grey[600], tonalOffset),
                contrastText: "#fff",
            },
            spotify: {
                main: "#1db954",
                contrastText: "#fff",
            },
            apple: {
                main: "#000",
                contrastText: "#fff",
            },
            tonalOffset: tonalOffset,
        },
        components: {
            MuiButtonBase: {
                defaultProps: {
                    disableTouchRipple: true,
                },
            },
            MuiButton: {
                defaultProps: {
                    disableElevation: true,
                },
                styleOverrides: {
                    root: ({ ownerState, theme }) => {
                        if (ownerState.variant === "contained") {
                            let sourceColor = theme.palette.primary.dark;
                            if (ownerState.color === "primary")
                                sourceColor = theme.palette.primary.dark;
                            else if (ownerState.color === "secondary")
                                sourceColor = theme.palette.secondary.dark;
                            else if (ownerState.color === "success")
                                sourceColor = theme.palette.success.dark;
                            else if (ownerState.color === "error")
                                sourceColor = theme.palette.error.dark;
                            else if (ownerState.color === "warning")
                                sourceColor = theme.palette.warning.dark;
                            else if (ownerState.color === "info")
                                sourceColor = theme.palette.info.dark;
                            else if (ownerState.color === "neutral")
                                sourceColor = theme.palette.neutral?.dark ?? "";
                            else return {};

                            return {
                                ":active": {
                                    backgroundColor: darken(
                                        sourceColor,
                                        Number(theme.palette.tonalOffset)
                                    ),
                                },
                            };
                        } else if (ownerState.variant === "text") {
                            let sourceColor = theme.palette.primary.dark;
                            if (ownerState.color === "primary")
                                sourceColor = theme.palette.primary.dark;
                            else if (ownerState.color === "secondary")
                                sourceColor = theme.palette.secondary.dark;
                            else if (ownerState.color === "success")
                                sourceColor = theme.palette.success.dark;
                            else if (ownerState.color === "error")
                                sourceColor = theme.palette.error.dark;
                            else if (ownerState.color === "warning")
                                sourceColor = theme.palette.warning.dark;
                            else if (ownerState.color === "info")
                                sourceColor = theme.palette.info.dark;
                            else return {};

                            return {
                                ":hover": {
                                    backgroundColor: alpha(sourceColor, 0.08),
                                },
                                ":active": {
                                    backgroundColor: alpha(sourceColor, 0.16),
                                },
                            };
                        }
                    },
                },
            },
        },
        shape: {
            borderRadius: 5,
        },
    };
};

export default getDesignTokens;

// custom theme options module augmentations
declare module "@mui/material/styles" {
    interface Palette {
        neutral?: Palette["primary"];
        spotify?: Palette["primary"];
        apple?: Palette["primary"];
    }
    interface PaletteOptions {
        neutral?: PaletteOptions["primary"];
        spotify?: PaletteOptions["primary"];
        apple?: PaletteOptions["primary"];
    }
}

// custom button color prop options
declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        neutral: true;
        spotify: true;
        apple: true;
    }
}
