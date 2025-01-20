import {Sequelize} from "sequelize";

export default ()=>{
  const sequelize = new Sequelize(
    process.env.DTB_NAME,
    process.env.DTB_USERNAME,
    process.env.DTB_PASSWORD,
     {
       host: process.env.DTB_HOST,
       dialect: 'mysql'
     }
   );
 
  sequelize.authenticate().then(() => {
      console.log('Connection has been established successfully.');
  }).catch((error) => {
      console.error('Unable to connect to the database: ', error);
  });
}
