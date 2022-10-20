import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import NavLink from "../common/components/NavLink";
import SpotifyLoginButton from "../modules/auth/components/SpotifySignInButton";
import LogOutButton from "../modules/auth/components/LogOutButton";
import AppleLoginButton from "../modules/auth/components/AppleSignInButton";

const Home: NextPage = () => {
    let content = (
        <>
            <SpotifyLoginButton />
            <AppleLoginButton />
            <LogOutButton />
        </>
    );

    return (
        <Container maxWidth="lg" sx={{ flex: "1 1 auto" }}>
            <SpotifyLoginButton />
            <AppleLoginButton />
            <LogOutButton />
            <br />
            <NavLink href="/api/auth/user">User Data</NavLink>
        </Container>
    );
};

export default Home;
