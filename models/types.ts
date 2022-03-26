export interface GetUsersResults {
  success: boolean;
  elapsed: number;
  result: Result;
}

export interface Result {
  totalPages: number;
  number: number;
  recordsTotal: number;
  recordsFiltered: number;
  auditLog: AuditLog[];
}

export interface AuditLog {
  logId: number;
  applicationId: number | null;
  applicationType: ApplicationType | null;
  companyId: number | null;
  actionType: ActionType;
  ip: string;
  userAgent: string;
  userId: number | null;
  source: string | null;
  ownerId: number | null;
  logInfo: string | null;
  creationTimestamp: Date;
}

export enum ActionType {
  AddEmployee = "ADD_EMPLOYEE",
  DariAppLogin = "DARI_APP_LOGIN",
  DariRefreshToken = "DARI_REFRESH_TOKEN",
  InitiateApplication = "INITIATE_APPLICATION",
  SubmitApplication = "SUBMIT_APPLICATION",
}

export enum ApplicationType {
  AddCompany = "ADD_COMPANY",
  AddCompanyEmployee = "ADD_COMPANY_EMPLOYEE",
  AddPoa = "ADD_POA",
  CERTPropOwnership = "CERT_PROP_OWNERSHIP",
  CERTTitleDeedPlot = "CERT_TITLE_DEED_PLOT",
  LeaseClosure = "LEASE_CLOSURE",
  LeaseRegistration = "LEASE_REGISTRATION",
}

export type SortKeys = keyof AuditLog;
export type SortOrder = "ascn" | "desc";
