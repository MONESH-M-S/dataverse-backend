1. Run npm install
2. Run npm run start


npx sequelize-cli model:generate --name Provider --attributes name:string
npx sequelize-cli db:migrate

npx sequelize-cli seed:generate --name provider
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed --seed 20230222144535-smart-data-list.js 