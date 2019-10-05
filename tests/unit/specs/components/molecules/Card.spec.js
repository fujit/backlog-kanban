import { shallowMount } from '@vue/test-utils';
import Card from '~/components/molecules/Card.vue';

describe('Card.vue', () => {
  describe('プロパティ', () => {
    describe('デフォルト', () => {
      test('propsで渡したデータがカードに表示されていること', () => {
        const task = {
          id: 0,
          name: 'sample',
          describe: '',
          status_id: 0,
          position: 0,
          isArchive: false,
        };
        const wrapper = shallowMount(Card, {
          propsData: { task },
        });
        const title = wrapper.find('.card-title');

        expect(title.text()).toBe(task.name);
      });
    });
  });
});
