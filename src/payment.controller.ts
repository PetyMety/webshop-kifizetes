import { Controller, Get, Post, Body, ValidationPipe, Render } from '@nestjs/common';
import { PaymentService } from './payment.service';
import * as csv from 'csv-writer';
import { error } from 'console';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('payment')
  @Render('payment')
  submitPayment1() { return {error : []}}

  @Post('payment')
  submitPayment(@Body(ValidationPipe) paymentData: any) {
    const { name, bankAccountNumber, termsAndConditions } = paymentData;

    // Validate payment data
    if (!name || !bankAccountNumber || !termsAndConditions) {
      return { error: 'Please fill in all fields' };
    }

    // Validate bank account number format
    const bankAccountNumberRegex = /^(?:\d{8}-){2}\d{8}$|^(?:\d{8}-){3}\d{8}$/;
    if (!bankAccountNumberRegex.test(bankAccountNumber)) {
      return { error: 'Invalid bank account number format' };
    }

    // Write payment data to CSV file
    const csvWriter = csv.createObjectCsvWriter({
      path: './payment-data.csv',
      header: [
        { id: 'name', title: 'Name' },
        { id: 'bankAccountNumber', title: 'Bank Account Number' },
      ],
    });

    csvWriter.writeRecords([paymentData]);

    return 'Payment data submitted successfully!';
  }
}
