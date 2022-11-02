import * as React from "react";
import {
    IconButton,
    InputAdornment,
    TextField,
    TextFieldProps,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function SecureTextField(props: TextFieldProps) {
    const [textIsVisible, setTextIsVisible] = React.useState(false);

    return (
        <TextField
            type={textIsVisible ? "text" : "password"}
            name="password"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => setTextIsVisible(!textIsVisible)}
                            aria-label={
                                textIsVisible
                                    ? "hide password"
                                    : "show password"
                            }
                            size="small"
                        >
                            {textIsVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...props}
        />
    );
}
