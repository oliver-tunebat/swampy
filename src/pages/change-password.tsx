import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import { validatePassword } from "../common/utils/validatePassword";
import SecureTextField from "../common/components/SecureTextField";
import { Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { supabaseClient } from "../common/utils/supabaseClient";
import PageContainer from "../common/components/PageContainer";
import Head from "next/head";
import showSnackbar from "../modules/notifications/utils/showSnackbar";

const ChangePassword: NextPage = () => {
    const [password, setPassword] = React.useState("");
    const [buttonLoading, setbuttonLoading] = React.useState(false);

    const passwordIsValid = validatePassword(password);

    const handleSubmitClick = async () => {
        setbuttonLoading(true);
        const { data, error } = await supabaseClient.auth.updateUser({
            password: password,
        });
        setPassword("");
        setbuttonLoading(false);

        if (error) showSnackbar("Unable to update password.", "error");
        else {
            showSnackbar("Succesfully updated password!", "success");
        }
    };

    return (
        <PageContainer
            maxWidth="xxsContainer"
            sx={{
                display: "flex",
                flex: "1 1 auto",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <Head>
                <title>Change Password | Swampy</title>
            </Head>
            <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                Change Password
            </Typography>
            <SecureTextField
                label="New Password"
                variant="outlined"
                sx={{ mt: 2 }}
                fullWidth
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
                }
                error={!passwordIsValid && password.length > 0}
                helperText="password must be at least 8 characters long."
                autoComplete="new-password"
            />
            <LoadingButton
                size="large"
                color="primary"
                variant="contained"
                fullWidth
                sx={{ mt: 4 }}
                disabled={!passwordIsValid}
                onClick={handleSubmitClick}
                loading={buttonLoading}
            >
                Continue
            </LoadingButton>
        </PageContainer>
    );
};

export default ChangePassword;
