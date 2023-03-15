import * as React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Typography from "@mui/material/Typography";
import NavLink from "../common/components/NavLink";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import PageContainer from "../common/components/PageContainer";
import { Checkbox, FormControlLabel, Link, List, ListItem, ListItemText, Skeleton } from "@mui/material";
import ConfirmationDialog from "../common/components/ConfirmationDialog";
import { deleteProfile, enableEmailNotifications, useGetProfile } from "../modules/profile/apiCalls";
import Head from "next/head";
import makeSerializable from "../modules/networking/utils/makeSerializable";
import { prismaClient } from "../common/utils/prismaClient";
import { SWRConfig } from "swr";
import { Profile } from "@prisma/client";

const Account: NextPage<AccountProps> = (props: AccountProps) => {
    const { fallback } = props;

    return (
        <PageContainer>
            <Head>
                <title>Account | Swampy</title>
            </Head>
            <Typography
                variant="h4"
                component="h1"
            >
                Your Account
            </Typography>
            <SWRConfig value={{ fallback }}>
                <AccountActionList />
            </SWRConfig>
        </PageContainer>
    );
};

function AccountActionList() {
    const { profile, mutate } = useGetProfile();

    const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] =
        React.useState(false);

    const handleEmailNotificationsCheckedChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        await mutate(
            async () => (await enableEmailNotifications(event.target.checked)).response?.data,
            { optimisticData: { ...(profile as Profile), isEmailNotificationsEnabled: event.target.checked },
                rollbackOnError: true,
                populateCache: true,
                revalidate: true,
            },
        );
    };

    return (
        <List>
            <ListItem disableGutters>
                <ListItemText
                    primary="Email Address"
                    secondary={profile?.email ?? <Skeleton width={"150px"}/>}
                />
            </ListItem>
            <ListItem disableGutters>
                <FormControlLabel
                    control={<Checkbox
                        checked={profile?.isEmailNotificationsEnabled ?? false}
                        onChange={handleEmailNotificationsCheckedChange}
                        inputProps={{ "aria-label": "controlled" }}
                    />}
                    label="Receive email updates from Swampy"
                />
            </ListItem>
            <ListItem disableGutters>
                <NavLink href="/change-email">
                    <ListItemText primary="Change Email" />
                </NavLink>
            </ListItem>
            <ListItem disableGutters>
                <NavLink href="/change-password">
                    <ListItemText primary="Change Password" />
                </NavLink>
            </ListItem>
            <ListItem disableGutters>
                <Link
                    component="button"
                    color="error"
                    onClick={() => setIsDeleteAccountDialogOpen(true)}
                >
                    <ListItemText primary="Delete Account" />
                </Link>
            </ListItem>
            <ConfirmationDialog
                open={isDeleteAccountDialogOpen}
                onClose={() => setIsDeleteAccountDialogOpen(false)}
                titleText="Delete your account?"
                content="Your account will be permanently deleted and cannot be recovered."
                danger
                confirmText="Delete Account"
                showLoading
                onConfirm={deleteProfile}
            />
        </List>
    );
}

export default Account;

export const getServerSideProps: GetServerSideProps = async (context) => {
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

    const profile = await prismaClient.profile.findUnique({
        where: {
            id: user.id,
        },
    });

    return { props: { fallback: { "/api/profile/get": makeSerializable(profile) } } };
};

interface AccountProps {
    fallback: { "/api/profile/get": Profile }
}
