import Plausible from "plausible-tracker";

export const plausible = Plausible({
    domain: process.env.NEXT_PUBLIC_CURRENT_DOMAIN,
    apiHost: process.env.NEXT_PUBLIC_CURRENT_URL,
});

export function trackEvent(
    name: string,
    props?: { readonly [propName: string]: string | number | boolean },
) {
    plausible.trackEvent(name, { props: props });
}