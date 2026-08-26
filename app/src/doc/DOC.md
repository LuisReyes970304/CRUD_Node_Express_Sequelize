### This is in order to force postgres to run in a different port of 5432 
  db:
    image: postgres:16-alpine
    command: postgres -p 5422   
    ports:
      - ${POSTGRES_PORT}:5422
