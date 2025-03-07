## Set up

1. In the root, create a `.npmrc` file. In it, paste the contents of of the .npmrc file you have been given by the Upsolve team
2. Go to `.env.demo` and follow the instructions to add your API key
3. You will need to get the Clerk keys from the Upsolve team, or upload your own Clerk keys in `.env.demo`. Alternatively you can delete the Clerk code from this repo and hardcode a tenant JWT if you prefer.
4. Run `run yarn dotenvx encrypt -f .env.demo` in the root folder, per instructions
5. Go to `middleware.ts` and set any `prefilters` you like. If you leave this blank, you will be looking at the data as an admin
6. Run the following:

```
npm i
npm run build
npm run dev
```

This will spin up a local server at `localhost:3000`. If you are developing alongside `upsolve-core`, build that first and then build this. It will run on `localhost:3000` to not clash with the core ports.

Sign into the app (this is Clerk) with:
user: demo@upsolve.ai
pass: demo
