import React from "react";
import {
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    Link,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { DarkMode, GitHub, LightMode, Twitter } from "@mui/icons-material";
import NavLink from "./NavLink";
import Image from "next/image";

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
            <Container maxWidth="maxSiteWidth" sx={{ py: 8 }}>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={4}
                    alignItems="flex-start"
                    justifyContent="space-between"
                >
                    <NavLink href={"/"}>
                        <Image
                            src={
                                isLightMode
                                    ? "/images/swampy-logo-black.svg"
                                    : "/images/swampy-logo-white.svg"
                            }
                            alt="Swampy Logo"
                            width="164"
                            height="32"
                            priority
                        />
                    </NavLink>
                    <Box>
                        <Typography variant="h6" component="h4">
                            Navigation
                        </Typography>
                        <Stack
                            justifyContent="flex-start"
                            spacing={2}
                            sx={{ mt: 2 }}
                        >
                            <NavLink
                                href="/"
                                color="text.secondary"
                                underline="hover"
                                variant="button"
                            >
                                Home
                            </NavLink>
                            <NavLink
                                href="/guide"
                                color="text.secondary"
                                underline="hover"
                                variant="button"
                            >
                                Guide
                            </NavLink>
                        </Stack>
                    </Box>
                    <Box>
                        <Typography variant="h6" component="h4">
                            Company
                        </Typography>
                        <Stack
                            justifyContent="flex-start"
                            spacing={2}
                            sx={{ mt: 2 }}
                        >
                            <NavLink
                                href="/privacy-policy"
                                color="text.secondary"
                                underline="hover"
                                variant="button"
                            >
                                Privacy Policy
                            </NavLink>
                            <NavLink
                                href="/user-agreement"
                                color="text.secondary"
                                underline="hover"
                                variant="button"
                            >
                                User Agreement
                            </NavLink>
                        </Stack>
                    </Box>
                </Stack>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mt: 8 }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                    >
                        © {new Date().getFullYear()}{" "}
                        <Link
                            href="https://tunebat.com"
                            color="text.secondary"
                            underline="hover"
                            target="_blank"
                        >
                            Tunebat LLC
                        </Link>
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={1}
                        divider={<Divider orientation="vertical" flexItem />}
                    >
                        <Tooltip title="GitHub" placement="top">
                            <Link
                                href="https://github.com/oliver-tunebat/swampy"
                                color="text.secondary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IconButton
                                    aria-label="Github"
                                    size="small"
                                    color="inherit"
                                >
                                    <GitHub />
                                </IconButton>
                            </Link>
                        </Tooltip>
                        <Tooltip title="Twitter" placement="top">
                            <Link
                                href="https://twitter.com"
                                color="text.secondary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IconButton
                                    aria-label="Twitter"
                                    size="small"
                                    color="inherit"
                                >
                                    <Twitter />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </Stack>
                    <Button
                        variant="text"
                        color="neutral"
                        startIcon={isLightMode ? <DarkMode /> : <LightMode />}
                        onClick={toggleColorMode}
                    >
                        {isLightMode ? "Dark Mode" : "Light Mode"}
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
}

interface FooterProps {
    mode: string;
    toggleColorMode: () => void;
}
