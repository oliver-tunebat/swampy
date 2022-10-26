import { alpha, darken, ThemeOptions } from "@mui/material/styles";
import { green, orange, red } from "@mui/material/colors";
import { CSSInterpolation, lighten, PaletteMode } from "@mui/material";

const tonalOffset = 0.2;

const getDesignTokens = (mode: PaletteMode): ThemeOptions => {
    const isLightMode = mode === "light";

    return {
        palette: {
            mode,
            primary: {
                main: isLightMode ? green[800] : green["A200"],
                contrastText: isLightMode ? "#fff" : "#000",
            },
            secondary: {
                main: isLightMode ? "#bf360c" : orange["A200"],
                contrastText: isLightMode ? "#fff" : "#000",
            },
            neutral: {
                main: isLightMode ? "#000" : "#fff",
                contrastText: isLightMode ? "#fff" : "#000",
                dark: isLightMode
                    ? lighten("#000", tonalOffset)
                    : darken("#fff", tonalOffset),
                light: isLightMode
                    ? lighten("#000", tonalOffset)
                    : darken("#fff", tonalOffset),
            },
            error: {
                main: isLightMode ? red[700] : red["A100"],
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
                        const style: CSSInterpolation = {
                            textTransform: "none",
                        };

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

                            style[":active"] = {
                                backgroundColor: darken(
                                    sourceColor,
                                    Number(theme.palette.tonalOffset)
                                ),
                            };
                        } else if (
                            ownerState.variant === "text" ||
                            ownerState.variant === "outlined"
                        ) {
                            let sourceColor = theme.palette.primary.dark;
                            if (ownerState.color === "primary")
                                sourceColor = isLightMode
                                    ? theme.palette.primary.dark
                                    : theme.palette.primary.light;
                            else if (ownerState.color === "secondary")
                                sourceColor = isLightMode
                                    ? theme.palette.secondary.dark
                                    : theme.palette.secondary.light;
                            else if (ownerState.color === "success")
                                sourceColor = isLightMode
                                    ? theme.palette.success.dark
                                    : theme.palette.success.light;
                            else if (ownerState.color === "error")
                                sourceColor = isLightMode
                                    ? theme.palette.error.dark
                                    : theme.palette.error.light;
                            else if (ownerState.color === "warning")
                                sourceColor = isLightMode
                                    ? theme.palette.warning.dark
                                    : theme.palette.warning.light;
                            else if (ownerState.color === "info")
                                sourceColor = isLightMode
                                    ? theme.palette.info.dark
                                    : theme.palette.info.light;
                            else if (ownerState.color === "neutral")
                                sourceColor = isLightMode
                                    ? theme.palette.neutral?.dark ?? ""
                                    : theme.palette.neutral?.light ?? "";

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
                        let sourceColor = "#000";
                        if (ownerState.color === "default")
                            sourceColor = isLightMode ? "#000" : "#fff";
                        else if (ownerState.color === "primary")
                            sourceColor = isLightMode
                                ? theme.palette.primary.dark
                                : theme.palette.primary.light;
                        else if (ownerState.color === "secondary")
                            sourceColor = isLightMode
                                ? theme.palette.secondary.dark
                                : theme.palette.secondary.light;
                        else if (ownerState.color === "success")
                            sourceColor = isLightMode
                                ? theme.palette.success.dark
                                : theme.palette.success.light;
                        else if (ownerState.color === "error")
                            sourceColor = isLightMode
                                ? theme.palette.primary.dark
                                : theme.palette.primary.light;
                        else if (ownerState.color === "warning")
                            sourceColor = isLightMode
                                ? theme.palette.warning.dark
                                : theme.palette.warning.light;
                        else if (ownerState.color === "info")
                            sourceColor = isLightMode
                                ? theme.palette.info.dark
                                : theme.palette.info.light;
                        else return {};

                        return {
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
        },
        shape: {
            borderRadius: 0,
        },
        typography: {
            fontFamily: [
                "Inter",
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(","),
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
                xxsContainer: 360,
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
        apple?: Palette["primary"];
    }
    interface PaletteOptions {
        neutral?: PaletteOptions["primary"];
        spotify?: PaletteOptions["primary"];
        apple?: PaletteOptions["primary"];
    }
    interface BreakpointOverrides {
        xs: true;
        sm: true;
        md: true;
        lg: true;
        xl: true;
        xxsContainer: true;
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
