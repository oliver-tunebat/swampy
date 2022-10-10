import * as React from "react";
import { Box, Container, Divider, IconButton, Tooltip } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DarkMode, LightMode } from "@mui/icons-material";

export default function Footer(props: FooterProps) {
    const { mode, toggleColorMode } = props;

    const isLightMode = mode === "light";

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: isLightMode ? grey[100] : grey[900],
                width: "100%",
                flex: "0 1 auto",
            }}
        >
            <Divider />
            <Container maxWidth="lg">
                <Tooltip title="Toggle Light Mode">
                    <IconButton
                        onClick={toggleColorMode}
                        aria-label="Toggle Light Mode"
                    >
                        {isLightMode ? <DarkMode /> : <LightMode />}
                    </IconButton>
                </Tooltip>
            </Container>
        </Box>
    );
}

interface FooterProps {
    mode: string;
    toggleColorMode: () => void;
}
