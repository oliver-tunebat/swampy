import {
    Avatar,
    Card,
    CardActionArea,
    CardHeader,
    Link,
    Tooltip,
    useTheme,
} from "@mui/material";
import { ReactNode } from "react";

export default function TechnologyCard(props: TechnologyCardProps) {
    const { title, subheader, iconColor, icon, href, tooltip } = props;

    const theme = useTheme();

    const iconTextColor = theme.palette.getContrastText(iconColor ?? "#fff");

    return (
        <Tooltip title={tooltip}>
            <Card>
                <Link
                    href={href}
                    underline="none"
                    color="text.primary"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <CardActionArea>
                        <CardHeader
                            title={title}
                            titleTypographyProps={{ noWrap: true }}
                            subheader={subheader}
                            subheaderTypographyProps={{ noWrap: true }}
                            action={
                                icon && (
                                    <Avatar
                                        sx={{
                                            backgroundColor: iconColor,
                                            color: iconTextColor,
                                        }}
                                        alt={`${title} icon`}
                                    >
                                        {icon}
                                    </Avatar>
                                )
                            }
                        />
                    </CardActionArea>
                </Link>
            </Card>
        </Tooltip>
    );
}

interface TechnologyCardProps {
    title?: string;
    subheader?: string;
    iconColor?: string;
    href?: string;
    icon?: ReactNode;
    tooltip?: string;
}
