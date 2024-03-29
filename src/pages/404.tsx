import * as React from "react";
import type { NextPage } from "next";
import PageContainer from "../common/components/PageContainer";
import Head from "next/head";
import { Typography } from "@mui/material";
import NavLink from "../common/components/NavLink";
import { trackEvent } from "../modules/analytics/utils/plausible";
import { useEffect } from "react";

const _404: NextPage = () => {
    useEffect(() => {
        trackEvent("404", { path: document.location.pathname });
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
                <title>404 - This page could not be found</title>
            </Head>

            <Typography
                variant="h2"
                component="h1"
                sx={{ mb: 4 }}
            >
                404
            </Typography>
            <Typography variant="body1">
                This page could not be found.{" "}
                <NavLink href={"/"}>Return home</NavLink>.
            </Typography>
        </PageContainer>
    );
};

export default _404;
