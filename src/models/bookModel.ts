import { DataTypes, Model } from 'sequelize';
import sequelize from '../postgresDB/pgConfig';
import Author from './authorModel';
import Review from './reviewModel';
import Rating from './ratingModel';

class Book extends Model {
  public id!: number;
  public bookCode!: string;
  public title!: string;
  public description!: string;
  public publishedYear!: number;
  public price!: number;
  public externalId!: string;
  setAuthors: any;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bookCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publishedYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    externalId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Book',
  }
);

Book.belongsToMany(Author, { through: 'BookAuthors' });
Author.belongsToMany(Book, { through: 'BookAuthors' });

Book.hasMany(Review, { foreignKey: 'bookId' });
Book.hasMany(Rating, { foreignKey: 'bookId' });

export default Book;
