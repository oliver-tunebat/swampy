import * as React from "react";
import { Container, ContainerProps, Typography } from "@mui/material";

export default function PageContainer(props: PageContainerProps) {
    const { sx, heading, children, ...other } = props;

    return (
        <Container
            maxWidth="maxSiteWidth"
            sx={{
                flex: "1 1 auto",
                // 100% view height minus y margins and toolbar height
                minHeight: {
                    xs: "calc(100vh - 184px)",
                    sm: "calc(100vh - 192px)",
                },
                my: 8,
                ...sx,
            }}
            {...other}
        >
            {heading && <Typography
                variant="h3"
                component="h1"
                sx={{ mb: 8 }}
            >
                {heading}
            </Typography>}
            {children}
        </Container>
    );
}

interface PageContainerProps extends ContainerProps {
    heading?: string
}