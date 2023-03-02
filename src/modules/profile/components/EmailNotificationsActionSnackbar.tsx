import * as React from "react";
import {
    Badge,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import { enableEmailNotifications, useGetProfile } from "../apiCalls";
import ActionSnackbar from "../../notifications/components/ActionSnackbar";
import { trackEvent } from "../../analytics/utils/plausible";

export default function EmailNotificationsActionSnackbar() {
    const { profile, mutate } = useGetProfile();

    const [hasReceivedInteraction, setHasReceivedInteraction] = React.useState(false);

    const open = profile && profile.isEmailNotificationsEnabled == null && !hasReceivedInteraction;

    // prevent opening again after interaction
    if (!(open ?? true) && !hasReceivedInteraction) {
        setHasReceivedInteraction(true);
    }

    const handleButtonClick = async (affirm: boolean) => {
        if (!profile) {
            return;
        }

        await mutate(
            async () => (await enableEmailNotifications(affirm)).response?.data,
            { optimisticData: { ...profile, isEmailNotificationsEnabled: affirm },
                rollbackOnError: true,
                populateCache: true,
                revalidate: true,
            },
        ).then(() => {
            trackEvent("Clicked Email Preferences Snack", { consented: affirm });
        });
    };

    return (
        <ActionSnackbar
            open={open ?? false}
        >
            <Badge
                color="primary"
                badgeContent=" "
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
            >
                <Card
                    variant="elevation"
                    raised
                >
                    <CardContent>
                        <Typography>
                            Would you like to receive news & updates regarding
                            Swampy? No spam! Just occasional informative emails.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {/* buttons must be same size to comply with regulations */}
                        {/* fullWidth is used so the width matches */}
                        <Button
                            variant="outlined"
                            onClick={() => handleButtonClick(false)}
                            size="large"
                            fullWidth
                        >
                            No
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleButtonClick(true)}
                            size="large"
                            fullWidth
                        >
                            Yes
                        </Button>
                    </CardActions>
                </Card>
            </Badge>
        </ActionSnackbar>
    );
}
