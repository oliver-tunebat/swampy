import * as React from "react";
import type { NextPage } from "next";
import Typography from "@mui/material/Typography";
import NavLink from "../common/components/NavLink";
import { User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import PageContainer from "../common/components/PageContainer";
import { Link, List, ListItem, ListItemText } from "@mui/material";
import ConfirmationDialog from "../common/components/ConfirmationDialog";
import { deleteUser } from "../modules/auth/api/authAPI";
import Head from "next/head";

const Account: NextPage<AccountProps> = (props: AccountProps) => {
    const { user } = props;

    const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] =
        React.useState(false);

    return (
        <PageContainer>
            <Head>
                <title>Account | Swampy</title>
            </Head>
            <Typography variant="h4" component="h1">
                Your Account
            </Typography>
            <List>
                <ListItem disableGutters>
                    <ListItemText
                        primary="Email Address"
                        secondary={user.email}
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
            </List>
            <ConfirmationDialog
                open={isDeleteAccountDialogOpen}
                onClose={() => setIsDeleteAccountDialogOpen(false)}
                titleText="Delete your account?"
                content="Your account will be permanently deleted and cannot be recovered."
                danger
                confirmText="Delete Account"
                showLoading
                onConfirm={deleteUser}
            />
        </PageContainer>
    );
};

export default Account;

export const getServerSideProps = withPageAuth({
    authRequired: true,
    redirectTo: "/log-in",
    async getServerSideProps(ctx, supabaseClient) {
        // Access the user object
        const {
            data: { user },
        } = await supabaseClient.auth.getUser();

        return { props: user };
    },
});

interface AccountProps {
    user: User;
}
