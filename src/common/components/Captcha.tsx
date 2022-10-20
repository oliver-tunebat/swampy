import * as React from "react";
import { useTheme } from "@mui/material";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const Captcha = React.forwardRef(
    (props: HCaptcha["props"], ref: React.ForwardedRef<HCaptcha>) => {
        const theme = useTheme();

        return (
            <HCaptcha
                ref={ref}
                theme={theme.palette.mode === "light" ? "light" : "dark"}
                {...props}
            />
        );
    }
);

export default Captcha;
