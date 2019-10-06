import { createLocalVue, shallowMount } from '@vue/test-utils';
import Buefy from 'buefy';
import TskCardDetailDescription from '~/components/molecules/TskCardDetailDescription.vue';

describe('TskCardDetailDescription.vue', () => {
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Buefy);
  });

  describe('画面表示', () => {
    describe('プレビュー画面', () => {
      describe('descriptionがある時', () => {
        let wrapper;
        beforeEach(() => {
          wrapper = shallowMount(TskCardDetailDescription, {
            localVue,
            propsData: { description: 'sample' },
          });
        });

        test('プレビュー画面が表示されていること', () => {
          expect(wrapper.find('.task-description-preview').isVisible()).toBe(
            true
          );
        });

        test('propsで渡したデータが画面上に表示されていること', () => {
          expect(wrapper.find('.task-description-content').text()).toBe(
            'sample'
          );
        });

        test('詳細を追加するボタンが存在しないこと', () => {
          expect(
            wrapper.find('.task-description-button b-button-stub').exists()
          ).toBe(false);
        });

        test('Markdown形式はHTML形式に変換されていること', () => {
          const wrapper = shallowMount(TskCardDetailDescription, {
            localVue,
            propsData: { description: '# foobar' },
          });

          expect(wrapper.find('.task-description-content').html()).toBe(
            `<div class="task-description-content"><h1 id="foobar">foobar</h1>
</div>`
          );
        });

        test('編集画面は非表示になっていること', () => {
          expect(wrapper.find('.task-description-edit').isVisible()).toBe(
            false
          );
        });
      });

      describe('descriptionがない時', () => {
        let wrapper;
        beforeEach(() => {
          wrapper = shallowMount(TskCardDetailDescription, {
            localVue,
            propsData: { description: '' },
          });
        });

        test('プレビューが表示されていないこと', () => {
          expect(wrapper.find('.task-description-content').exists()).toBe(
            false
          );
        });

        test('ボタンが画面上に表示されていること', () => {
          const button = wrapper.find('.task-description-button b-button-stub');
          expect(button.exists()).toBe(true);
          expect(button.text()).toBe('詳細を追加');
        });
      });
    });

    describe('編集画面', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = shallowMount(TskCardDetailDescription, {
          localVue,
          propsData: { description: 'hogehoge' },
        });
        wrapper.setData({ isPreview: false });
      });

      test('編集画面が表示されていること', () => {
        expect(wrapper.find('.task-description-edit').isVisible()).toBe(true);
      });

      test('プレビュー画面が非表示になっていること', () => {
        expect(wrapper.find('.task-description-preview').isVisible()).toBe(
          false
        );
      });

      test('保存とキャンセルボタンが存在すること', () => {
        const div = wrapper.find('.task-description-footer');
        expect(div.find('b-button-stub').exists()).toBe(true);
        expect(div.find('closebutton-stub').exists()).toBe(true);
      });
    });
  });

  describe('イベント', () => {
    describe('click', () => {
      describe('プレビュー時', () => {
        test('プレビュー部をクリック時、編集画面に切り替わる', () => {
          const wrapper = shallowMount(TskCardDetailDescription, {
            localVue,
            propsData: { description: '# foobar' },
          });
          const div = wrapper.find('.task-description-content');
          div.trigger('click');

          expect(wrapper.find('.task-description-preview').isVisible()).toBe(
            false
          );

          expect(wrapper.find('.task-description-edit').isVisible()).toBe(true);
        });

        // test('詳細を追加ボタンをクリックすると、編集画面に切り替わる', () => {
        //   const wrapper = shallowMount(TskCardDetailDescription, {
        //     localVue,
        //     propsData: { description: '' },
        //   });

        //   const button = wrapper.find('.task-description-button b-button-stub');
        //   button.trigger('click');

        //   expect(wrapper.find('.task-description-preview').isVisible()).toBe(
        //     false
        //   );

        //   expect(wrapper.find('.task-description-edit').isVisible()).toBe(true);
        // });
      });

      describe('編集時', () => {
        let wrapper;
        beforeEach(() => {
          wrapper = shallowMount(TskCardDetailDescription, {
            localVue,
            propsData: { description: 'hoge' },
          });
        });

        describe('保存', () => {
          test('表示内容が更新されること', () => {
            // TODO: テキストエリアの値を直接書き換えるように書いた方が良い
            wrapper.setData({ taskDescription: 'foobar' });

            wrapper
              .find('.task-description-footer b-button-stub')
              .trigger('click');

            const div = wrapper.find('.task-description-content');
            expect(div.text()).toBe('foobar');
          });

          test('プレビュー状態になること', () => {
            wrapper
              .find('.task-description-footer b-button-stub')
              .trigger('click');

            expect(wrapper.find('.task-description-preview').isVisible()).toBe(
              true
            );

            expect(wrapper.find('.task-description-edit').isVisible()).toBe(
              false
            );
          });
        });

        describe('キャンセル', () => {
          // test('表示内容が更新されないこと', () => {
          //   wrapper.setData({ taskDescription: 'foobar' });

          //   wrapper
          //     .find('.task-description-footer closebutton-stub')
          //     .trigger('click');

          //   const div = wrapper.find('.task-description-content');

          //   expect(div.text()).toBe('hoge');
          // });

          test('プレビュー状態になること', () => {
            wrapper
              .find('.task-description-footer closebutton-stub')
              .trigger('click');

            expect(wrapper.find('.task-description-preview').isVisible()).toBe(
              true
            );

            expect(wrapper.find('.task-description-edit').isVisible()).toBe(
              false
            );
          });
        });
      });
    });
  });
});
