import { Injectable } from '@nestjs/common';
import moment from 'moment-timezone';

@Injectable()
export class HelperService {
  metaData(
    countData: number,
    currentPage: number,
    size: number,
    countFiltered: number,
  ) {
    const countPage = Math.ceil(countData / size);
    const nextPage = currentPage < countPage ? currentPage + 1 : null;

    return {
      currentPage,
      nextPage,
      size,
      countPage,
      countFiltered: Number(countFiltered),
      countData: Number(countData),
    };
  }

  now(): string {
    return moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
  }
}
