import Vue from 'vue';
import DateUtil from '~/utility/DateUtil';

const dateUtil = DateUtil.instance;

Vue.filter('formatDate', (value: string, format?: string) => {
  return dateUtil.formatDate(value, format);
});
