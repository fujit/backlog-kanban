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

export interface milestone {
  id: number;
  projectId: number;
  name: string;
  displayOrder: number;
  displayName: string;
}

export interface notification {
  projectId: number;
  issueId: number;
}

export interface S {
  conditions: condition;
  projects: project[];
  milestones: milestone[];
  statusList: status[];
}

export interface G {
  conditions: condition;
  projects: project[];
  milestones: milestone[];
  statusList: status[];
}

export interface RG {
  'issue/conditions': G['conditions'];
  'issue/projects': G['projects'];
  milestones: G['milestones'];
  statusList: G['statusList'];
}

export interface M {
  updateCondition: condition;
  fetchProjects: project[];
}

export interface RM {
  'issue/updateCondition': M['updateCondition'];
  'issue/fetchProjects': M['fetchProjects'];
}

export interface A {
  asyncUpdateCondition: condition;
  asyncFetchProjects: {};
}

export interface RA {
  'issue/asyncUpdateCondition': A['asyncUpdateCondition'];
  'issue/asyncFetchProjects': A['asyncFetchProjects'];
}
