import moment from 'moment';

export default class DateUtil {
  static _instance = new DateUtil();

  defaultFormat = 'YYYY-MM-DD';

  static get instance(): DateUtil {
    return this._instance;
  }

  get today(): string {
    return moment().format(this.defaultFormat);
  }

  formatDate(date: string, format: string = this.defaultFormat): string {
    return moment(date).format(format);
  }
}
