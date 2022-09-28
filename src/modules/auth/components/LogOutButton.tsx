import * as React from "react";
import { Button } from "@mui/material";
import { supabase } from "../../../common/utils/supabaseClient";
import { NextRouter, useRouter } from "next/router";

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

async function logOut(router: NextRouter) {
    const { error } = await supabase.auth.signOut();
    console.log(error);

    router.push("/api/auth/logout");
}
