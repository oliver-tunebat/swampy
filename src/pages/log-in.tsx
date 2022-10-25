import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import AuthForm from "../modules/auth/components/AuthForm";
import useAuthStore, { AuthFormViewType } from "../modules/auth/store";
import { useUser } from "@supabase/auth-helpers-react";
import { Button } from "@mui/material";
import { supabaseClient } from "../common/utils/supabaseClient";

const LogIn: NextPage = () => {
    const setViewType = useAuthStore(
        (state) => (viewType: AuthFormViewType) =>
            state.setAuthFormViewType(viewType)
    );

    const user = useUser();

    // force login view on mount, only executes once
    React.useEffect(() => {
        setViewType("login");
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
        </Container>
    );
};

export default LogIn;
