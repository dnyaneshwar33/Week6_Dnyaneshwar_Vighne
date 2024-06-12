import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../postgresDB/pgConfig';
import User from './userModel';
import Book from './bookModel';

interface PaymentAttributes {
  id: number;
  userId: number;
  bookId: number;
  amount: number;
  status: string;
  createdAt: Date;
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'id' | 'createdAt'> {}

class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public amount!: number;
  public status!: string;
  public readonly createdAt!: Date;
}

Payment.init(
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
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments',
    timestamps: true,  
  }
);

User.hasMany(Payment, { foreignKey: 'userId' });
Book.hasMany(Payment, { foreignKey: 'bookId' });
Payment.belongsTo(User, { foreignKey: 'userId' });
Payment.belongsTo(Book, { foreignKey: 'bookId' });

export default Payment;
