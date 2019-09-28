export interface statusListInterface {
  id: number;
  name: string;
  position: number;
}

export interface S {
  statusList: statusListInterface[];
}

export interface G {
  nextId: number;
  nextPosition: number;
}

export interface RG {
  'statusList/nextId': G['nextId'];
  'statusList/nextPosition': G['nextPosition'];
}

export interface M {
  add: statusListInterface;
  update: statusListInterface;
  delete: { id: number };
}

export interface RM {
  'statusList/add': M['add'];
  'statusList/update': M['update'];
  'statusList/delete': M['delete'];
}

export interface A {
  asyncAdd: statusListInterface;
  asyncUpdate: statusListInterface;
  asyncDelete: { id: number };
}

export interface RA {
    'statusList/asyncAdd': A['asyncAdd'];
    'statusList/asyncUpdate': A['asyncUpdate'];
    'statusList/asyncDelete': A['asyncDelete'];
};