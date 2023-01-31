import { callAxios } from "../networking/utils/callAxios";
import useSWR from "swr";
import swrFetcher from "../../common/utils/swrFetcher";
import { Profile } from "@prisma/client";
import { useUser } from "@supabase/auth-helpers-react";

// GET DATA

export function useGetProfile() {
    const user = useUser();

    // only fetch if user is logged in
    const key = user ? "/api/profile/get" : null;
    const { data, error, mutate } = useSWR<Profile, unknown>(key, swrFetcher);
    return { profile: data, error, mutate };
}


// MODIFY DATA

export async function deleteProfile() {
    const { error } = await callAxios.delete("/api/profile/delete", true);

    if (!error) {
        location.reload();
    }
}

export async function enableEmailNotifications(enabled: boolean) {
    return await callAxios.post<Profile>("/api/profile/set-email-notifications", true, { data: { enabled } });
}
