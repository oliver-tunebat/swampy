import * as React from "react";
import type { GetServerSideProps, NextPage } from "next";
import PageContainer from "../common/components/PageContainer";
import Head from "next/head";
import { Container, TextField, Typography } from "@mui/material";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { LoadingButton } from "@mui/lab";
import { sendMessage } from "../modules/messaging/apiCalls";
import showSnackbar from "../modules/notifications/utils/showSnackbar";

const Contact: NextPage = () => {
    const [message, setMessage] = React.useState("");
    const [isButtonLoading, setIsButtonLoading] = React.useState(false);

    const handleSendMessageClick = async (
        event: React.MouseEvent<HTMLElement>,
    ) => {
        // prevent navigation
        event.preventDefault();

        setIsButtonLoading(true);

        const { error } = await sendMessage(message);

        if (!error) {
            setMessage("");

            showSnackbar("Your message hase been sent.", "success");
        }

        setIsButtonLoading(false);
    };


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
                <title>Contact Us | Swampy</title>
            </Head>

            <Container maxWidth="xs" disableGutters>
                <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                    Contact Us
                </Typography>

                <form>
                    <TextField
                        label="Your message to us"
                        variant="outlined"
                        sx={{ mt: 6 }}
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={20}
                        value={message}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setMessage(event.target.value)
                        }
                    />
                    <LoadingButton
                        size="large"
                        color="primary"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 4 }}
                        disabled={message.length < 1}
                        onClick={handleSendMessageClick}
                        loading={isButtonLoading}
                        type="submit"
                    >
                        Send Message
                    </LoadingButton>
                </form>
            </Container>
        </PageContainer>
    );
};

export default Contact;

export const getServerSideProps: GetServerSideProps = async(context) => {
    const supabase = createServerSupabaseClient(context);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            redirect: {
                destination: "/log-in",
                permanent: false,
            },
        };
    }

    return { props: {} };
};