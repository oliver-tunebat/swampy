import Router from "next/router";

export default function getCurrentURL(clean?: boolean) {
    if (clean) return process.env.NEXT_PUBLIC_CURRENT_DOMAIN + Router.route;

    return window.location.href;
}
