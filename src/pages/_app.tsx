import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../createEmotionCache";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { supabaseClient } from "../common/utils/supabaseClient";
import ResponsiveAppBar from "../common/components/ResponsiveAppBar";
import { Box, PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import getDesignTokens from "../getDesignTokens";
import Footer from "../common/components/Footer";
import { setCookie, getCookie, hasCookie } from "cookies-next";
import AuthDialog from "../modules/auth/components/AuthDialog";
import SiteSnackbar from "../modules/notifications/components/SiteSnackbar";
import { setUpAuthStateChangeListeners } from "../modules/auth/utils/setUpAuthStateChangeListeners";
import EmailNotificationsActionSnackbar from "../modules/profile/components/EmailNotificationsActionSnackbar";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
    pageProps: { initialSession: Session };
}

const colorModeKey = "COLOR_MODE";

export default function MyApp(props: MyAppProps) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props;

    const [mode, setMode] = React.useState<PaletteMode>("light");
    const colorMode = React.useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) => {
                    const newMode = prevMode === "light" ? "dark" : "light";
                    setCookie(colorModeKey, newMode);
                    return newMode;
                });
            },
            setColorMode: (colorMode: string) => {
                setMode(() => {
                    setCookie(colorModeKey, colorMode);
                    return colorMode as PaletteMode;
                });
            },
        }),
        [],
    );

    // Update the theme only if the mode changes
    const theme = React.useMemo(
        () => createTheme(getDesignTokens(mode)),
        [mode],
    );

    setUpAuthStateChangeListeners();

    // on client side load, get color mode from cookie
    React.useEffect(() => {
        if (!hasCookie(colorModeKey)) {
            return;
        }
        colorMode.setColorMode(getCookie(colorModeKey) as string);
    });

    return (
        <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={pageProps.initialSession}
        >
            <CacheProvider value={emotionCache}>
                <Head>
                    <meta
                        name="viewport"
                        content="initial-scale=1, width=device-width"
                    />
                </Head>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            minHeight: "100vh",
                        }}
                    >
                        <ResponsiveAppBar />
                        <Component {...pageProps} />
                        <Footer
                            mode={mode}
                            toggleColorMode={colorMode.toggleColorMode}
                        />
                    </Box>
                    <AuthDialog />
                    <SiteSnackbar />
                    <EmailNotificationsActionSnackbar />
                </ThemeProvider>
            </CacheProvider>
        </SessionContextProvider>
    );
}
