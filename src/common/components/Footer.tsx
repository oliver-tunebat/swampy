import React from "react";
import {
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { DarkMode, GitHub, LightMode, Twitter } from "@mui/icons-material";
import NavLink from "./NavLink";
import Image from "next/image";
import logoBlack from "../../../public/images/swampy-logo-black.svg";
import logoWhite from "../../../public/images/swampy-logo-white.svg";

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
            <Container
                maxWidth="maxSiteWidth"
                sx={{ py: 8 }}
            >
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
                                    ? logoBlack
                                    : logoWhite
                            }
                            alt="Swampy Logo"
                            width="164"
                            height="32"
                            priority
                        />
                    </NavLink>
                    <Box>
                        <Typography
                            variant="h6"
                            component="h4"
                        >
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
                        <Typography
                            variant="h6"
                            component="h4"
                        >
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
                                href="/terms-of-service"
                                color="text.secondary"
                                underline="hover"
                                variant="button"
                            >
                                Terms of Service
                            </NavLink>
                            <NavLink
                                href="/contact-us"
                                color="text.secondary"
                                underline="hover"
                                variant="button"
                            >
                                Contact Us
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
                        <NavLink
                            href="https://tunebat.com"
                            color="text.secondary"
                            underline="hover"
                            target="_blank"
                        >
                            Tunebat LLC
                        </NavLink>
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={1}
                        divider={<Divider
                            orientation="vertical"
                            flexItem
                        />}
                    >
                        <Tooltip
                            title="GitHub"
                            placement="top"
                        >
                            <IconButton
                                aria-label="Github"
                                size="small"
                                color="neutral"
                                href="https://github.com/oliver-tunebat/swampy"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <GitHub />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="Twitter"
                            placement="top"
                        >
                            <IconButton
                                aria-label="Twitter"
                                size="small"
                                color="neutral"
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Twitter />
                            </IconButton>
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
