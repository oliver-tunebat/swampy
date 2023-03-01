import * as React from "react";
import type { NextPage } from "next";
import NavLink from "../common/components/NavLink";
import PageContainer from "../common/components/PageContainer";
import Head from "next/head";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import {
    LanguageTypescript,
    Triangle,
    React as ReactIcon,
    LightningBolt,
    MaterialUi,
    TeddyBear,
    Elephant,
    Bullseye,
    Pyramid,
    Eslint,
} from "mdi-material-ui";
import TechnologyCard from "../modules/pages/index/components/TechnologyCard";
import { CloudOutlined, Email } from "@mui/icons-material";
import { FeaturesList } from "../modules/pages/index/components/FeaturesList";
import {
    backEndFeatures,
    frontEndFeatures,
    developerFeatures,
    userFeatures,
} from "../modules/pages/index/constants/featureListContents";

const Home: NextPage = () => {
    return (
        <PageContainer>
            <Head>
                <title>Swampy - A Boilerplate for Web Apps</title>
                <meta
                    name="description"
                    content="Swampy is a boilerplate project that can be used to create any kind of web app.
                        It comes with many prebuilt, generalized features.
                        Swampy is built with Typescript, Next.js, Material UI, and Supabase."
                />
            </Head>

            {/* section start */}
            <Typography
                variant="h2"
                component="h1"
                color="primary"
                align="center"
                sx={{ fontWeight: 700 }}
            >
                Swampy
            </Typography>
            <Typography
                variant="h6"
                component="p"
                align="center"
                sx={{ mt: 8 }}
                color="text.secondary"
            >
                An accessible, feature-rich, boilerplate project for web apps.
            </Typography>
            <Box display="flex" justifyContent="center" sx={{ mt: 8 }}>
                <Button
                    component={NavLink}
                    href="/guide"
                    size="large"
                    variant="contained"
                >
                    Get Started
                </Button>
            </Box>
            <Typography variant="body1" sx={{ mt: 8 }}>
                Swampy is an open source web app with generic features (like
                authentication) that every app needs. With it, you can fast
                forward through project set up and get right into developing the
                core features of your app.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
                This website is Swampy. You can experience the features and UI
                just by clicking around.
            </Typography>
            {/* section end */}

            {/* section start */}
            <Typography variant="h4" component="h2" sx={{ mt: 10 }}>
                Technologies Used
            </Typography>
            <Divider sx={{ width: "100%", mt: 1 }} />
            <Typography variant="body1" sx={{ mt: 4 }}>
                Swampy is built with a variety of industry leading technologies
                that you're probably already familiar with.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
                We choose technologies based on <b>WHARF</b> (an acronym we made
                up):
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }} component="span">
                <ul>
                    <li>
                        <b>W</b>idely used
                    </li>
                    <li>
                        <b>H</b>igh performance
                    </li>
                    <li>
                        <b>A</b>ffordable
                    </li>
                    <li>
                        <b>R</b>obust
                    </li>
                    <li>
                        <b>F</b>un to work with
                    </li>
                </ul>
            </Typography>
            <Grid container spacing={4} sx={{ mt: 4 }}>
                <Grid item md={4} sm={6} xs={12}>
                    <TechnologyCard
                        title="TypeScript"
                        subheader="Language"
                        icon={<LanguageTypescript />}
                        iconColor="#3178c6"
                        href="https://www.typescriptlang.org/"
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <TechnologyCard
                        title="React"
                        subheader="Frontend"
                        icon={<ReactIcon />}
                        iconColor="#61dafb"
                        href="https://reactjs.org/"
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <TechnologyCard
                        title="Next.js"
                        subheader="Backend"
                        icon={"N"}
                        iconColor="#000"
                        href="https://nextjs.org/"
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <TechnologyCard
                        title="Supabase"
                        subheader="Auth, DB Host, Storage"
                        icon={<LightningBolt />}
                        iconColor="#6de7ba"
                        href="https://supabase.com/"
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <TechnologyCard
                        title="PostgreSQL"
                        subheader="Database"
                        icon={<Elephant />}
                        iconColor="#33678e"
                        href="https://www.postgresql.org/"
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <TechnologyCard
                        title="Material UI"
                        subheader="UI Components"
                        icon={<MaterialUi />}
                        iconColor="#0180f9"
                        href="https://mui.com/"
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <TechnologyCard
                        title="ESLint"
                        subheader="Code Formatting"
                        icon={<Eslint />}
                        iconColor="#4c33be"
                        href="https://eslint.org/"
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <TechnologyCard
                        title="Vercel"
                        subheader="Hosting"
                        icon={<Triangle />}
                        iconColor="#000"
                        href="https://vercel.com/"
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <TechnologyCard
                        title="Prisma"
                        subheader="ORM"
                        icon={<Pyramid />}
                        iconColor="#5a67d8"
                        href="https://www.prisma.io/"
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <TechnologyCard
                        title="SendGrid"
                        subheader="Emails"
                        icon={<Email />}
                        iconColor="#3368fa"
                        href="https://sendgrid.com/"
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <TechnologyCard
                        title="Plausible"
                        subheader="Analytics"
                        icon={"P"}
                        iconColor="#5850ec"
                        href="https://plausible.io/"
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <TechnologyCard
                        title="Zustand"
                        subheader="Client State"
                        icon={<TeddyBear />}
                        iconColor="#56283b"
                        href="https://github.com/pmndrs/zustand"
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <TechnologyCard
                        title="SWR"
                        subheader="Client-Server State"
                        icon={"S"}
                        iconColor="#000"
                        href="https://swr.vercel.app/"
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <TechnologyCard
                        title="And more"
                        subheader="..."
                        tooltip="Emotion, Axios, hCaptcha"
                    />
                </Grid>
            </Grid>
            <Typography variant="h5" component="h3" sx={{ mt: 8 }}>
                Recommended and Upcoming
            </Typography>
            <Typography variant="body1" sx={{ mt: 4 }}>
                Here's some other great technologies & services that play nice
                with Swampy. Consider using them, and expect to see some of them
                integrated into the Swampy code base in the future.
            </Typography>

            <Grid container spacing={4} sx={{ mt: 4 }}>
                <Grid item md={4} sm={6} xs={12}>
                    <TechnologyCard
                        title="Stripe"
                        subheader="Payments"
                        icon={"S"}
                        iconColor="#635bff"
                        href="https://stripe.com/"
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <TechnologyCard
                        title="Rewardful"
                        subheader="Affiliate Program"
                        icon={<Bullseye />}
                        iconColor="#1885f9"
                        href="https://www.rewardful.com/"
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <TechnologyCard
                        title="Cloudflare"
                        subheader="Security, CDN, More"
                        icon={<CloudOutlined />}
                        iconColor="#f63"
                        href="https://www.cloudflare.com/"
                    />
                </Grid>
            </Grid>
            {/* section end */}

            {/* section start */}
            <Typography variant="h4" component="h2" sx={{ mt: 10 }}>
                Features
            </Typography>
            <Divider sx={{ width: "100%", mt: 1 }} />
            <Typography variant="body1" sx={{ mt: 4 }}>
                Implemented features are marked with a green check. In progress
                features have three blue dots. Upcoming features have an empty
                circle.
            </Typography>
            <FeaturesList
                features={frontEndFeatures}
                heading="Front End Features"
            />
            <FeaturesList
                features={backEndFeatures}
                heading="Back End Features"
            />
            <FeaturesList features={userFeatures} heading="User Features" />
            <FeaturesList
                features={developerFeatures}
                heading="Developer Features"
            />
            {/* section end */}
        </PageContainer>
    );
};

export default Home;
