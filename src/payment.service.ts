import { Injectable } from '@nestjs/common';
import * as csv from 'csv-writer';

@Injectable()
export class PaymentService {
  async createPayment(paymentData: any) {
    const { name, bankAccountNumber, termsAndConditions } = paymentData;

    // Validate payment data
    if (!name || !bankAccountNumber || !termsAndConditions) {
      throw new Error('Please fill in all fields');
    }

    if (!this.validateBankAccountNumber(bankAccountNumber)) {
      throw new Error('Invalid bank account number format');
    }

    // Write payment data to CSV file
    const csvWriter = csv.createObjectCsvWriter({
      path: './payments.csv',
      header: true,
    });

    const paymentDataToWrite = {
      name,
      bankAccountNumber,
      termsAndConditions,
    };

    csvWriter.writeRecord(paymentDataToWrite);

    return 'Payment data received successfully!';
  }

  private validateBankAccountNumber(bankAccountNumber: string) {
    const formats = [
      /^\d{8}-\d{8}-\d{8}$/, // 2x8 digits with dashes
      /^\d{8}-\d{8}-\d{8}-\d{8}-\d{8}-\d{8}$/, // 3x8 digits with dashes
    ];

    return formats.some((format) => format.test(bankAccountNumber));
  }
}
