import * as React from "react";
import TextField from "@mui/material/TextField";
import useAuthStore, { AuthFormViewType } from "../store";
import {
    AlertProps,
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
import Captcha from "../../../common/components/Captcha";
import LoadingButton from "@mui/lab/LoadingButton";
import { supabaseClient } from "../../../common/utils/supabaseClient";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { validatePassword } from "../../../common/utils/validatePassword";
import useNotificationsStore from "../../notifications/store";
import AccountActivationBannerBody from "../../notifications/components/banner-bodies/AccountActivationBannerBody";
import showSnackbar from "../../notifications/utils/showSnackbar";

export default function AuthForm(props: AuthFormProps) {
    const { showTitle } = props;

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [captchaToken, setCaptchaToken] = React.useState("");
    const [continueButtonLoading, setContinueButtonLoading] =
        React.useState(false);

    const viewType = useAuthStore((state) => state.authFormViewType);
    const setViewType = useAuthStore(
        (state) => (viewType: AuthFormViewType) =>
            state.setAuthFormViewType(viewType),
    );
    const closeAuthDialog = useAuthStore(
        (state) => () => state.setAuthDialogOpen(false),
    );

    const setBanner = useNotificationsStore(
        (state) => (showBanner: boolean, alertProps: AlertProps) =>
            state.setBanner(showBanner, alertProps),
    );

    const captchaRef = React.useRef<HCaptcha>(null);

    const emailIsValid = validateEmail(email);
    const passwordIsValid = validatePassword(password);

    // if there's no valid email, disable completeSignUp view
    if (!emailIsValid && viewType === "completeSignUp") {
        setViewType("signUp");
    }

    const title =
        viewType === "login"
            ? "Log In"
            : viewType === "recoverPassword"
                ? "Password Recovery"
                : "Sign Up";

    const emailErrorText =
        email.length > 0 && !emailIsValid ? "invalid email address" : null;

    // disable button if email is not valid
    // or if the password isn't valid for sign up complete
    // or if captcha isn't valie for sign up complete or recover password
    const continueButtonDisabled =
        !emailIsValid ||
        (captchaToken.length < 1 && viewType !== "signUp") ||
        (!passwordIsValid && viewType === "completeSignUp");

    const handleContinueClick = async (
        event: React.MouseEvent<HTMLElement>,
    ) => {
        // prevent navigation
        event.preventDefault();

        if (viewType === "signUp") {
            setViewType("completeSignUp");
        } else if (viewType === "login") {
            setContinueButtonLoading(true);
            const { error } =
                await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password,
                    options: { captchaToken },
                });
            captchaRef.current?.resetCaptcha();
            setCaptchaToken("");
            setContinueButtonLoading(false);

            if (error) {
                showSnackbar("The email or password is incorrect.", "error");
            } else {
                closeAuthDialog();
                showSnackbar("You succesfully logged in!", "success");
            }
        } else if (viewType === "completeSignUp") {
            setContinueButtonLoading(true);
            const { error } = await supabaseClient.auth.signUp({
                email,
                password,
                options: { captchaToken },
            });
            captchaRef.current?.resetCaptcha();
            setCaptchaToken("");
            setContinueButtonLoading(false);

            if (error) {
                showSnackbar("Sign up failed.", "error");
            } else {
                closeAuthDialog();
                setBanner(true, {
                    children: <AccountActivationBannerBody />,
                    severity: "warning",
                });

                // create a listener to remove the banner when the user logs in
                const removeBannerSignInListener =
                    supabaseClient.auth.onAuthStateChange((event) => {
                        if (event === "SIGNED_IN") {
                            setBanner(false, {});
                            showSnackbar(
                                "You succesfully logged in!",
                                "success",
                            );
                            removeBannerSignInListener.data.subscription.unsubscribe();
                        }
                    });
            }
        } else if (viewType === "recoverPassword") {
            setContinueButtonLoading(true);
            const { error } =
                await supabaseClient.auth.resetPasswordForEmail(email, {
                    captchaToken,
                    redirectTo:
                        `${process.env.NEXT_PUBLIC_CURRENT_URL}/change-password` ??
                        undefined,
                });
            captchaRef.current?.resetCaptcha();
            setCaptchaToken("");
            setContinueButtonLoading(false);

            if (error) {
                showSnackbar(
                    "Unable to send a password recovery link.",
                    "error",
                );
            } else {
                showSnackbar(
                    "A password recovery link has been sent to your email address.",
                    "success",
                );
            }
        }
    };

    return (
        <Container
            maxWidth="xxsContainer"
            disableGutters
        >
            {showTitle && (
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ mb: 4 }}
                >
                    {title}
                </Typography>
            )}
            {(viewType === "signUp" || viewType === "login") && (
                <>
                    <Typography
                        variant="caption"
                        sx={{ mb: 4, mt: 2 }}
                        paragraph
                    >
                        By continuing, you{" "}
                        {viewType === "signUp"
                            ? "create a Swampy account and "
                            : " "}
                        agree to our{" "}
                        <NavLink
                            href="/user-agreement"
                            target="_blank"
                        >
                            User Agreement
                        </NavLink>{" "}
                        and{" "}
                        <NavLink
                            href="/privacy-policy"
                            target="_blank"
                        >
                            Privacy Policy
                        </NavLink>
                        .
                    </Typography>
                    <AppleSignInButton
                        size="large"
                        variant="contained"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <SpotifySignInButton
                        size="large"
                        variant="contained"
                        fullWidth
                        sx={{ mb: 4 }}
                    />
                    <Divider>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            OR
                        </Typography>
                    </Divider>
                </>
            )}
            <form>
                {viewType !== "completeSignUp" && (
                    <TextField
                        label="Email"
                        variant="outlined"
                        sx={{ mt: 4 }}
                        fullWidth
                        type="email"
                        value={email}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => setEmail(event.target.value)}
                        error={Boolean(emailErrorText)}
                        helperText={emailErrorText}
                        name="email"
                        size="small"
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
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => setPassword(event.target.value)}
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
                        size="small"
                    />
                )}
                {(viewType === "completeSignUp" ||
                    viewType === "recoverPassword" ||
                    (viewType === "login" && emailIsValid)) && (
                    <Container
                        disableGutters
                        sx={{ mt: 4 }}
                    >
                        <Captcha
                            onVerify={(token) => setCaptchaToken(token)}
                            ref={captchaRef}
                            sitekey={
                                process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ?? ""
                            }
                        />
                    </Container>
                )}
                <LoadingButton
                    size="large"
                    color="primary"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 4 }}
                    disabled={continueButtonDisabled}
                    onClick={handleContinueClick}
                    loading={continueButtonLoading}
                    type="submit"
                >
                    Continue
                </LoadingButton>
            </form>
            {(viewType === "signUp" || viewType === "completeSignUp") && (
                <Box
                    textAlign="center"
                    sx={{ mt: 2 }}
                    color="text.secondary"
                >
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
                <Box
                    textAlign="center"
                    sx={{ mt: 2 }}
                    color="text.secondary"
                >
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
                <Box
                    textAlign="center"
                    sx={{ mt: 1 }}
                    color="text.secondary"
                >
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
                <Box
                    textAlign="center"
                    sx={{ mt: 1 }}
                    color="text.secondary"
                >
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

interface AuthFormProps {
    showTitle?: boolean;
}
