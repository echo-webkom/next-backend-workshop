# Workshop med Next.js backend, auth (jwt), Drizzle og PostgreSQL

## Forutsetninger 📝

Til dette burde du ha følgende installert:

- Node.js (v18)
- Docker Desktop (v4.24) og/eller Docker Engine (v24)
  - Om Docker ikke funker kan du også bruke en lokal PostgreSQL-instans
- pnpm (v8)

## Oppsett 🏗️

1. Klon repoet

   ```sh
    git clone git@github.com:echo-webkom/next-backend-workshop
   ```

1. Sett opp .env-fil

   ```sh
    cp .env.example .env
   ```

1. Installer avhengigheter

   ```sh
    pnpm install
   ```

1. (Om du ikke har migrasjoner) Generer migrasjoner

   ```sh
    pnpm db:generate
   ```

1. Start PostgreSQL-databasen

   ```sh
   pnpm db:up
   ```

1. (Om du ikke har kjør migrasjoner) Kjør migrasjoner

   ```sh
   pnpm db:migrate
   ```

1. (Valgfiritt) Seed databasen med testdata
   ```sh
   pnpm db:seed
   ```

## Kjør lokalt 🚀

1. Start serveren

   ```sh
    pnpm dev
   ```

1. Åpne [http://localhost:3000](http://localhost:3000) med nettleseren din for å se resultatet.

## Prosjekt-struktur 🔍

### `drizzle/`

Inneholder SQL-filer som brukes til å sette opp databasen og migrasjoner. Disse kjøres av `pnpm db:migrate`

`migrate.ts` inneholder migrasjons-logikken, og kjører migrasjonsfilene i `drizzle/migrations/` i rekkefølge.

`seed.ts` er et "seed"-script som kan initialisere databasen med testdata.

### `public/`

Inneholder statiske filer som skal serveres av Next.js. F.eks `favicon.ico`.

### `src/`

`app` - Inneholder sidene i appen. Disse er bygget opp av komponenter i `components/`.
`db` - Inneholder filer relatert til oppsett av databasen til Next.js applikasjonen.
`lib` - Inneholder hjelpefunksjoner som brukes i appen.
`components` - Inneholder komponenter som brukes i appen.
`styles` - Inneholder global CSS som brukes i appen.
`constants.ts` - Konstanter som brukes i appen. En type config fil.

### `drizzle.config.ts`

Inneholder konfigurasjon for Drizzle. Trenger vanligvis ikke å endres på.

### `next.config.js`

Inneholder konfigurasjon for Next.js. Trenger vanligvis ikke å endres på.

### `docker-compose.yaml`

Inneholder konfigurasjon for Docker. Setter opp en PostgreSQL-database som brukes av appen.

### `tailwind.config.ts`

Inneholder konfigurasjon for Tailwind. Her kan du legge til nye farge-variabler, fonts, osv.

## Oppgaver 📝

### Lag en ny side som er beskyttet av autentisering

### Lag en ny side der du kan lage et nytt innlegg, og sette bruker som "author" om man er logget inn.

<details><summary>Hint 💭</summary>

Lag en ny `POST` route i `src/app/post/route.tsx`, som bruker databasen til å lage et nytt innlegg.

Lag en ny side fil `src/app/new-post/page.tsx` med et skjema som tar inn tittel og innhold, og bruker `POST` routen til å lage et nytt innlegg.

</details>

### Lag en ny side som viser hele innlegget med eier av innlegget (om den har)

### Krypter passordet før det lagres i databasen (med en hash)

<details><summary>Hint 💭</summary>

Bruk `node:crypto` (https://nodejs.org/api/crypto.html) til å lage en hash av passordet før det lagres i databasen.

</details>

### Gjør om api-rutene om til server actions

<details><summary>Hint 💭</summary>

Lag en ny fil i `actions/`-mappen.

```ts
"use server";

export async function signIn(username: string, password: string) {
  // ...
}
```

</details>

### Deploy til Vercel med Vercel Postgres

## Svar på oppgaver 📝

### Lag en ny side som er beskyttet av autentisering

Her kan du bruker `getSession` funksjonen laget i `lib/session.ts` til å sjekke om brukeren er logget inn. Deretter kan du bruker `redirect()` til å sende brukeren til `/sign-in` om de ikke er logget inn.

Se `src/app/protected/page.tsx` for et eksempel.

### Lag en ny side der du kan lage et nytt innlegg, og sette bruker som "author" om man er logget inn.

Man kan først begynne med å lage et `POST`-endepunkt i som henter ut `title` og `body` fra `request.json()`. Deretter kan man bruke `getSession` til å finne ut hvem som gjorde requesten og sette `session.id` som `authorId` i databasen.

For frontenden kan man lage en ny side med et skjema som tar inn `title` og `body` og sender det til `POST`-endepunktet. Her må man lage en funksjon til `onSubmit` som sender dataen til `POST`-endepunktet. Dette blir gjort med `fetch`-funksjonen som er innebygd i nettleseren.

Se `src/app/api/post/create/route.ts` for eksempel på `POST`-endepunktet.
Se `src/app/posts/create/page.tsx` og `src/app/posts/create/create-post-form.tsx` for eksempel på frontenden.

Til denne oppgaven laget jeg også en side `src/app/posts/page.tsx` som viser alle innleggene i databasen.

### Lag en ny side som viser hele innlegget med eier av innlegget (om den har)

Her kan man lage en "dynamic path". Dette er en del av URLen som kan endre seg, go vise forskjellig innhold. I dette tilfellet kan vi bruke `id`-en til innlegget.

Ved å da hente ut `id`-en fra URLen kan vi bruke den til å hente ut innlegget fra databasen.

For denne oppgaven fjernet jeg også visning av brødtekst på `src/app/posts/page.tsx` og la til en link til `src/app/posts/[id]/page.tsx` som viser hele innlegget.

Se `src/app/posts/[id]/page.tsx` for eksempel på en "dynamic path".

### Krypter passordet før det lagres i databasen (med en hash)

Her kan vi bruke et krypterings bibliotek for å lage en hash av passordet før det lagres i databasen. Dette gjør at om noen får tak i databasen, så vil de ikke kunne se passordet til brukerne. Les mer om hvorfor dette er viktig her: https://www.owasp.org/index.php/Password_Storage_Cheat_Sheet

For denne oppgaven brukte jeg et bibliotek som heter `bcryptjs`. Dette er en implementasjon av `bcrypt` som er skrevet i JavaScript. `bcrypt` gir oss funksjoner for både å lage en hash og sjekke om en hash matcher et passord.

Se oppdatert versjon i `src/app/auth/sign-up/route.ts` og `src/app/sign-in/route.ts`.

Du kan lage ned `bcryptjs` med `pnpm add bcryptjs` og `pnpm add -D @types/bcryptjs`.

### Gjør om api-rutene om til server actions

Her kan vi lage en ny fil i `actions/`-mappen. Denne filen kan vi bruke til å lage funksjoner som kan brukes i både frontenden og backenden. For å gjøre dette må vi bruke `use server` øverst i filen.

```ts
"use server";

export async function signIn(username: string, password: string) {
  // ...
}
```

Se `src/actions/auth.ts` for eksempel.
