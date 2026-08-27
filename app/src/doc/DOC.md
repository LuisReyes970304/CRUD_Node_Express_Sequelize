### This is in order to force postgres to run in a different port of 5432 

```yaml
  db:
    image: postgres:17-alpine
    command: postgres -p 5422   
    ports:
      - ${POSTGRES_PORT}:5422
```
