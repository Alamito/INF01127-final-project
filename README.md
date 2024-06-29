## Getting Started

First, run the development server:

```bash
npm run server
# and
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prisma
### Create and apply migration
```bash
npx prisma migrate dev --name nome_da_migracao
```

### Apply migrations
```bash
npx prisma migrate dev
```

