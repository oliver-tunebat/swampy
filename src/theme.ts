import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: "#556cd6",
        },
        secondary: {
            main: "#19857b",
        },
        error: {
            main: red.A400,
        },
        spotify: {
            main: "#1db954",
            contrastText: "#fff",
        },
    },
});

export default theme;

// custom theme options module augmentations
declare module "@mui/material/styles" {
    interface Palette {
        spotify?: Palette["primary"];
    }
    interface PaletteOptions {
        spotify?: PaletteOptions["primary"];
    }
}

// custom button color prop options
declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        spotify: true;
    }
}
