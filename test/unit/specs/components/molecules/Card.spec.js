import { shallowMount } from '@vue/test-utils';
import Card from '~/components/molecules/Card.vue';

describe('Card.vue', () => {
  describe('プロパティ', () => {
    describe('デフォルト', () => {
      test('propsで渡したデータがカードに表示されていること', () => {
        const taskTitle = 'sample';
        const wrapper = shallowMount(Card, {
          propsData: { title: taskTitle },
        });
        const title = wrapper.find('.card-title');

        expect(title.text()).toBe(taskTitle);
      });
    });
  });
});
