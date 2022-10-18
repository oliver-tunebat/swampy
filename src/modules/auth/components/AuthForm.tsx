import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useAuthStore, { AuthFormViewType } from "../store";
import {
    Box,
    Container,
    Divider,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import AppleSignInButton from "./AppleSignInButton";
import SpotifySignInButton from "./SpotifySignInButton";
import NavLink from "../../../common/components/NavLink";
import { validateEmail } from "../../../common/utils/validateEmail";
import SecureTextField from "../../../common/components/SecureTextField";

export default function AuthForm() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const emailIsValid = validateEmail(email);
    const passwordIsValid =
        password.length >=
        parseInt(process.env.NEXT_PUBLIC_PASSWORD_LENGTH ?? "0");

    const viewType = useAuthStore((state) => state.authFormViewType);
    const setViewType = useAuthStore(
        (state) => (viewType: AuthFormViewType) =>
            state.setAuthFormViewType(viewType)
    );

    // if there's no valid email, disable completeSignUp view
    if (!emailIsValid && viewType === "completeSignUp") {
        setViewType("signUp");
    }

    const handleContinueClick = () => {
        if (viewType === "signUp") {
            setViewType("completeSignUp");
        }
    };

    const emailErrorText =
        email.length > 0 && !emailIsValid ? "invalid email address" : null;

    const continueButtonDisabled =
        !emailIsValid || (!passwordIsValid && viewType === "completeSignUp");

    return (
        <Container maxWidth="xxsContainer" disableGutters>
            {(viewType === "signUp" || viewType === "login") && (
                <>
                    <Typography variant="caption">
                        By continuing, you{" "}
                        {viewType === "signUp"
                            ? "create a Swampy account and "
                            : " "}
                        agree to our{" "}
                        <NavLink href="/user-agreement" target="_blank">
                            User Agreement
                        </NavLink>{" "}
                        and{" "}
                        <NavLink href="/privacy-policy" target="_blank">
                            Privacy Policy
                        </NavLink>
                        .
                    </Typography>
                    <AppleSignInButton
                        size="large"
                        variant="contained"
                        fullWidth
                        sx={{ my: 2 }}
                    />
                    <SpotifySignInButton
                        size="large"
                        variant="contained"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Divider>
                        <Typography variant="body2" color="text.secondary">
                            OR
                        </Typography>
                    </Divider>
                </>
            )}
            {viewType !== "completeSignUp" && (
                <TextField
                    label="Email"
                    variant="outlined"
                    sx={{ mt: 2 }}
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(event.target.value)
                    }
                    error={Boolean(emailErrorText)}
                    helperText={emailErrorText}
                    name="email"
                />
            )}
            {viewType === "completeSignUp" && (
                <List>
                    <ListItem
                        disableGutters
                        secondaryAction={
                            <IconButton
                                edge="end"
                                aria-label="change email"
                                onClick={() => setViewType("signUp")}
                                size="small"
                            >
                                <Edit />
                            </IconButton>
                        }
                    >
                        <ListItemText primary={email} />
                    </ListItem>
                </List>
            )}
            {(viewType === "login" || viewType === "completeSignUp") && (
                <SecureTextField
                    label="Password"
                    variant="outlined"
                    sx={{ mt: 2 }}
                    fullWidth
                    value={password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(event.target.value)
                    }
                    error={
                        !passwordIsValid &&
                        password.length > 0 &&
                        viewType === "completeSignUp"
                    }
                    helperText={
                        viewType === "completeSignUp"
                            ? "password must be at least 8 characters long."
                            : ""
                    }
                    autoComplete="new-password"
                />
            )}
            <Button
                size="large"
                color="primary"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                disabled={continueButtonDisabled}
                onClick={handleContinueClick}
            >
                Continue
            </Button>
            {(viewType === "signUp" || viewType === "completeSignUp") && (
                <Box textAlign="center" sx={{ mt: 2 }}>
                    <Typography variant="caption">
                        Already have an account?{" "}
                    </Typography>
                    <Link
                        component="button"
                        onClick={() => setViewType("login")}
                    >
                        <Typography variant="caption">Log in</Typography>
                    </Link>
                </Box>
            )}
            {(viewType === "login" || viewType === "recoverPassword") && (
                <Box textAlign="center" sx={{ mt: 2 }}>
                    <Typography variant="caption">
                        Don't have an account?{" "}
                    </Typography>
                    <Link
                        component="button"
                        onClick={() => setViewType("signUp")}
                    >
                        <Typography variant="caption">Sign up</Typography>
                    </Link>
                </Box>
            )}
            {viewType === "login" && (
                <Box textAlign="center" sx={{ mt: 1 }}>
                    <Typography variant="caption">Forgot </Typography>
                    <Link
                        component="button"
                        onClick={() => setViewType("recoverPassword")}
                    >
                        <Typography variant="caption">password</Typography>
                    </Link>
                    <Typography variant="caption">?</Typography>
                </Box>
            )}
            {viewType === "recoverPassword" && (
                <Box textAlign="center" sx={{ mt: 1 }}>
                    <Link
                        component="button"
                        onClick={() => setViewType("login")}
                    >
                        <Typography variant="caption">Log in</Typography>
                    </Link>
                </Box>
            )}
        </Container>
    );
}
