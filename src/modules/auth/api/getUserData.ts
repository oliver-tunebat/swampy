// temporary reference file to be removed later
import { Session } from "@supabase/supabase-js";
import useSWR from "swr";
import swrFetcher from "../../../common/utils/swrFetcher";

export default () => {
    const { data, error } = useSWR<Session, any>("/api/auth/user", swrFetcher);
    return { user: data?.user, error };
};
