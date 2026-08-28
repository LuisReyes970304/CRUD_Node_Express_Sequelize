# This is in order to force postgres to run in a different port of 5432 if you want to.

```yaml
  db:
    image: postgres:17-alpine
    command: postgres -p 5422   
    ports:
      - ${POSTGRES_PORT}:5422
```

## This is how you can check the database information.

```bash
  docker exec -it crud-application-db psql -U LuisReyes979394 -d postgres
  \dt
  \d "Users"
  SELECT * FROM "Users";
```
