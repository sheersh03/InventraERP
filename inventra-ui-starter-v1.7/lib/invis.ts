// Invis (Inventra + Jarvis) — AI routing layer stubs
import { InvisIntent, InvisReply, InvisContext } from './types';

// Very-lightweight local classifier stub (edge); in production,
// route to LLM for parsing NLU → intent.
export function classifyToIntent(text: string): InvisIntent | null {
  const t = text.toLowerCase();
  if (t.includes('low') && t.includes('stock')) {
    const m = t.match(/(\d+)\s*day/);
    return { type: 'SHOW_LOW_STOCK', days: m ? Number(m[1]) : 3 };
  }
  if (t.includes('create po') || t.includes('purchase order')) {
    const qty = Number(t.match(/(\d+[\d,]*)\s*(kg|units|m)/)?.[1]?.replace(/,/g,'')) || 1000;
    const item = t.match(/for\s+([\w\s\-]+?)(?:\s+\d|$)/)?.[1]?.trim() || 'Cotton Yarn';
    const supplier = t.match(/to\s+([\w\s&.-]+)/)?.[1]?.trim();
    return { type: 'CREATE_PO', item, qty, supplier };
  }
  if (t.includes('plan') && t.includes('production')) {
    const m = t.match(/next\s*(\d+)/);
    return { type: 'PLAN_PRODUCTION', horizonDays: m ? Number(m[1]) : 7 };
  }
  if (t.includes('overdue') && (t.includes('invoice') || t.includes('invoices'))) {
    const m = t.match(/(\d+)/);
    return { type: 'FIND_OVERDUE_INVOICES', days: m ? Number(m[1]) : 20 };
  }
  if (t.includes('approve') || t.includes('approval')) {
    const val = Number(t.match(/₹?(\d[\d,]*)/)?.[1]?.replace(/,/g,'')) || 0;
    const entity = t.match(/(po|invoice|work order|wo|dispatch)/i)?.[1] || 'invoice';
    return { type: 'ROUTE_APPROVAL', entity: entity.toUpperCase(), value: val };
  }
  return null;
}

// Action mapping stubs (server actions would go here)
export async function runIntent(intent: InvisIntent, ctx: InvisContext): Promise<InvisReply[]> {
  switch (intent.type) {
    case 'SHOW_LOW_STOCK':
      return [
        { kind: 'TEXT', text: `Showing items with cover < ${intent.days} days` },
        { kind: 'SUGGESTION', title: 'Reorder 2,000 kg 30s Combed yarn', details: 'Raise PO to Arvind Mills' }
      ];
    case 'CREATE_PO':
      return [
        { kind: 'ACTION_DRAFT', summary: `Draft PO for ${intent.qty} of ${intent.item}`, payload: { supplier: intent.supplier || 'Preferred Supplier' } },
        { kind: 'SUGGESTION', title: 'Add approval: Manager → Finance (₹ value threshold)' }
      ];
    case 'PLAN_PRODUCTION':
      return [
        { kind: 'TEXT', text: `Planned production window for ${intent.horizonDays} days` },
        { kind: 'SUGGESTION', title: 'Shift Cutting to Wed to avoid dyeing bottleneck' }
      ];
    case 'FIND_OVERDUE_INVOICES':
      return [
        { kind: 'TEXT', text: `Found 3 overdue invoices > ${intent.days} days` },
        { kind: 'SUGGESTION', title: 'Initiate reminders + call schedule' }
      ];
    case 'ROUTE_APPROVAL':
      return [
        { kind: 'TEXT', text: `Routing approval for ${intent.entity}` },
        { kind: 'SUGGESTION', title: 'CFO approval suggested (value threshold)' }
      ];
    default:
      return [{ kind: 'ERROR', message: 'Unknown intent' }];
  }
}
