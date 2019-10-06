import { getters, mutations } from '~/store/task/index';
import { S, taskInterface } from '~/store/task/type';

describe('store/task', () => {
  let state: S;
  beforeEach(() => {
    state = {
      taskList: [
        {
          id: 0,
          name: 'Jest',
          description: '',
          status_id: 0,
          position: 1,
          isArchive: false,
        },
        {
          id: 1,
          name: 'sample',
          description: 'sample',
          status_id: 0,
          position: 2,
          isArchive: false,
        },
      ],
    };
  });

  describe('getters', () => {
    describe('nextId', () => {
      test('次のIDを取得する', () => {
        expect(getters.nextId(state)).toBe(2);
      });
    });
  });

  describe('mutations', () => {
    describe('addTask', () => {
      test('タスクを追加できる', () => {
        const task: taskInterface = {
          id: 0,
          name: 'Jest',
          description: '',
          status_id: 0,
          position: 1,
          isArchive: false,
        };

        mutations.addTask(state, task);

        expect(state.taskList).toHaveLength(3);
        expect(state.taskList[2]).toEqual(task);
      });
    });

    describe('UPDATE', () => {
      describe('updateTask', () => {
        test('タスクを更新できる', () => {
          const newTask: taskInterface = {
            id: 0,
            name: 'Jest',
            description: 'Jest vs Mocha & Chai',
            status_id: 0,
            position: 0,
            isArchive: false,
          };

          mutations.updateTask(state, newTask);

          expect(state.taskList).toHaveLength(2);
          expect(state.taskList[0]).toEqual(newTask);
        });
      });

      describe('updateName', () => {
        test('タスク名を更新できる', () => {
          const newName = 'fooabr';
          mutations.updateName(state, {
            id: 1,
            name: newName,
          });

          expect(state.taskList[1].name).toBe(newName);
        });
      });

      describe('updateDescription', () => {
        test('タスク詳細を更新できる', () => {
          const newDescription = 'wwwwww';
          mutations.updateDescription(state, {
            id: 0,
            description: newDescription,
          });

          expect(state.taskList[0].description).toBe(newDescription);
        });
      });

      describe('updateStatus', () => {
        test('タスクの状態を更新できる', () => {
          const newStatusId = 2;
          mutations.updateStatus(state, {
            taskId: 0,
            toStatusId: newStatusId,
          });
          expect(state.taskList[0].status_id).toBe(newStatusId);
        });
      });

      describe('deleteTask', () => {
        test('タスクを削除できる', () => {
          mutations.deleteTask(state, { id: 1 });
          expect(state.taskList).toHaveLength(1);
        });
      });
    });
  });
});
