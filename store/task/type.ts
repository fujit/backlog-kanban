export interface taskInterface {
  id: number;
  name: string;
  description: string;
  list_id: number;
  position: number;
}

export interface S {
  taskList: taskInterface[];
}

export interface G {
  sorted: taskInterface[];
}

export interface RG {
  'task/sorted': G['sorted'];
}

export interface M {
  addTask: taskInterface;
  updateTask: { id: number, name: string, description: string };
  deleteTask: { id: number };
  updateList: { taskId: number, toListId: number };
}

export interface RM {
  'task/addTask': M['addTask'];
  'task/updateTask': M['updateTask'];
  'task/deleteTasl': M['deleteTask'];
  'task/updateList': M['updateList'];
}