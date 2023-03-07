# Swampy

## How to use

Install it and run:

```sh

npm install

npm run dev

```

## Folder Structure

```sh

/public
    favicon.ico
/src
    /common
        /components
            /elements
                /[Name]
                    [Name].tsx
                    [Name].test.ts
                    [Name].types.ts
        /hooks
        /utils
    /modules
        /auth
            /api
                AuthAPI.ts
                AuthAPI.test.ts
                AuthAPI.types.ts
            /components
                AuthForm.tsx
                AuthForm.test.ts
                AuthForm.types.ts
            auth.ts
    /pages
        /api
          /authAPI
              authAPI.ts
          /[Name]API
              [Name]API.st
        _app.tsx
        _document.tsx
        index.tsx

```

# Swampy Documentation

# [ESLint](https://eslint.org/)

ESLint is used to enforce a clean and consistent style across Swampy’s codebase. 

## Set Up

- Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) on VS Code.

# [Supabase](https://supabase.com/)

Supabase is an open source alternative to Firebase, meaning it offers a hosted cloud service with several features that pretty much every app needs. And since it’s open source you actually have the option of hosting a Supabase instance yourself.

The features that Swampy makes use of include:

- **Authentication**, including email & password based as well as social logins. Supabase supports normal authentication functions like password recovery and transactional emails.
- **PostgresSQL Database Hosting**
- **************************File Storage************************** (not yet implemented)

## Set Up

We’re going to set up two Supabase projects, one to function as your dev environment and the other for production. 

- Create an account on Supabase, and create your first project.
- There’s a couple environment variables you’ll need to get from the Supabase dashboard and then add to wherever you’re storing the variables (.env.local, or your host such as Vercel). Find these under Settings > API. Use these keys to store the corresponding values:
    - NEXT_PUBLIC_SUPABASE_URL
    - NEXT_PUBLIC_SUPABASE_ANON_KEY
    - SUPABASE_SERVICE_ROLE_KEY
- Under Settings > Auth, enable hCaptcha protection and provide your hCaptcha secret.
- Under Authentication > Providers, enable all the providers that you want to use. Supabase provides docs on setting each one up.
    - For email, enable Confirm email, and set the Min password length as desired (Swampy uses 8).
- Under Authentication > URL Configuration, enter the applicable site URL for the environment.

Next, create another project and make sure to label both projects so you know which one is for production and preview. Then follow the same steps to set up the new project.

## Database Set Up

[This page](https://supabase.com/docs/guides/integrations/prisma) takes you through the steps of setting up your PostgreSQL database in Supabase using Prisma.

Follow the instructions in the scripts/database/functions files to add triggers and functions to Supabase.

## Plausible Analytics Set Up

1. Login to [Plausible](https://plausible.io/sites).
2. Create a new site using your domain.
3. Add all event names to the goals list in the site settings. This will need to be done for each domain and must be updated as new events are added. The below events are already tracked in Swampy.
    - 404
    - Deleted Profile
    - Outbound Link: Click
    - Toggled Color Mode
    - Clicked Email Preferences Snack
    - Fetcher Error
    - Axios Error
    - Signed Up
    - Unsubscribed from Email Notifications
    - 500
    - Sent Contact Us Message

## Sendgrid Transactional Emails Set Up

1. Login to Sendgrid.
2. Create an API key for your app and add it to your .env.local file for SENDGRID_API_KEY.
3. Add your domain and senders in Sendgrid. If using Cloudflare DNS, set CNAME entries to DNS only.
4. Add your verified sender emails.
5. Create email templates using dynamic templates in the Sendgrid dashboard. You can use {{SITE_URL}} and {{UNSUBSCRIBE_URL}} to embed the correct link destinations in your templates.
6. Add relevant Sendgrid and email metadata to your env.local file.

## Vercel

1. Make sure the Vercel CLI is installed with run `npm i -g vercel@latest`.
2. Run `vercel` to add the project to your Vercel account or link it to an existing project.