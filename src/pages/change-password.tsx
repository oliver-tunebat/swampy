import * as React from "react";
import type { NextPage } from "next";
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
    const [isButtonLoading, setIsButtonLoading] = React.useState(false);

    const passwordIsValid = validatePassword(password);

    const handleContinueClick = async (
        event: React.MouseEvent<HTMLElement>,
    ) => {
        // prevent navigation
        event.preventDefault();

        setIsButtonLoading(true);
        const { error } = await supabaseClient.auth.updateUser({
            password: password,
        });
        setPassword("");
        setIsButtonLoading(false);

        if (error) {
            showSnackbar("Unable to update password.", "error");
        } else {
            showSnackbar("Successfully updated password!", "success");
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
            <Typography
                variant="h4"
                component="h1"
            >
                Change Password
            </Typography>
            <form>
                <SecureTextField
                    label="New Password"
                    variant="outlined"
                    sx={{ mt: 6 }}
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
                    onClick={handleContinueClick}
                    loading={isButtonLoading}
                    type="submit"
                >
                    Continue
                </LoadingButton>
            </form>
        </PageContainer>
    );
};

export default ChangePassword;
