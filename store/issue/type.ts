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

export interface status {
  id: number;
  name: string;
}

export interface condition {
  projectId?: number[];
  issueTypeId?: number[];
  categoryId?: number[];
  milestoneId?: number[];
  statusId?: number[];
  assigneeId?: number[];
  sort?:
    | 'issueType'
    | 'category'
    | 'milestone'
    | 'status'
    | 'created'
    | 'updated'
    | 'startDate'
    | 'dueDate'
    | 'assignee';
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

export interface project {
  id: number;
  projectKey: string;
  name: string;
}

export interface S {
  conditions: condition;
  projects: project[];
  statusList: status[];
}

export interface G {}

export interface M {
  updateCondition: condition;
}

export interface RM {
  'issue/updateCondition': M['updateCondition'];
}

export interface A {
  asyncUpdateCondition: condition;
}

export interface RA {
  'issue/asyncUpdateCondition': A['asyncUpdateCondition'];
}
