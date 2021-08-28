import { IsIn } from 'class-validator';
import { PaymentStatus } from '../models/Transaction';

export class SetPaymentStatusDTO {
  @IsIn(['paid', 'pending', 'rejected'])
  paymentStatus!: PaymentStatus;
}
