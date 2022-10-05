import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: "#00d373",
        },
        secondary: {
            main: "#fcd655",
        },
        error: {
            main: red.A400,
        },
        spotify: {
            main: "#1db954",
            contrastText: "#fff",
        },
        apple: {
            main: "#000",
            contrastText: "#fff",
        },
    },
});

export default theme;

// custom theme options module augmentations
declare module "@mui/material/styles" {
    interface Palette {
        spotify?: Palette["primary"];
        apple?: Palette["primary"];
    }
    interface PaletteOptions {
        spotify?: PaletteOptions["primary"];
        apple?: PaletteOptions["primary"];
    }
}

// custom button color prop options
declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        spotify: true;
        apple: true;
    }
}
