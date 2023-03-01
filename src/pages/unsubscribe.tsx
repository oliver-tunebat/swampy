import * as React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import PageContainer from "../common/components/PageContainer";
import NavLink from "../common/components/NavLink";
import { prismaClient } from "../common/utils/prismaClient";
import { useEffect } from "react";
import { trackEvent } from "../modules/analytics/utils/plausible";

const Unsubscribe: NextPage<UsnubscribeProps> = (props: UsnubscribeProps) => {
    const { success } = props;

    useEffect(() => {
        trackEvent("Unsubscribed from Email Notifications", { success });
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
                <title>Unsubscribe | Swampy</title>
            </Head>
            {success ?
                <Typography variant="h5" component="h1" sx={{ mb: 4 }}>
                    You've unsubscribed from email notifications.
                </Typography>
                :
                <Typography variant="h5" component="h1" sx={{ mb: 4 }}>
                    Unable to unsubscribe from email notifications.
                </Typography>
            }
            <Typography variant="body1">
                {!success && "Contact us for help. "}
                <NavLink href={"/"}>Return home</NavLink>.
            </Typography>
        </PageContainer>
    );
};

export default Unsubscribe;

export const getServerSideProps: GetServerSideProps = async(context) => {
    const { id } = context.query;

    try {
        await prismaClient.profile.update({
            where: {
                id: id as string,
            },
            data: {
                isEmailNotificationsEnabled: false,
            },
        });

        return { props: { success: true } };
    } catch(e){
        return { props: { success: false } };
    }
};

interface UsnubscribeProps {
    success: boolean
}