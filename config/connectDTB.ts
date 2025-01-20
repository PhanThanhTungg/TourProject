import {Sequelize} from "sequelize";

export default ()=>{
  const sequelize = new Sequelize(
    'tour_project',
    'root',
    '',
     {
       host: 'localhost',
       dialect: 'mysql'
     }
   );
 
  sequelize.authenticate().then(() => {
      console.log('Connection has been established successfully.');
  }).catch((error) => {
      console.error('Unable to connect to the database: ', error);
  });
}
