import { FeatureListFeature } from "../components/FeaturesList";

export const frontEndFeatures: FeatureListFeature[] = [
    // single page appliation
    {
        text: "Single-Page Application",
        status: "implemented",
    },

    // single page appliation
    {
        text: "Responsive",
        status: "implemented",
    },

    // react components
    {
        text: "React Components",
        status: "implemented",
    },
    {
        text: "Material UI Components",
        status: "implemented",
        nestLevel: 1,
        href: "https://mui.com/",
    },
    {
        text: "Customizable Theming",
        status: "implemented",
        nestLevel: 1,
        href: "https://mui.com/material-ui/customization/theming/",
    },
    {
        text: "Navigation Bar",
        status: "implemented",
        nestLevel: 1,
    },
    {
        text: "Footer",
        status: "implemented",
        nestLevel: 1,
    },
    {
        text: "Confirmation Dialog",
        status: "implemented",
        nestLevel: 1,
    },
    {
        text: "Mobile Friendly Dialog",
        detailText: "Dialogs convert to full screen on mobile, and use url hashing to support proper back navigation.",
        status: "implemented",
        nestLevel: 1,
    },
    {
        text: "Alert Banner",
        status: "implemented",
        nestLevel: 1,
    },
    {
        text: "Action & Consent Popup ",
        status: "implemented",
        nestLevel: 1,
    },

    // seo optimization
    {
        text: "SEO Optimization",
        status: "implemented",
    },
    {
        text: "Server Side Rendering",
        status: "implemented",
        nestLevel: 1,
        href: "https://nextjs.org/docs/basic-features/pages#server-side-rendering",
    },
    {
        text: "Good Crawlability",
        detailText: "Search engines can easily crawl and index Swampy.",
        status: "implemented",
        nestLevel: 1,
    },
    {
        text: "Head Tags",
        detailText: "Title and meta description",
        status: "implemented",
        href: "https://nextjs.org/docs/api-reference/next/head",
        nestLevel: 1,
    },
    {
        text: "Social Sharing Metadata",
        status: "unimplemented",
        nestLevel: 1,
    },
    {
        text: "Sitemaps",
        status: "unimplemented",
        nestLevel: 1,
    },

    // accessibility
    {
        text: "Accessibility",
        detailText: `We have made a high effort attempt to create an accessible website 
            to our and others' standards. It is your responsibility to determine 
            if Swampy meets your accessibility standards before putting it to use.`,
        status: "implemented",
    },
    {
        text: "Dark Mode",
        status: "implemented",
        nestLevel: 1,
    },
    {
        text: "Sufficient Text Contrast",
        detailText: "Minimum WCAG AA",
        status: "implemented",
        nestLevel: 1,
    },
    {
        text: "Keyboard Navigable",
        status: "implemented",
        nestLevel: 1,
    },
    {
        text: "Screen Reader Friendly",
        detailText: "Implemented, but not fully tested",
        status: "progress",
        nestLevel: 1,
    },

    // favicon
    {
        text: "Favicon",
        status: "implemented",
    },

    // terms pages
    {
        text: "Terms Pages",
        status: "progress",
    },
    {
        text: "Privacy Policy",
        status: "progress",
        nestLevel: 1,
        href: "/privacy-policy",
    },
    {
        text: "User Agreement",
        status: "progress",
        nestLevel: 1,
        href: "/user-agreement",
    },

    // error pages
    {
        text: "Error Pages",
        status: "implemented",
    },
    {
        text: "404",
        status: "implemented",
        nestLevel: 1,
        href: "/400",
    },
    {
        text: "5XX",
        status: "implemented",
        nestLevel: 1,
        href: "/500",
    },

    // localization
    {
        text: "Localization",
        status: "unimplemented",
    },
];

export const backEndFeatures: FeatureListFeature[] = [
    // sql database
    {
        text: "SQL Database",
        detailText: "PostgresSQL database provided by Supabase",
        status: "implemented",
        href: "https://supabase.com/database",
    },
    {
        text: "Object-Relational Mapping (ORM)",
        detailText: "Implemented with Prisma",
        status: "implemented",
        nestLevel: 1,
        href: "https://www.prisma.io/",
    },

    // transactional emails
    {
        text: "Transactional Emails",
        detailText: "Implemented with SendGrid",
        status: "unimplemented",
        href: "https://sendgrid.com/",
    },

    // background jobs
    {
        text: "Background Jobs",
        status: "unimplemented",
    },
];

export const userFeatures: FeatureListFeature[] = [
    // authentication
    {
        text: "Authentication",
        detailText: "Implemented with Supabase",
        status: "implemented",
        href: "https://supabase.com/auth",
    },
    {
        text: "Authentication UI",
        status: "implemented",
        nestLevel: 1,
        href: "/sign-up",
    },
    {
        text: "Email & Password",
        status: "implemented",
        nestLevel: 1,
        href: "https://supabase.com/docs/guides/auth/auth-email",
    },
    {
        text: "Email Verification",
        status: "implemented",
        nestLevel: 1,
    },
    {
        text: "Password Recovery",
        status: "implemented",
        nestLevel: 1,
        href: "https://supabase.com/docs/reference/javascript/auth-resetpasswordforemail",
    },
    {
        text: "Captcha Protection",
        detailText: "Implemented with hCaptcha",
        status: "implemented",
        nestLevel: 1,
        href: "https://www.hcaptcha.com/",
    },
    {
        text: "Social Login",
        status: "implemented",
        nestLevel: 1,
    },
    {
        text: "Google",
        status: "unimplemented",
        nestLevel: 2,
        href: "https://supabase.com/docs/guides/auth/auth-google",
    },
    {
        text: "Apple",
        status: "implemented",
        nestLevel: 2,
        href: "https://supabase.com/docs/guides/auth/auth-apple",
    },
    {
        text: "Facebook",
        status: "unimplemented",
        nestLevel: 2,
        href: "https://supabase.com/docs/guides/auth/auth-facebook",
    },
    {
        text: "Discord",
        status: "unimplemented",
        nestLevel: 2,
        href: "https://supabase.com/docs/guides/auth/auth-discord",
    },
    {
        text: "Spotify",
        status: "implemented",
        nestLevel: 2,
        href: "https://supabase.com/docs/guides/auth/auth-spotify",
    },

    // payments
    {
        text: "Payments",
        detailText: `Implemented with Stripe, giving you access to a multitude 
            of features in addition to the ones listed.`,
        status: "unimplemented",
        href: "https://stripe.com/",
    },
    {
        text: "Checkout Page",
        status: "unimplemented",
        nestLevel: 1,
        href: "https://stripe.com/payments/checkout",
    },
    {
        text: "Subscriptions",
        status: "unimplemented",
        nestLevel: 1,
        href: "https://stripe.com/docs/billing/subscriptions/overview",
    },
    {
        text: "Upgrade/Downgrade Subscription",
        status: "unimplemented",
        nestLevel: 2,
        href: "https://stripe.com/docs/billing/subscriptions/upgrade-downgrade",
    },
    {
        text: "Cancel Subscription",
        status: "unimplemented",
        nestLevel: 2,
        href: "https://stripe.com/docs/billing/subscriptions/cancel",
    },
    {
        text: "Billing Portal",
        status: "unimplemented",
        nestLevel: 1,
        href: "https://stripe.com/docs/customer-management",
    },
    {
        text: "View Transactions",
        status: "unimplemented",
        nestLevel: 2,
    },
    {
        text: "Update Card Info",
        status: "unimplemented",
        nestLevel: 2,
    },
    {
        text: "Localization",
        status: "unimplemented",
        nestLevel: 1,
        href: "https://stripe.com/docs/payments/checkout/present-local-currencies",
    },
    {
        text: "Multiple Currencies",
        status: "unimplemented",
        nestLevel: 2,
    },
    {
        text: "Localized Pricing",
        status: "unimplemented",
        nestLevel: 2,
    },

    // affiliate program
    {
        text: "Affiliate Program",
        detailText: "Implemented with Rewardful",
        status: "unimplemented",
        href: "https://www.rewardful.com/",
    },

    // account management
    {
        text: "Account Management",
        detailText: "Implemented with Supabase",
        status: "implemented",
    },
    {
        text: "Update Password",
        status: "implemented",
        nestLevel: 1,
        href: "https://supabase.com/docs/reference/javascript/auth-updateuser",
    },
    {
        text: "Update Email",
        status: "implemented",
        nestLevel: 1,
        href: "https://supabase.com/docs/reference/javascript/auth-updateuser",
    },
    {
        text: "Delete Account",
        status: "implemented",
        nestLevel: 1,
        href: "https://supabase.com/docs/reference/javascript/auth-admin-deleteuser",
    },
    {
        text: "Configure Email Preferences",
        status: "implemented",
        nestLevel: 1,
    },

    // privacy
    {
        text: "Privacy",
        detailText: `We intend for Swampy to respect users' privacy and go a 
            long way in complying with privacy regulations. 
            It is your responsibility to ensure anything you create with 
            Swampy complies with privacy regulations.`,
        status: "unimplemented",
    },
    {
        text: "Tracking Consent Management",
        status: "unimplemented",
        nestLevel: 1,
    },
    {
        text: "Data Encryption",
        status: "unimplemented",
        nestLevel: 1,
    },
    {
        text: "Privacy First Analytics",
        detailText: "Implemented with Plausible",
        status: "progress",
        nestLevel: 1,
        href: "https://plausible.io/data-policy#gdpr-ccpa-and-pecr-compliant-web-analytics",
    },

    // contact us page
    {
        text: "Contact Us Page",
        detailText: "Secured with hCaptcha",
        status: "progress",
        href: "/contact-us",
    },
];

export const developerFeatures: FeatureListFeature[] = [
    // analytics
    {
        text: "Analytics",
        detailText: "Implimented with Plausible",
        status: "unimplemented",
        href: "https://plausible.io/",
    },
    {
        text: "Event Tracking",
        status: "unimplemented",
        nestLevel: 1,
        href: "https://plausible.io/docs/goal-conversions",
    },
    {
        text: "Proxy",
        detailText: "For circumventing adblockers",
        status: "unimplemented",
        nestLevel: 1,
        href: "https://plausible.io/docs/proxy/introduction",
    },

    // error tracking
    {
        text: "Error Tracking",
        status: "unimplemented",
    },

    // clean project structure
    {
        text: "Clean Project Structure",
        detailText: `Organized into modules, Swampy's project structure 
            makes it easy to find things and add new things.`,
        status: "implemented",
    },

    // clean project structure
    {
        text: "Code Formatting",
        detailText: "Using ESLint",
        status: "implemented",
        href: "https://eslint.org/",
    },

    // unit tests
    {
        text: "Unit Tests",
        status: "unimplemented",
    },

    // ci/cd
    {
        text: "CI/CD",
        status: "unimplemented",
    },

    // user management dashboard
    {
        text: "User Management Dashboard",
        status: "unimplemented",
    },
];
