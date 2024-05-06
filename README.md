# Mesa

The Mesa project consists of a full-stack Next.js app built with Supabase and Ethereum Attestation Service (EAS).

- Supabase is configured to provide email based authentication and a postgres database, with RLS policies in place to limit visibility of data, based on the currently authenticated user.

- EAS is used to create a portable and verifiable record of user actions within each project. Attestations are stored off-chain in postgres database and linked to the project in the corresponding project.

- A local wallet is generated on each device when the user logs in, and used to sign offchain attestations. In the future, we plan to replace this with an embedded wallet, so that the same key can be used to sign attestations on any device.

## Project Structure

The project is structured as follows:

- `docs/design/` - design documents recording high-level architecture and design decisions.
- `src/` - the Next.js app, with the following files and subdirectories:
  - `app/` - the app routes and pages, using the Next.js app router.
  - `components/` - reusable components.
  - `context/` - custom context providers.
  - `dictionaries/` - the i18n dictionary files.
  - `lib/` - the app's business logic, including helpers for third-party libraries and data fetching.
  - `middleware/` - the individual middleware functions consumed by `middleware.ts`.
  - `types/` - the app's types, including custom types for third-party libraries.
  - `env.ts` - a zod schema used to validate the app's environment variables.
  - `middleware.ts` - the app's middleware, including authentication and authorization.
- `supabase/` the Supabase schema, config, and migration files.
- `i18n.config.ts` - internationalization configuration.
- `package.json`
- etc...


## Contributing

1. If needed, request access to the Mesa project on Supabase: https://supabase.com/dashboard/project/ewvzsofyvxcctuxxqibo

2. If you haven't already, setup Docker for local development: https://www.docker.com/get-started/

3. Clone this repository to your local machine and install the dependencies:

```bash
git clone https://github.com/cwdevteam/mesa.git
cd mesa && pnpm i
```

4. Rename `.env.local.example` to `.env.local` and update the following:

```
NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
```

Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found on the [Supabase API settings](https://supabase.com/dashboard/project/ewvzsofyvxcctuxxqibo/settings/api) page.

5. You can start the local database and development server with the following commands:

```bash
pnpm db:start
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

See the [Supabase local development guide](https://supabase.com/docs/guides/local-development) for more information.

6. Email authentication for local development:

Supabase provides a local mailbox for email authentication, called Inbucket. After starting the local database, you can access Inbucket via [http://localhost:23454](http://localhost:23454) to receive auth emails and sign-in links.