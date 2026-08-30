# CRUD Node Express Sequelize

This is a Docker compose node.js environmental API Rest managed throw TypeScript as programming language.It is composed by Sequelize as ORM with postgres as database, and in this case Express as API Framework. This API is organized throw a layered monolithic architecture.

## This API is builded in two different parts:
- User CRUD:
```js
  /**
   * This is the CRUD incharged of handle the User creation, obtainment, uptading and deletion.
   * @param {Security} bcrypt - It manages bcrypt to hash the user password.
   * @param {FakeDB} seeder - A seeder to check information without creating it before for testing. 
   */
  const userCRUD = {
    bcrypt: "Security",
    seeder: "fake db information",
    createUser: 
      {
        id: "number", 
        name: "name", 
        password: "Hashed Password", 
        role: "role"
      },
    obtainment: 
      {
        findAll: "GET all the users in the db, the feature is mostly for an ADMIN user",
        findOne: "Post User by ID"
      },
    updating: 
      {
        updateUser: "Update the user name, or user password using PATCH"
      },
    deletion: 
      {
        deleteUser: "Delete the user using soft_delete",
        restoreUser: "Restore the user deleted throw soft_delete."
      }
  }
```

---
---


## TS configuration

```json
  {
    "compilerOptions": {
      "module": "nodenext",
      "target": "esnext",
      "types": ["node"],
      "jsx": "react-jsx",
      "sourceMap": true,
      "declaration": true,
      "declarationMap": true,
      "noUncheckedIndexedAccess": true,
      "exactOptionalPropertyTypes": true,
      "noEmit": true,
      "strict": true,
      "verbatimModuleSyntax": true,
      "isolatedModules": true,
      "noUncheckedSideEffectImports": true,
      "moduleDetection": "force",
      "skipLibCheck": true,
      "allowImportingTsExtensions": true
    }, 
    "include": ["src/**/*.ts", "index.ts"]
  }
```

---
---


#### backend: Nodejs con ssu package.json

```json
  {
    "main": "index.js",
    "scripts": {
      "dev": "tsx --watch index.ts",
    },
    "author": "LuisReyes970304",
    "license": "ISC",
    "type": "module",
    "dependencies": {
      "@types/sequelize": "^4.28.20",
      "dotenv": "^16.6.1",
      "express": "^5.1.0",
      "jest": "^30.4.2",
      "pg": "^8.23.0",
      "sequelize": "^6.37.8",
      "swagger-jsdoc": "^6.2.8",
      "swagger-ui-express": "^5.0.1",
      "ts-jest": "^29.4.12"
    },
    "devDependencies": {
      "@types/express": "^5.0.3",
      "@types/node": "^24.13.3",
      "@types/swagger-jsdoc": "^6.0.4",
      "@types/swagger-ui-express": "^4.1.8",
      "tsx": "^4.20.3",
      "typescript": "^5.9.2"
    }
  }
```

## API Configuration

- Docker Compose Configurations.

It is quite important to use the right version of images. in this case the more stable version for postgres is 17-alpines.

```yaml
  db:
    image: postgres:17-alpine
```

On the other hand, in order to build the nodejs image we are going to use node:24-alpine in the Dockerfile.
Also will be needed the the port 3015.

```Dockerfile
  FROM node:24-alpine

  EXPOSE 3015

  CMD ["npm", "run", "dev"]
```
