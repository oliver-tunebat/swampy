import {
    Badge,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import useNotificationsStore from "../../notifications/store";

export default function NotificationsActionCard() {
    const hideSiteActionSnackbar = useNotificationsStore(
        (state) => () => state.hideSiteActionSnackbar()
    );

    return (
        <Badge
            color="primary"
            badgeContent=" "
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
        >
            <Card variant="elevation" raised>
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
                        onClick={hideSiteActionSnackbar}
                        size="large"
                        fullWidth
                    >
                        No
                    </Button>
                    <Button
                        variant="contained"
                        onClick={hideSiteActionSnackbar}
                        size="large"
                        fullWidth
                    >
                        Yes
                    </Button>
                </CardActions>
            </Card>
        </Badge>
    );
}
