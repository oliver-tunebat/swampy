import { Container, ContainerProps } from "@mui/material";

export default function PageContainer(props: ContainerProps) {
    const { sx, ...other } = props;

    return (
        <Container
            maxWidth="md"
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
        />
    );
}
