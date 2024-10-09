import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class PaymentService {
  async addPaymentData(name: string, bankAccount: string) {
    const data = `${name},${bankAccount}\n`;
    fs.appendFile('payments.csv', data, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
}
