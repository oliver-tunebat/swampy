import {
    CheckCircle,
    Pending,
    RadioButtonUnchecked,
} from "@mui/icons-material";
import {
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import { TooltipHelpButton } from "../../../common/components/TooltipHelpButton";

export function FeaturesList(props: FeaturesListProps) {
    const { features, heading } = props;

    const theme = useTheme();

    return (
        <>
            {heading && (
                <Typography variant="h5" component="h3" sx={{ mt: 8 }}>
                    {heading}
                </Typography>
            )}
            <List sx={{ mt: 2 }} disablePadding>
                {features.map((feature, i) => {
                    const { text, detailText, status, nestLevel, href } =
                        feature;

                    return (
                        <ListItem
                            disableGutters
                            sx={{ pl: (nestLevel ?? 0) * 4 }}
                            dense={(nestLevel ?? 0) > 0}
                            key={i}
                        >
                            {/* status indicator */}
                            <ListItemIcon>
                                {status === "implemented" && (
                                    <CheckCircle
                                        color="success"
                                        aria-label="check mark"
                                    />
                                )}
                                {status === "progress" && (
                                    <Pending
                                        color="info"
                                        aria-label="three dots"
                                    />
                                )}
                                {status === "unimplemented" && (
                                    <RadioButtonUnchecked aria-label="empty circle" />
                                )}
                            </ListItemIcon>
                            <ListItemText>
                                {href ? (
                                    <Link
                                        href={href}
                                        color="text.primary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {text}
                                    </Link>
                                ) : (
                                    text
                                )}
                                <TooltipHelpButton
                                    tooltipTitle={detailText}
                                    sx={{ ml: 1 }}
                                    placement="right"
                                />
                            </ListItemText>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
}

interface FeaturesListProps {
    heading?: string;
    features: FeatureListFeature[];
}

export interface FeatureListFeature {
    text: string;
    detailText?: string;
    status: "implemented" | "progress" | "unimplemented";
    nestLevel?: number;
    href?: string;
}
