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
import Link from "../../Link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { logOut } from "../../modules/auth/utils/logout";
import { Divider, Slide, useScrollTrigger } from "@mui/material";
import { useTheme } from "@mui/material/styles";

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
    const userState = useUser();
    const theme = useTheme();

    return (
        <>
            <Slide appear={false} direction="down" in={!useScrollTrigger()}>
                <AppBar color="default" enableColorOnDark elevation={0}>
                    <Container maxWidth="lg">
                        <Toolbar disableGutters>
                            {/* logo & link to home */}
                            <Link
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
                                />
                            </Link>

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
                                    sx={{
                                        display: { xs: "block", md: "none" },
                                    }}
                                >
                                    {!userState.user && (
                                        <MenuItem>
                                            <Typography variant="body2">
                                                Sign In
                                            </Typography>
                                        </MenuItem>
                                    )}
                                    <Link
                                        href="/guide"
                                        color="inherit"
                                        underline="none"
                                    >
                                        <MenuItem>
                                            <Typography variant="body2">
                                                Guide
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
                                <Link
                                    href="/guide"
                                    underline={"hover"}
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
                                </Link>
                            </Box>

                            {/* sign in button / account button */}
                            <Box sx={{ flexGrow: 0 }}>
                                {userState.user ? (
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{
                                            p: 0,
                                            marginLeft: { xs: 1, md: 2 },
                                        }}
                                    >
                                        <Avatar
                                            alt={
                                                userState.user.user_metadata
                                                    .name
                                            }
                                            src={
                                                userState.user.user_metadata
                                                    .avatar_url
                                            }
                                        />
                                    </IconButton>
                                ) : (
                                    <Button
                                        onClick={handleOpenUserMenu}
                                        variant="contained"
                                        sx={{
                                            marginLeft: 2,
                                            display: { xs: "none", md: "flex" },
                                        }}
                                    >
                                        Sign In
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
                                >
                                    <Link
                                        href="/account"
                                        color="inherit"
                                        underline="none"
                                    >
                                        <MenuItem>
                                            <Typography variant="body2">
                                                Account
                                            </Typography>
                                        </MenuItem>
                                    </Link>
                                    <MenuItem
                                        onClick={async () =>
                                            await logOut(router)
                                        }
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
            {/* empty toolbar to enforce proper top spacing for content with sliding appbar */}
            <Toolbar sx={{ flex: "0 1 auto" }} />
        </>
    );
};
export default ResponsiveAppBar;
