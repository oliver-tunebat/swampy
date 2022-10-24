import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import AuthForm from "../modules/auth/components/AuthForm";
import useAuthStore, { AuthFormViewType } from "../modules/auth/store";

const SignUp: NextPage = () => {
    const setViewType = useAuthStore(
        (state) => (viewType: AuthFormViewType) =>
            state.setAuthFormViewType(viewType)
    );

    // force sign up view on mount, only executes once
    React.useEffect(() => {
        setViewType("signUp");
    }, []);

    return (
        <Container
            maxWidth="lg"
            sx={{
                display: "flex",
                flex: "1 1 auto",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <AuthForm showTitle />
        </Container>
    );
};

export default SignUp;
