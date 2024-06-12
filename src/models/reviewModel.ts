import { Model, DataTypes } from 'sequelize';
import sequelize  from '../postgresDB/pgConfig';
import User from './userModel';
import Book from './bookModel';

class Review extends Model {
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public content!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Book,
        key: 'id',
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
  }
);

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

export default Review;
