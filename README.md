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
