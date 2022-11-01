import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import AuthForm from "../modules/auth/components/AuthForm";
import useAuthStore, { AuthFormViewType } from "../modules/auth/store";
import { useUser } from "@supabase/auth-helpers-react";
import { Button } from "@mui/material";
import { supabaseClient } from "../common/utils/supabaseClient";
import PageContainer from "../common/components/PageContainer";
import Head from "next/head";

const SignUp: NextPage = () => {
    const setViewType = useAuthStore(
        (state) => (viewType: AuthFormViewType) =>
            state.setAuthFormViewType(viewType)
    );

    const user = useUser();

    // force sign up view on mount, only executes once
    React.useEffect(() => {
        setViewType("signUp");
    }, []);

    return (
        <PageContainer
            sx={{
                display: "flex",
                flex: "1 1 auto",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Head>
                <title>Sign Up | Swampy</title>
            </Head>
            {user ? (
                <Button
                    variant="contained"
                    onClick={async () => await supabaseClient.auth.signOut()}
                >
                    Log Out
                </Button>
            ) : (
                <AuthForm showTitle />
            )}
        </PageContainer>
    );
};

export default SignUp;
