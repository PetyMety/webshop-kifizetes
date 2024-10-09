import { Controller, Post, Req, Res, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Req() req: Request, @Res() res: Response, @Body() paymentData: any) {
    try {
      const { name, bankAccount, terms } = paymentData;
      if (!name || !bankAccount || !terms) {
        throw new Error('Please fill in all fields');
      }
      if (!/^[a-zA-Z0-9]+$/.test(name)) {
        throw new Error('Invalid name');
      }
      if (!/^\d{8}-\d{8}|\d{8}-\d{8}-\d{8}$/.test(bankAccount)) {
        throw new Error('Invalid bank account number');
      }
      await this.paymentService.addPaymentData(name, bankAccount);
      res.redirect('/success');
    } catch (error) {
      res.render('payment', { error: error.message });
    }
  }
}
