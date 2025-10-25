export type InvisIntent =
  | { type: 'SHOW_LOW_STOCK'; days: number }
  | { type: 'CREATE_PO'; item: string; qty: number; supplier?: string }
  | { type: 'PLAN_PRODUCTION'; horizonDays: number }
  | { type: 'FIND_OVERDUE_INVOICES'; days: number }
  | { type: 'ROUTE_APPROVAL'; entity: string; value: number };

export type InvisReply =
  | { kind: 'TEXT'; text: string }
  | { kind: 'SUGGESTION'; title: string; details?: string }
  | { kind: 'ACTION_DRAFT'; summary: string; payload: Record<string, any> }
  | { kind: 'ERROR'; message: string };

export type InvisContext = {
  orgId: string;
  userId: string;
  role: 'owner'|'manager'|'finance'|'production'|'worker';
  preferences?: Record<string, any>;
};
