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
