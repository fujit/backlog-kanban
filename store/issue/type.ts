export interface issueInterface {
  id: number;
  projectId: number;
  issueKey: string;
  issueType: Object;
  summary: string;
  description: string;
  status: status;
  assignee: Object;
  category: [];
  milestone: [];
  startDate?: string | null;
  dueDate?: string | null;
  estimatedHours?: string | null;
  actualHours?: string | null;
  created: string;
  updated: string;
}

interface status {
  id: number;
  name: string;
}

interface condition {
  projectId?: number[];
  issueTypeId?: number[];
  categoryId?: number[],
  milestoneId?: number[];
  statusId?: number[];
  assigneeId?: number[];
  sort?: 'issueType' | 'category' | 'milestone' | 'status' | 'created' | 'updated' | 'startDate' | 'dueDate' | 'assignee';
  order?: 'asc' | 'desc';
  count?: number;
  createdSince?: string;
  createdUntil?: string;
  updatedSince?: string;
  updatedUntil?: string;
  startDateSince?: string;
  startDateUntil?: string;
  dueDateSince?: string;
  dueDateUntil?: string;
  id?: number[];
  keyword?: string;
}

export interface S {
  conditions: condition;
  issueList: issueInterface[];
}

export interface G {

};

export interface M {
  // updateCondition: { key: keyof condition, value: string | number[] }; // keyに対応するvalueの型を指定したい
  setIssueList: { issueList: issueInterface[] };
}

export interface RM {
  // 'issue/updateCondition': M['updateCondition'];
  'issue/setIssueList': M['setIssueList'];
}

export interface A {
  // asyncUpdateCondition: { key: keyof condition, value: string | number[] }; // keyに対応するvalueの型を指定したい
  asyncSetIssueList: {};
}

export interface RA {
  // 'issue/asyncUpdateCondition': A['asyncUpdateCondition'];
  'issue/asyncSetIssueList': A['asyncSetIssueList'];
}