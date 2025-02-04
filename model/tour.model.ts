import {DataTypes } from "sequelize";
import sequelize from "../config/connectDTB";
import slugify from "slugify";

const Tour = sequelize.define("Tour",{
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true, //default: false
    allowNull: false, //default: true
    primaryKey: true, //default: false
  },
  title: {
    type: DataTypes.STRING, // ~~ DataTypes.STRING(255) ~ varchar(255)
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(10),
  },
  images: {
    type: DataTypes.TEXT('long'), //~longtext
  },
  price: {
    type: DataTypes.INTEGER,
  },
  discount: {
    type: DataTypes.INTEGER,
  },
  information: {
    type: DataTypes.TEXT('long'),
  },
  schedule: {
    type: DataTypes.TEXT('long'),
  },
  timeStart: {
    type: DataTypes.DATE,
  },
  stock: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING(20),
  },
  position: {
    type: DataTypes.INTEGER,
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
},{
  tableName:"tours",
  timestamps: true // tự động quản lý createdAt, updatedAt
});

Tour.beforeCreate(tour =>{
  tour["slug"] = slugify(`${tour["title"]}-${Date.now()}`,{
    lower: true,
    strict: true
  })
})

export default Tour;
