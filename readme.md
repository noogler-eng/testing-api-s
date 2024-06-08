// dev dependecies 
// dependecies only for development, not work on EC-2 machines

// scripts contains test -> "node dist/index.test.js"
// instead of above one we can run all test simultaneosly by scripts -> test -> "jest"

// jest run on js file not on ts file
// superjest gives request for testing api's

// never define the functonality in test file
// direclty write the expect in tobe('');

// we can also use axios to get the data
// supertest -- 

// always change the json test - vitest/jest according to on which you are testing
// for mocking database use vitest, mock test -> no connection to database is needed

// npm i prisma
// npx prisma init
// npx prisma migrate dev --name init
// npx prisma generate

// never running typescript, only js