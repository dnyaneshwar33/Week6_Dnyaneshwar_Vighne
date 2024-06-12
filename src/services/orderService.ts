import gocardless from '../postgresDB/gocardlessConfig';
import Payment from '../models/orderModel';


export const createOfflineMandate = async (userId: number) => {
  try {
    const customer = await gocardless.customers.create({
      email: 'user@example.com',
      given_name: 'User',
      family_name: 'Example',
      address_line1: '123 Street',
      city: 'City',
      postal_code: '12345',
      country_code: 'GB',
    });

    const mandate = await gocardless.mandates.create({
      customer_bank_account: 'BA123', 
      metadata: {
        contract: 'ABCD1234'
      }
    });

    console.log('Offline mandate created:', mandate);

    return mandate.id;
  } catch (error:any) {
    console.error('Error creating offline mandate:', error.message);
    throw new Error(`Offline mandate creation failed: ${error.message}`);
  }
};

export const createPayment = async (userId: number, bookId: number, amount: number, mandateId: string) => {
  try {
    const payment = await gocardless.payments.create({
      amount: Math.round(amount * 100), // Amount in pence/cents
      currency: 'GBP',
      links: {
        mandate: mandateId,
      },
      metadata: {
        userId: userId.toString(),
        bookId: bookId.toString(),
      },
    });

    const newPayment = await Payment.create({
      userId,
      bookId,
      amount,
      status: payment.status,
    });

    return newPayment;
  } catch (error:any) {
    throw new Error(`Payment creation failed: ${error.message}`);
  }
};

export const getPaymentById = async (paymentId: number) => {
  const payment = await Payment.findByPk(paymentId);
  if (!payment) {
    throw new Error('Payment not found');
  }
  return payment;
};
