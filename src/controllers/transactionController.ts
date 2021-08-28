import { injectable } from 'inversify';
import {
  Authorized,
  BadRequestError,
  Body,
  JsonController,
  Param,
  Post,
} from 'routing-controllers';
import { UpdateResult } from '../types/findResult';
import { TransactionService } from '../services/transactionService';
import { SetPaymentStatusDTO } from '../dtos/setPaymentStatusDTO';
import { Transaction } from '../models/Transaction';

@injectable()
@JsonController('/transaction', { transformResponse: false })
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Authorized()
  @Post('/:id/set-payment-status')
  setPaymentStatus(
    @Param('id') id: string,
    @Body() { paymentStatus }: SetPaymentStatusDTO
  ): Promise<UpdateResult<Transaction>> {
    try {
      return this.transactionService.setPaymentStatus(id, paymentStatus);
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }
}
