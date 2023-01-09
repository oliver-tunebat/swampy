import * as React from "react";
import type { NextPage } from "next";
import AuthForm from "../modules/auth/components/AuthForm";
import useAuthStore, { AuthFormViewType } from "../modules/auth/store";
import { useUser } from "@supabase/auth-helpers-react";
import PageContainer from "../common/components/PageContainer";
import Head from "next/head";
import { useRouter } from "next/router";

const SignUp: NextPage = () => {
    const setViewType = useAuthStore(
        (state) => (viewType: AuthFormViewType) =>
            state.setAuthFormViewType(viewType),
    );

    const router = useRouter();
    const user = useUser();

    // if user is authenticated redirect to home
    if (user) {
        router.replace("/");
    }

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
            <AuthForm showTitle />
        </PageContainer>
    );
};

export default SignUp;
