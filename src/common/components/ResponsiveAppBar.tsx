import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import NavLink from "./NavLink";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { Divider, Slide, useScrollTrigger, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useAuthStore from "../../modules/auth/store";
import SiteBanner from "../../modules/notifications/components/SiteBanner";
import { supabaseClient } from "../utils/supabaseClient";

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const router = useRouter();
    const user = useUser();
    const theme = useTheme();

    const showLogin = useAuthStore(
        (state) => () => state.setAuthDialogOpen(true, "login")
    );
    const showSignUp = useAuthStore(
        (state) => () => state.setAuthDialogOpen(true, "signUp")
    );

    return (
        <>
            <Slide appear={false} direction="down" in={!useScrollTrigger()}>
                <AppBar
                    color="default"
                    enableColorOnDark
                    elevation={0}
                    variant="elevation"
                >
                    <SiteBanner />
                    <Container maxWidth="maxSiteWidth">
                        <Toolbar disableGutters>
                            {/* logo & link to home */}
                            <NavLink
                                href={"/"}
                                sx={{
                                    maxHeight: 32,
                                    display: "flex",
                                }}
                            >
                                <Image
                                    src={
                                        theme.palette.mode === "dark"
                                            ? "/images/swampy-logo-white.svg"
                                            : "/images/swampy-logo-black.svg"
                                    }
                                    alt="Swampy Logo"
                                    width="164"
                                    height="32"
                                    priority
                                />
                            </NavLink>

                            {/* horizontal spacer */}
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: "flex",
                                }}
                            />

                            {/* mobile navigation menu */}
                            <Box
                                sx={{
                                    display: { xs: "flex", md: "none" },
                                }}
                            >
                                <IconButton
                                    size="large"
                                    aria-label="view navigation menu"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: "block", md: "none" },
                                    }}
                                >
                                    {!user && (
                                        <MenuItem>
                                            <Button
                                                onClick={showSignUp}
                                                variant="contained"
                                            >
                                                Sign Up
                                            </Button>
                                        </MenuItem>
                                    )}
                                    {!user && (
                                        <MenuItem onClick={showLogin}>
                                            <Typography variant="button">
                                                Log In
                                            </Typography>
                                        </MenuItem>
                                    )}
                                    <NavLink
                                        href="/guide"
                                        color="inherit"
                                        underline="none"
                                    >
                                        <MenuItem>
                                            <Typography variant="button">
                                                Guide
                                            </Typography>
                                        </MenuItem>
                                    </NavLink>
                                    <Link
                                        href="https://github.com/oliver-tunebat/swampy"
                                        color="inherit"
                                        underline="none"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <MenuItem>
                                            <Typography variant="button">
                                                GitHub
                                            </Typography>
                                        </MenuItem>
                                    </Link>
                                </Menu>
                            </Box>

                            {/* desktop navigation links */}
                            <Box
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                }}
                            >
                                <NavLink
                                    href="/guide"
                                    underline="hover"
                                    color="inherit"
                                    sx={{
                                        mx: 2,
                                        fontWeight: router.route.startsWith(
                                            "/guide"
                                        )
                                            ? 600
                                            : "auto",
                                    }}
                                    variant="button"
                                >
                                    Guide
                                </NavLink>
                                <Link
                                    href="https://github.com/oliver-tunebat/swampy"
                                    underline="hover"
                                    color="inherit"
                                    sx={{
                                        mx: 2,
                                    }}
                                    variant="button"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub
                                </Link>
                                {!user && (
                                    <Link
                                        component="button"
                                        onClick={showLogin}
                                        underline={"hover"}
                                        color="inherit"
                                        sx={{
                                            mx: 2,
                                        }}
                                        variant="button"
                                    >
                                        Log In
                                    </Link>
                                )}
                            </Box>

                            {/* sign in button / account button */}
                            <Box sx={{ flexGrow: 0 }}>
                                {user ? (
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{
                                            p: 0,
                                            marginLeft: { xs: 1, md: 2 },
                                        }}
                                    >
                                        <Avatar
                                            alt={user.user_metadata.name}
                                            src={user.user_metadata.avatar_url}
                                        />
                                    </IconButton>
                                ) : (
                                    <Button
                                        onClick={showSignUp}
                                        variant="contained"
                                        sx={{
                                            marginLeft: 2,
                                            display: { xs: "none", md: "flex" },
                                        }}
                                    >
                                        Sign Up
                                    </Button>
                                )}
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                    onClick={handleCloseUserMenu}
                                >
                                    <NavLink
                                        href="/account"
                                        color="inherit"
                                        underline="none"
                                    >
                                        <MenuItem>
                                            <Typography variant="body2">
                                                Account
                                            </Typography>
                                        </MenuItem>
                                    </NavLink>
                                    <MenuItem
                                        onClick={async () => {
                                            const { error } =
                                                await supabaseClient.auth.signOut();
                                        }}
                                    >
                                        <Typography variant="body2">
                                            Log Out
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                    <Divider />
                </AppBar>
            </Slide>
            {/* invisible site banner & empty toolbar to enforce proper 
            top spacing for content with sliding appbar */}
            <Box sx={{ visibility: "hidden" }}>
                <SiteBanner />
            </Box>
            <Toolbar sx={{ flex: "0 1 auto" }}></Toolbar>
        </>
    );
};
export default ResponsiveAppBar;
