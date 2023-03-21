Swampy is an open source web app boilerplate with generic features (like authentication) that every app needs. With it, you can fast forward through project set up and get right into developing the core features of your app.

For a list of technologies and features included with Swampy, check out [Swampy.rocks](https://swampy.rocks).

## Project Structure

---
\
Swampy has an intuitive project structure where it’s easy to add and customize functionality while maintaining organization. 

### /swampy

The top level directory contains standard configuration files. This is where you can configure:

- Environment variables
- Code formatting rules
- NPM Packages
- Library/Technology specific configuration

### /swampy/public

Public resources are stored here. This is mainly for images, but any public file can be included here.

### /swampy/scripts

Scripts that are meant to run somewhere outside of the normal application code are kept here. Swampy includes some database scripts that set up a few important triggers on the database.

### /swampy/prisma

Files for managing Prisma’s object-relational-mapping for the PostgresSQL database. Here you can manage database schema and look through past migrations.

### /swampy/src

This is where the main body of your application’s code lives. 

In the top level there are files for enabling the overarching style settings. Most importantly, `getDesignTokens.ts` contains the custom theming for Swampy. This file can be modified to support any custom theming. Check out MUI’s [documentation](https://mui.com/material-ui/customization/theming/) on custom theming.

#### …/pages

This folder contains components that render each page for a given path. See the Next JS [routing documentation](https://nextjs.org/docs/routing/introduction) for additional details. 

#### …/pages/api

The `api` folder allows you to create API paths using Next JS [routing](https://nextjs.org/docs/api-routes/introduction). We've already added some routes as modules to contain grouped end points. The routes can be freely customized. There's a functions folder to illustrate a hello-world function which is used in the example cron job. Technically every API end point is a serverless function by default in Next JS when deployed with [Vercel](https://vercel.com/docs/concepts/functions/serverless-functions), so you may not want a dedicated functions folder.

#### …/common

Common contains general components and utils that don’t belong to a specific module.

#### …/modules

The modules folder contains a large chunk of applications code that has been separated into modules. New modules can easily be added to this folder as your project grows. Most modules are pretty self explanatory but here’s a brief description of them:

- **********************analytics**********************: Code for tracking and analytics.
- ************auth************: Authentication code.
- **************content**************: Store app content in this folder. For now it’s used to store markdown files and React mappings for markdown.
- **************messaging**************: Code for sending or managing messages using external services such as Sendgrid.
- ********************networking********************: Helper code for network requests.
- ******notifications******: Client side notifications display system, which includes stuff like snack messages and banners.
- **********pages**********: Broken out into sub folders for the various pages in the application, page-specific components and constants can be placed here.
- **************profile**************: Code for managing the user profile.

Module folders typically follow a similar structure:

- **********************\components**********************
- ********************\constants********************
- ************\utils************
- **************apiCalls.ts**************
- ****************store.ts****************

## Get Started

---
\
In this section we will cover the recommended step by step process that will get your new application completely set up, running, and ready to be customized in under 1 hour.

*Note that this guide is written primarily for Windows 10 dev environment and hasn’t been tested in other environments, but similar steps should work on MacOS and Linux.*

### Preparation

Some steps need to be taken once, and then you’ll be able to set up and develop any number of Swampy applications in your local environment.

- Install [NodeJS](https://nodejs.org/en/) 16+.
- Install [VS Code](https://code.visualstudio.com/), this will be your IDE.
- Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) on VS Code.
- Add a hosts entry in `/etc/hosts` on Linux, `/private/etc/hosts` on Mac OS X, or `C:\Windows\System32\Drivers\etc\hosts` on Windows. When debugging your projects you can access them via `http://localhost.internal:3000`. You can use a different domain if you wish, but you’ll need to update the `NEXT_PUBLIC_CURRENT_URL`  and `NEXT_PUBLIC_CURRENT_DOMAIN` variables inside `.env.development` in your projects. See [https://docs.hcaptcha.com/#local-development](https://docs.hcaptcha.com/#local-development).

```
127.0.0.1 localhost.internal
```

### Project Set Up

- Login to [Github](https://github.com/) and create a new repository for your project.
- Run the following commands. Note: this will remove any existing history in the repository.

```bash
git clone https://github.com/oliver-tunebat/swampy.git
cd swampy/
git remote set-url origin <YOUR REPOSITORY URL>
git push -f
git remote add swampy https://github.com/oliver-tunebat/swampy.git
npm install
```

- Rename the repository folder to your project’s name.
- Remove `.example` from `.env.example` and `.env.local.example`. Delete extraneous comments in these files.

### Supabase Set Up

Next we will get the application connected with [Supabase](https://supabase.com/) so that it will have authentication and a database. 

- Login to the [Supabase dashboard](https://app.supabase.com/projects).
- Create a new project. This will be your dev environment Supabase project so name it something so you can identify it as the dev project. You can pick a database password now or do it later when setting up the database.
- Go to Settings > API. Copy the project URL, anon key, and service role key into `.env.local` and `.env.development`.
- Under Authentication > URL Configuration, enter the applicable site URL for the local environment. It will be `http://localhost.internal:3000` unless you picked a picked a different domain.

Swampy uses [hCaptcha](https://www.hcaptcha.com/) to secure authentication forms so follow these steps to get hCaptcha set up and working with Supabase. 

- Login to the [hCaptcha dashboard](https://dashboard.hcaptcha.com/sites?page=1) and create a new site.
- In the [Supabase dashboard](https://app.supabase.com/projects) go to Settings > Auth. Enable hCaptcha protection and paste the hCaptcha secret into the field. The secret can be found in the [hCaptcha settings page](https://dashboard.hcaptcha.com/settings). Save changes.
- Paste the hCaptcha site key into `.env.development` and `.env.production`.

By default email authentication will be ready to go. Swampy already has implementations for several third party providers. More can be added quite easily inside the Supabase dashboard.

- Follow Supabase’s guides for setting up individual auth providers:
    - [Google](https://supabase.com/docs/guides/auth/social-login/auth-google)
    - [Apple](https://supabase.com/docs/guides/auth/social-login/auth-apple)
    - [Facebook](https://supabase.com/docs/guides/auth/social-login/auth-facebook)
    - [Discord](https://supabase.com/docs/guides/auth/social-login/auth-discord)
    - [Spotify](https://supabase.com/docs/guides/auth/social-login/auth-spotify)

*Note that Supabase allows up to 2 projects in their free tier (good for an initial dev and prod environment), and beyond that each project carries with it a monthly charge. You can pause any free projects that aren’t currently being worked on in order to support additional free projects.* 

### Database Set Up

Supabase provides a PostgresSQL database that is connected to your project by default. We will use [Prisma](https://www.prisma.io/) to manage schema and connect to the DB in the code. If you run into any issues during these steps, or want to see more details, refer to [these Supabase docs](https://supabase.com/docs/guides/integrations/prisma).

- In the [Supabase dashboard](https://app.supabase.com/projects), go to Settings > Database.
- Copy the URI connection string to the `DIRECT_URL` variable in `.env`. Make sure to add the correct password to the connection string.
- Copy the connection pooling connection string to the `DATABASE_URL` variable in `.env`. Make sure to add the correct password to the connection string. Append `?pgbouncer=true` to the end of this connection string.
- Run `npx prisma migrate dev` to apply the schema to your database.
- Go to SQL Editor > New Query.
- One-by-one, run each script inside `scripts/database/triggers`.

### Running the Application

Now your application should be ready to run with nearly full operations.

- In VS Code, run the debug server-side script.
- Navigate to [http://localhost.internal:3000](http://localhost.internal:3000) (or your custom local domain) to see the running application.

You can start playing around with and customizing the application. You’ll still want to set up a production environment, analytics and transactional emails. Keep reading to learn how to set these up.

### Production Environment Set Up

Setting up the production environment takes the same steps as setting up the dev environment. Just follow the above steps again to set it up your production environment.

### Plausible Analytics Set Up

1. Login to [Plausible](https://plausible.io/sites).
2. Create a new site using your domain. Each domain you use will be a separate site on Plausible. In order to run analytics in your local environment, set your localhost hosts entry to a unique URL as Plausible requires unique URLs for its sites.
3. Add all event names to the goals list in the site settings. This will need to be done for each domain and must be updated as new events are added. The below events are already tracked in Swampy.
    - 404
    - 500
    - Deleted Profile
    - Outbound Link: Click
    - Toggled Color Mode
    - Clicked Email Preferences Snack
    - Fetcher Error
    - Axios Error
    - Signed Up
    - Unsubscribed from Email Notifications
    - Sent Contact Us Message

*Note that when deployed on Vercel, Plausible will use a proxy script by default to circumvent tracking blockers.*

### Sendgrid Transactional Emails Set Up

1. Login to [Sendgrid](https://sendgrid.com/).
2. Go to [Settings > API Keys](https://app.sendgrid.com/settings/api_keys) and create an API key for your app and add it to your `.env.local` file for `SENDGRID_API_KEY`.
3. Go to [Settings > Sender Authentication](https://app.sendgrid.com/settings/sender_auth) and add your domain. During verification, if you’re using Cloudflare DNS, set CNAME entries to DNS only.
4. Add your verified sender emails.
5. Go to [Email API > Dynamic Templates](https://mc.sendgrid.com/dynamic-templates). Here you can create email templates in the Sendgrid dashboard. You can use `{{SITE_URL}}` and `{{UNSUBSCRIBE_URL}}` to embed the correct link destinations in your templates. Swampy has two transactional emails you may want to make templates for:
    1. Welcome Email
    2. Contact Us Email
6. Copy your template ids into `.env.local`.
7. Add other relevant Sendgrid and email metadata to your `.env.local` file.

You can also optionally configure your own templates for authentication related emails that Supabase sends. This can be done in Authentication > Email Templates.

## Deploying to Vercel

---
\
Swampy was designed with the intention of being deployed on [Vercel](https://vercel.com) to take advantage of Vercel’s high performance and excellent support for NextJS. We’ll go over some of the steps that need to be taken to get a good deployment on Vercel. But it is also recommended that you check out [Vercel’s documentation](https://vercel.com/docs/concepts/get-started) for a more comprehensive look at your options.

- [Import your project into Vercel](https://vercel.com/docs/concepts/get-started/deploy#import-an-existing-project).
- [Add environment variables](https://vercel.com/docs/concepts/projects/environment-variables).
- [Add custom domains](https://vercel.com/docs/concepts/projects/domains/add-a-domain).

You may also choose to protect your application with [Cloudflare](https://www.cloudflare.com/). If you do, make sure to go to SSL/TLS > Overview in Cloudflare and set encryption mode to Full. You may see a bug where your site won’t load with too many redirects if the wrong setting is applied here.

## Updating / Pulling in New Changes

---
\
Going forward, Swampy will receive regular updates with new features and enhancements. You probably want to bring these changes into your application so follow these steps to update your code base.

- Merge the current `main` branch from the Swampy repo into your dev branch.

```bash
git fetch swampy
git merge swampy/main
```

- As this merge will modify your working codebase you should review code changes and resolve any merge conflicts.
- Run `npm install` if there were any package changes.
- Commit and push.

Whenever a new Swampy release becomes available, make sure to read the release notes for details on bringing that specific release into your code.