import * as React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { supabaseClient } from "../common/utils/supabaseClient";
import PageContainer from "../common/components/PageContainer";
import Head from "next/head";
import showSnackbar from "../modules/notifications/utils/showSnackbar";
import { validateEmail } from "../common/utils/validateEmail";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const ChangeEmail: NextPage = () => {
    const [email, setEmail] = React.useState("");
    const [isButtonLoading, setIsButtonLoading] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const emailIsValid = validateEmail(email);

    const emailErrorText =
        email.length > 0 && !emailIsValid ? "invalid email address" : null;

    const handleContinueClick = async (
        event: React.MouseEvent<HTMLElement>,
    ) => {
        // prevent navigation
        event.preventDefault();

        setIsButtonLoading(true);
        setIsSuccess(false);
        const { error } = await supabaseClient.auth.updateUser({
            email: email,
        });
        setEmail("");
        setIsButtonLoading(false);

        if (error) {
            showSnackbar("Unable to update email.", "error");
        } else {
            setIsSuccess(true);
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
                <title>Change Email | Swampy</title>
            </Head>
            <Typography
                variant="h4"
                component="h1"
            >
                Change Email
            </Typography>
            <form>
                <TextField
                    label="New Email"
                    variant="outlined"
                    sx={{ mt: 6 }}
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(event.target.value)
                    }
                    error={Boolean(emailErrorText)}
                    helperText={emailErrorText}
                    name="email"
                />
                <LoadingButton
                    size="large"
                    color="primary"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 4 }}
                    disabled={!emailIsValid}
                    onClick={handleContinueClick}
                    loading={isButtonLoading}
                    type="submit"
                >
                    Continue
                </LoadingButton>
            </form>
            {isSuccess && (
                <Typography
                    sx={{ mt: 4 }}
                    variant="body2"
                >
                    A link was sent to both your old and new email addresses.
                    Click both links to finish updating your email.
                </Typography>
            )}
        </PageContainer>
    );
};

export default ChangeEmail;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const supabase = createServerSupabaseClient(context);

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return {
            redirect: {
                destination: "/log-in",
                permanent: false,
            },
        };
    }

    return { props: {} };
};