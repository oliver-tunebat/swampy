import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import NavLink from "../common/components/NavLink";
import SpotifyLoginButton from "../modules/auth/components/SpotifySignInButton";
import { getUser, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import LogOutButton from "../modules/auth/components/LogOutButton";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "../common/utils/supabaseClient";
import AppleLoginButton from "../modules/auth/components/AppleSignInButton";

const Home: NextPage = () => {
    // const Home: NextPage<IndexProps> = (props: IndexProps) => {
    const { user, isLoading } = useUser();

    // hack to force auth data to load
    const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
            window.dispatchEvent(new Event("visibilitychange"));
            authListener?.unsubscribe();
        }
    );

    let content = (
        <>
            <SpotifyLoginButton />
            <AppleLoginButton />
            <LogOutButton />
        </>
    );
    if (!user || isLoading) {
        content = <SpotifyLoginButton />;
    }

    return (
        <Container maxWidth="lg" sx={{ flex: "1 1 auto" }}>
            <SpotifyLoginButton />
            <AppleLoginButton />
            <LogOutButton />
            <br />
            <NavLink href="/api/auth/user">User Data</NavLink>
            <Typography>loading: {isLoading.toString()}</Typography>
            <Typography>email: {user?.email}</Typography>
        </Container>
    );
};

export default Home;

// export const getServerSideProps = withPageAuth({
//     authRequired: false,
//     async getServerSideProps(ctx) {
//         // Access the user object
//         let { user, accessToken } = await getUser(ctx);

//         // if (!user) {}
//         return { props: user };
//     },
// });

// interface IndexProps {
//     user: User;
// }
