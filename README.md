# practica_ts

This is a practice that will be usefull for the assestment

---
---

## Language and language configuration

This little CRUD is going to be design using TypeScript as language, with the next configuration.

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
### frameworks
Is going to be used the next serie of framework in the project:

#### backend: Nodejs con ssu package.json
- ```json
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

<h3>Docker Compose Configurations</h3>
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
