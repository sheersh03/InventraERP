'use server';

// These are server actions stubs. Replace with DB writes via Prisma in production.

export async function recordUsage(kind: string, amount = 1) {
  console.log('[usage]', { kind, amount, at: new Date().toISOString() });
  return { ok: true };
}

export async function writeAudit(actor: string, action: string, entity: string, entityId: string, meta?: any) {
  console.log('[audit]', { actor, action, entity, entityId, meta, at: new Date().toISOString() });
  return { ok: true };
}
