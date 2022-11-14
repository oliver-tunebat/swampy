import { Container, ContainerProps } from "@mui/material";

export default function PageContainer(props: ContainerProps) {
    return <Container maxWidth="md" sx={{ flex: "1 1 auto" }} {...props} />;
}
