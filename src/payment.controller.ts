import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(@Body(ValidationPipe) paymentData: any) {
    try {
      await this.paymentService.createPayment(paymentData);
      return 'Payment data received successfully!';
    } catch (error) {
      return { error: error.message };
    }
  }
}
