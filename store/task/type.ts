export interface taskInterface {
  id: number;
  name: string;
  description: string;
  status_id: number;
  position: number;
  isArchive: boolean;
}

export interface S {
  taskList: taskInterface[];
}

export interface G {
  nextId: number;
}

export interface RG {
  'task/nextId': G['nextId'];
}

export interface M {
  addTask: taskInterface;
  updateTask: taskInterface,
  deleteTask: { id: number };
  updateStatus: { taskId: number, toStatusId: number };
}

export interface RM {
  'task/addTask': M['addTask'];
  'task/updateTask': M['updateTask'];
  'task/deleteTask': M['deleteTask'];
  'task/updateStatus': M['updateStatus'];
}

export interface A {
  asyncAddTask: taskInterface;
  asyncUpdateTask: taskInterface;
  asyncDeleteTask: { id: number };
  asyncUpdateStatus: { taskId: number, toStatusId: number };
}

export interface RA {
  'task/asyncAddTask': A['asyncAddTask'];
  'task/asyncUpdateTask': A['asyncUpdateTask'];
  'task/asyncDeleteTask': A['asyncDeleteTask'];
  'task/asyncUpdateStatus': A['asyncUpdateStatus'];
}