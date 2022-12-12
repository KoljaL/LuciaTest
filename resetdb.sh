rm prisma/dev.db
rm -r prisma/migrations
# rm prisma/dev.db-journal
npx prisma migrate dev --name init
# npx prisma generate
# npx prisma migrate dev --name init --skip-seed
# npx prisma migrate dev --name init
# npx prisma db seed