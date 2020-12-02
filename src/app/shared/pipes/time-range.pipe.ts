import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeRange'
})
export class TimeRangePipe implements PipeTransform {

  // value:
  // {
  //   start: Date
  //   end: Date
  // }

  getDaysMonth(date: Date) {

    const m = date.getMonth();
    const y = date.getFullYear();

    switch (true) {
      case m === 0 || m === 2 || m === 4 || m === 6 || m === 7 || m === 9 || m === 11:
        return 31;
      case m === 3 || m === 5 || m === 8 || m === 10:
        return 30;
      case m === 1:
        if (((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0)) {
          return 29;
        } else {
          return 28;
        }
    }
  }

  transform(value: any, ...args: any[]): any {

    if (value && value.start && value.end) {

      let years = value.end.getFullYear() - value.start.getFullYear();
      let months = value.end.getMonth() - value.start.getMonth();
      let days = value.end.getDate() - value.start.getDate();

      let msg1 = '';
      let msg2 = '';
      let msg3 = '';

      if (days < 0) {
        months -= 1;
        days += this.getDaysMonth(value.start);
      }
      if (months < 0) {
        years -= 1;
        months += 11;
      }
      switch (true) {
        case years === 0:
          break;
        case years === 1:
          msg1 = `${years} año `;
          break;
        default:
          msg1 = `${years} años `;
          break;
      }
      switch (true) {
        case months === 0:
          break;
        case months === 1:
          msg2 = `${months} mes `;
          break;
        default:
          msg2 = `${months} meses `;
          break;
      }
      switch (true) {
        case days === 0:
          break;
        case days === 1:
          msg3 = `${days} dia `;
          break;
        default:
          msg3 = `${days} dias `;
          break;
      }

      return msg1 + msg2 + msg3;

    } else {
      return null;
    }
  }

}
