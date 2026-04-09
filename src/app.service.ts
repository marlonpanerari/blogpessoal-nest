import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Ohayo Sekai, Good Morning World';
  }
}
