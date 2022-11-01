import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import NavLink from "../common/components/NavLink";
import SpotifyLoginButton from "../modules/auth/components/SpotifySignInButton";
import AppleLoginButton from "../modules/auth/components/AppleSignInButton";
import PageContainer from "../common/components/PageContainer";
import Head from "next/head";

const Home: NextPage = () => {
    let content = (
        <>
            <SpotifyLoginButton />
            <AppleLoginButton />
        </>
    );

    return (
        <PageContainer>
            <Head>
                <title>Swampy - A Boilerplate for Web Apps</title>
                <meta
                    name="description"
                    content="Swampy is a boilerplate project that can be used to create any kind of web app. 
                        It comes with many prebuilt, generalized features. 
                        Swampy is built with Typescript, Next.js, Material UI, and Supabase."
                />
            </Head>
            <SpotifyLoginButton />
            <AppleLoginButton />
            <br />
            <NavLink href="/api/auth/user">User Data</NavLink>
        </PageContainer>
    );
};

export default Home;
