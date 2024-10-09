import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-writer';

@Injectable()
export class PaymentService {
  async writePaymentDataToCsv(paymentData: any) {
    const csvWriter = csv.createObjectCsvWriter({
      path: './payment-data.csv',
      header: [
        { id: 'name', title: 'Name' },
        { id: 'bankAccountNumber', title: 'Bank Account Number' },
      ],
    });

    csvWriter.writeRecords([paymentData]);
  }
}
