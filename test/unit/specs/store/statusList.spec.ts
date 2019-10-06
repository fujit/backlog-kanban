import { getters, mutations } from '~/store/statusList/index';
import { S, statusListInterface } from '~/store/statusList/type';

describe('store/statusList', () => {
  let state: S;
  beforeEach(() => {
    state = {
      statusList: [
        {
          id: 0,
          name: 'Todo',
          position: 1,
        },
      ],
    };
  });

  describe('getters', () => {
    describe('nextId', () => {
      test('次のIDを取得する', () => {
        expect(getters.nextId(state)).toBe(1);
      });
    });

    describe('nextPosition', () => {
      test('次のポジション番号を取得する', () => {
        expect(getters.nextPosition(state)).toBe(2);
      });
    });
  });

  describe('mutations', () => {
    describe('add', () => {
      test('ステータスを追加する', () => {
        const newStatus: statusListInterface = {
          id: 1,
          name: 'doing',
          position: 2,
        };
        mutations.add(state, newStatus);

        expect(state.statusList).toHaveLength(2);
        expect(state.statusList[1]).toEqual(newStatus);
      });
    });

    describe('update', () => {
      test('ステータス名を更新する', () => {
        const newStatus: statusListInterface = {
          id: 0,
          name: 'Pending',
          position: 1,
        };
        mutations.update(state, newStatus);

        expect(state.statusList).toHaveLength(1);
        expect(state.statusList[0]).toEqual(newStatus);
      });
    });

    describe('delete', () => {
      test('ステータスを削除する', () => {
        mutations.delete(state, { id: 0 });
        expect(state.statusList).toHaveLength(0);
      });
    });
  });
});
