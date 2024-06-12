import { Model, DataTypes } from 'sequelize';
import sequelize  from '../postgresDB/pgConfig';

class Rating extends Model {
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public rating!: number;
}

Rating.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
}, {
  sequelize,
  modelName: 'Rating',
});

export default Rating;
