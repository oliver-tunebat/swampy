import { alpha, darken, ThemeOptions } from "@mui/material/styles";
import { green, grey, orange, red } from "@mui/material/colors";
import { CSSInterpolation, lighten, PaletteMode } from "@mui/material";
import { Inter } from "@next/font/google";

const tonalOffset = 0.2;

export const inter = Inter({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    fallback: ["Helvetica", "Arial", "sans-serif"],
});

const getDesignTokens = (mode: PaletteMode): ThemeOptions => {
    const isLightMode = mode === "light";

    return {
        palette: {
            mode,
            primary: {
                main: isLightMode ? green[800] : green["A200"],
                contrastText: isLightMode ? grey[50] : grey[900],
            },
            secondary: {
                main: isLightMode ? "#bf360c" : orange["A200"],
                contrastText: isLightMode ? grey[50] : grey[900],
            },
            neutral: {
                main: isLightMode ? grey[900] : grey[50],
                contrastText: isLightMode ? grey[50] : grey[900],
                dark: isLightMode
                    ? lighten(grey[900], tonalOffset)
                    : darken(grey[50], tonalOffset),
                light: isLightMode
                    ? lighten(grey[900], tonalOffset)
                    : darken(grey[50], tonalOffset),
            },
            error: {
                main: isLightMode ? red[700] : red["A100"],
            },
            spotify: {
                main: "#1db954",
                contrastText: grey[50],
                dark: darken("#1db954", tonalOffset),
                light: lighten("#1db954", tonalOffset),
            },
            background: {
                paper: isLightMode ? grey[50] : grey[900],
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
                        const style: CSSInterpolation = {
                            textTransform: "none",
                        };

                        if (ownerState.variant === "contained") {
                            let sourceColor = theme.palette.primary.dark;
                            if (ownerState.color === "primary") {
                                sourceColor = theme.palette.primary.dark;
                            } else if (ownerState.color === "secondary") {
                                sourceColor = theme.palette.secondary.dark;
                            } else if (ownerState.color === "success") {
                                sourceColor = theme.palette.success.dark;
                            } else if (ownerState.color === "error") {
                                sourceColor = theme.palette.error.dark;
                            } else if (ownerState.color === "warning") {
                                sourceColor = theme.palette.warning.dark;
                            } else if (ownerState.color === "info") {
                                sourceColor = theme.palette.info.dark;
                            } else if (ownerState.color === "neutral") {
                                sourceColor = theme.palette.neutral?.dark ?? "";
                            } else if (ownerState.color === "spotify") {
                                sourceColor = theme.palette.spotify?.dark ?? "";
                            }

                            style[":active"] = {
                                backgroundColor: darken(
                                    sourceColor,
                                    Number(theme.palette.tonalOffset),
                                ),
                            };
                        } else if (
                            ownerState.variant === "text" ||
                            ownerState.variant === "outlined"
                        ) {
                            let sourceColor = theme.palette.primary.dark;
                            if (ownerState.color === "primary") {
                                sourceColor = isLightMode
                                    ? theme.palette.primary.dark
                                    : theme.palette.primary.light;
                            } else if (ownerState.color === "secondary") {
                                sourceColor = isLightMode
                                    ? theme.palette.secondary.dark
                                    : theme.palette.secondary.light;
                            } else if (ownerState.color === "success") {
                                sourceColor = isLightMode
                                    ? theme.palette.success.dark
                                    : theme.palette.success.light;
                            } else if (ownerState.color === "error") {
                                sourceColor = isLightMode
                                    ? theme.palette.error.dark
                                    : theme.palette.error.light;
                            } else if (ownerState.color === "warning") {
                                sourceColor = isLightMode
                                    ? theme.palette.warning.dark
                                    : theme.palette.warning.light;
                            } else if (ownerState.color === "info") {
                                sourceColor = isLightMode
                                    ? theme.palette.info.dark
                                    : theme.palette.info.light;
                            } else if (ownerState.color === "neutral") {
                                sourceColor = isLightMode
                                    ? theme.palette.neutral?.dark ?? ""
                                    : theme.palette.neutral?.light ?? "";
                            } else if (ownerState.color === "spotify") {
                                sourceColor = isLightMode
                                    ? theme.palette.spotify?.dark ?? ""
                                    : theme.palette.spotify?.light ?? "";
                            }

                            style[":hover"] = {
                                backgroundColor: alpha(sourceColor, 0.08),
                            };
                            style[":active"] = {
                                backgroundColor: alpha(sourceColor, 0.16),
                            };
                        }

                        return style;
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: ({ ownerState, theme }) => {
                        const constantStyles = { borderRadius: 10 };

                        let sourceColor = "#000";
                        if (ownerState.color === "default") {
                            sourceColor = theme.palette.text.secondary;
                        } else if (ownerState.color === "primary") {
                            sourceColor = isLightMode
                                ? theme.palette.primary.dark
                                : theme.palette.primary.light;
                        } else if (ownerState.color === "secondary") {
                            sourceColor = isLightMode
                                ? theme.palette.secondary.dark
                                : theme.palette.secondary.light;
                        } else if (ownerState.color === "success") {
                            sourceColor = isLightMode
                                ? theme.palette.success.dark
                                : theme.palette.success.light;
                        } else if (ownerState.color === "error") {
                            sourceColor = isLightMode
                                ? theme.palette.primary.dark
                                : theme.palette.primary.light;
                        } else if (ownerState.color === "warning") {
                            sourceColor = isLightMode
                                ? theme.palette.warning.dark
                                : theme.palette.warning.light;
                        } else if (ownerState.color === "info") {
                            sourceColor = isLightMode
                                ? theme.palette.info.dark
                                : theme.palette.info.light;
                        } else if (ownerState.color === "neutral") {
                            sourceColor = isLightMode
                                ? theme.palette.neutral?.dark ?? ""
                                : theme.palette.neutral?.light ?? "";
                        } else {
                            return { ...constantStyles };
                        }

                        return {
                            ...constantStyles,
                            color: sourceColor,
                            ":hover": {
                                backgroundColor: alpha(sourceColor, 0.08),
                            },
                            ":active": {
                                backgroundColor: alpha(sourceColor, 0.16),
                            },
                        };
                    },
                },
            },
            MuiTypography: {
                styleOverrides: {
                    button: {
                        textTransform: "none",
                    },
                },
            },
            MuiPaper: {
                defaultProps: {
                    variant: "outlined",
                },
                // styleOverrides: {
                //     outlined: {
                //         backgroundColor: isLightMode ? grey[50] : grey[900],
                //     },
                // },
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        borderRadius: 0,
                    },
                },
            },
            MuiCardActionArea: {
                styleOverrides: {
                    root: () => {
                        return {
                            ":hover .MuiCardActionArea-focusHighlight": {
                                opacity: 0.04,
                            },
                            ":active .MuiCardActionArea-focusHighlight": {
                                opacity: 0.08,
                            },
                        };
                    },
                },
            },
            MuiCardActions: {
                styleOverrides: {
                    root: {
                        justifyContent: "flex-end",
                    },
                },
            },
            MuiAlert: {
                styleOverrides: {
                    root: {
                        color: grey[50],
                    },
                },
            },
        },
        shape: {
            borderRadius: 10,
        },
        typography: {
            fontFamily: inter.style.fontFamily,
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
                xxsContainer: 360,
                maxSiteWidth: 900,
            },
        },
    };
};

export default getDesignTokens;

// custom theme options module augmentations
declare module "@mui/material/styles" {
    interface Palette {
        neutral?: Palette["primary"];
        spotify?: Palette["primary"];
    }
    interface PaletteOptions {
        neutral?: PaletteOptions["primary"];
        spotify?: PaletteOptions["primary"];
    }
    interface BreakpointOverrides {
        xs: true;
        sm: true;
        md: true;
        lg: true;
        xl: true;
        xxsContainer: true;
        maxSiteWidth: true;
    }
}

// custom button color prop options
declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        neutral: true;
        spotify: true;
    }
}
declare module "@mui/material/IconButton" {
    interface IconButtonPropsColorOverrides {
        neutral: true;
        spotify: true;
    }
}
