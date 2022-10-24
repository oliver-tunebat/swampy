import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import NavLink from "../common/components/NavLink";
import SpotifyLoginButton from "../modules/auth/components/SpotifySignInButton";
import AppleLoginButton from "../modules/auth/components/AppleSignInButton";

const Home: NextPage = () => {
    let content = (
        <>
            <SpotifyLoginButton />
            <AppleLoginButton />
        </>
    );

    return (
        <Container maxWidth="lg" sx={{ flex: "1 1 auto" }}>
            <SpotifyLoginButton />
            <AppleLoginButton />
            <br />
            <NavLink href="/api/auth/user">User Data</NavLink>
        </Container>
    );
};

export default Home;
