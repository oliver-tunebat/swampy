import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "../Link";
import ProTip from "../ProTip";
import Copyright from "../Copyright";
import { getUser, User, withPageAuth } from "@supabase/auth-helpers-nextjs";

const Account: NextPage = () => {
    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    my: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Account
                </Typography>
                <Box maxWidth="sm">
                    <Button
                        variant="contained"
                        component={Link}
                        noLinkStyle
                        href="/"
                    >
                        Go to the home page
                    </Button>
                </Box>
                <ProTip />
                <Copyright />
            </Box>
        </Container>
    );
};

export default Account;

export const getServerSideProps = withPageAuth({
    authRequired: true,
    redirectTo: "/",
    // async getServerSideProps(ctx) {
    //     // Access the user object
    //     let { user, accessToken } = await getUser(ctx);

    //     // if (!user) {}
    //     return { props: user };
    // },
});

// interface AccountProps {
//     user: User;
// }
