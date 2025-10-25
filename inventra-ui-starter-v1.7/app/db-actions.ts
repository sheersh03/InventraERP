'use server';

import { prisma } from '@/lib/db';

export async function recordUsageDB(tenantId: string, kind: string, amount = 1) {
  await prisma.usageEvent.create({ data: { tenantId, kind, amount } });
  return { ok: true };
}

export async function writeAuditDB(tenantId: string, actor: string, action: string, entity: string, entityId: string, meta?: any) {
  await prisma.audit.create({
    data: {
      tenantId, actor, action, entity, entityId,
      meta: meta ? JSON.stringify(meta) : null
    }
  });
  return { ok: true };
}

export async function upsertTenant(subdomain: string, name?: string) {
  const t = await prisma.tenant.upsert({
    where: { subdomain },
    create: { subdomain, name: name || subdomain },
    update: { name: name || subdomain }
  });
  return t;
}

export async function listWebhookLogs(limit = 50) {
  return prisma.webhookLog.findMany({ orderBy: { createdAt: 'desc' }, take: limit });
}
