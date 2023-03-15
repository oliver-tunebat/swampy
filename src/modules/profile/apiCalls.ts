import { callAxios } from "../networking/utils/callAxios";
import useSWR from "swr";
import swrFetcher from "../networking/utils/swrFetcher";
import { Profile } from "@prisma/client";
import { useUser } from "@supabase/auth-helpers-react";
import { trackEvent } from "../analytics/utils/plausible";

// GET DATA

export function useGetProfile() {
    const user = useUser();

    // only fetch if user is logged in
    const key = user ? "/api/profile/get" : null;
    const { data, error, mutate } = useSWR<Profile, unknown>(key, swrFetcher);

    // handle new user
    if (data && !data.createdAt) {
        mutate(createProfile(data));
    }

    return { profile: data, error, mutate };
}


// MODIFY DATA

async function createProfile(profile: Profile) {
    const { response } = await callAxios.post<Profile>("/api/profile/create", false);

    if (!response?.data?.createdAt) {
        return profile;
    }

    trackEvent("Signed Up");

    return response.data;
}

export async function deleteProfile() {
    const { error } = await callAxios.delete("/api/profile/delete", true);

    if (!error) {
        trackEvent("Deleted Profile");
        location.reload();
    }
}

export async function enableEmailNotifications(enabled: boolean) {
    return await callAxios.post<Profile>("/api/profile/set-email-notifications", true, { data: { enabled } });
}
