import * as React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { logOut } from "../utils/logout";

export default function LogOutButton() {
    const router = useRouter();

    return (
        <Button
            variant="text"
            color="inherit"
            onClick={async () => await logOut(router)}
        >
            Log Out
        </Button>
    );
}
