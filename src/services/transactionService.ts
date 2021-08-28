import { injectable } from 'inversify';
import { PaymentStatus, Transaction } from '../models/Transaction';
import { UpdateResult } from '../types/findResult';

@injectable()
export class TransactionService {
  async setPaymentStatus(
    id: string,
    paymentStatus: PaymentStatus
  ): Promise<UpdateResult<Transaction>> {
    const [, [updatedTransaction]] = await Transaction.update(
      {
        paymentStatus,
      },
      {
        where: {
          id,
        },
        returning: true,
      }
    );

    return {
      result: 'ok',
      data: updatedTransaction,
      fields: ['paymentStatus'],
    };
  }
}
