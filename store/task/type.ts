export interface taskInterface {
  id: number;
  name: string;
  description: string;
  status_id: number;
  position: number;
}

export interface S {
  taskList: taskInterface[];
}

export interface G {
  sorted: taskInterface[];
  nextId: number;
}

export interface RG {
  'task/sorted': G['sorted'];
  'task/nextId': G['nextId'];
}

export interface M {
  addTask: taskInterface;
  updateTask: { id: number, name: string, description: string };
  deleteTask: { id: number };
  updateStatus: { taskId: number, toStatusId: number };
}

export interface RM {
  'task/addTask': M['addTask'];
  'task/updateTask': M['updateTask'];
  'task/deleteTasl': M['deleteTask'];
  'task/updateStatus': M['updateStatus'];
}