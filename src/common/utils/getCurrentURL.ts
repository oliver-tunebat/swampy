import Router from "next/router";

export default function getCurrentURL(clean?: boolean) {
    // don't use Router on the server side
    const route = typeof window === "undefined" ? "" : Router.route;

    if (clean) {
        return process.env.NEXT_PUBLIC_CURRENT_URL + route;
    }

    return window.location.href;
}
