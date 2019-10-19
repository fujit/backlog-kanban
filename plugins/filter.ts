import Vue from 'vue';
import moment from 'moment';

Vue.filter('formatDate', (value: string, format: string) => {
  return moment(value).format(format);
});
