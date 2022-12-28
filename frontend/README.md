# Building the frontend
To run a development version of the front end you must perform the following steps

In a terminal window, run the hardhat blockchain:

1. cd ../jsc
2. yarn
4. yarn typechain
5. yarn dev

In a separate terminal window, run the frontend NextJS server:

1. cd ../frontend
2. yarn
3. yarn update-all
4. yarn dev

# Typeorm CLI

Some commands:

---
To update the database schema based on current models (for example if creating a new test database):
```
yarn typeorm schema:sync -d src/db/db.ts
```

---
To execute an arbitrary query
```
yarn typeorm query -d src/db/db.ts "select * from DeployedContract"
```

---
If you change any of the models then you need to create a migration which can be used to update other databases. To create a migration reflecting changes in your models:
```
yarn typeorm migration:generate -d src/db/db.ts src/db/migrations/<migration name>
```

To run a migration to update the database:
```
yarn typeorm migration:run -d src/db/db.ts
```

Note: if this fails because you already sync'd the models with the database by some other means, then create a "fake" migration run which marks that migration as already executed but does not change the database:
```
yarn typeorm migration:run -d src/db/db.ts -f
```

For more commands see the [migrations documentation](https://typeorm.io/migrations).

# To do

- Check if Jurisdiction still exists
- Keep HH running or persist new transactions or replace with a different implementation
- Add maintainer, registry to titletoken when creating jurisdiction
- Add favourites to the database
- Use loader component
- Ue \<NextLink> instead of \<Link href...>