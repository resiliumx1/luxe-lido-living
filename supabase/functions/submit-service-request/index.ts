import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const ASHANTE_EMAIL = 'ashante@alindsayluxe.com';
const FROM_EMAIL = 'A. Lindsay Luxe Estates <onboarding@resend.dev>';

interface ServiceRequestPayload {
  request_type: 'container_order' | 'trailer_build';
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  country?: string;
  preferred_contact?: 'whatsapp' | 'email' | 'call';
  payload: Record<string, unknown>;
  estimated_total?: number | null;
  currency?: string;
  also_interested?: string[];
  notes?: string;
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function validate(b: any): { ok: true; data: ServiceRequestPayload } | { ok: false; error: string } {
  if (!b || typeof b !== 'object') return { ok: false, error: 'invalid body' };
  if (b.request_type !== 'container_order' && b.request_type !== 'trailer_build')
    return { ok: false, error: 'invalid request_type' };
  if (typeof b.first_name !== 'string' || !b.first_name.trim()) return { ok: false, error: 'first_name required' };
  if (typeof b.last_name !== 'string' || !b.last_name.trim()) return { ok: false, error: 'last_name required' };
  if (typeof b.email !== 'string' || !isEmail(b.email)) return { ok: false, error: 'valid email required' };
  if (b.preferred_contact && !['whatsapp', 'email', 'call'].includes(b.preferred_contact))
    return { ok: false, error: 'invalid preferred_contact' };
  if (!b.payload || typeof b.payload !== 'object') return { ok: false, error: 'payload required' };

  const trim = (s: any, n: number) => (typeof s === 'string' ? s.trim().slice(0, n) : undefined);
  return {
    ok: true,
    data: {
      request_type: b.request_type,
      first_name: trim(b.first_name, 100)!,
      last_name: trim(b.last_name, 100)!,
      email: trim(b.email, 255)!,
      phone: trim(b.phone, 50),
      country: trim(b.country, 100),
      preferred_contact: b.preferred_contact,
      payload: b.payload,
      estimated_total: typeof b.estimated_total === 'number' ? b.estimated_total : null,
      currency: trim(b.currency, 8),
      also_interested: Array.isArray(b.also_interested)
        ? b.also_interested.filter((x: any) => typeof x === 'string').slice(0, 20)
        : [],
      notes: trim(b.notes, 2000),
    },
  };
}

function fmtMoney(n: number | null | undefined, currency: string | undefined) {
  if (n == null || !currency) return '—';
  const sym = currency === 'USD' ? '$' : currency === 'XCD' ? 'EC$' : currency === 'CAD' ? 'CA$' : '';
  return `${sym}${n.toLocaleString('en-US')}`;
}

function renderHtml(req: ServiceRequestPayload, id: string) {
  const title = req.request_type === 'container_order' ? 'New Container Order' : 'New Trailer Build Request';
  const lines: string[] = [];
  for (const [k, v] of Object.entries(req.payload)) {
    const val = Array.isArray(v) ? v.join(', ') : typeof v === 'object' ? JSON.stringify(v) : String(v ?? '');
    lines.push(`<tr><td style="padding:6px 12px;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:.05em;">${k}</td><td style="padding:6px 12px;color:#111;font-size:14px;">${val}</td></tr>`);
  }
  const interest = req.also_interested?.length ? req.also_interested.join(', ') : '—';
  return `<!doctype html><html><body style="font-family:Georgia,serif;background:#fff;color:#111;margin:0;padding:32px;">
    <div style="max-width:640px;margin:0 auto;border:1px solid #e7d6a3;padding:32px;">
      <div style="border-bottom:1px solid #e7d6a3;padding-bottom:16px;margin-bottom:24px;">
        <div style="font-size:11px;letter-spacing:.2em;color:#b8860b;text-transform:uppercase;">A. Lindsay Luxe Estates</div>
        <h1 style="font-family:Georgia,serif;font-weight:400;font-size:24px;margin:8px 0 0;">${title}</h1>
        <div style="font-size:12px;color:#888;margin-top:4px;">Request #${id.slice(0, 8)}</div>
      </div>
      <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:.1em;color:#666;margin:0 0 8px;">Contact</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr><td style="padding:6px 12px;color:#666;font-size:13px;">Name</td><td style="padding:6px 12px;font-size:14px;">${req.first_name} ${req.last_name}</td></tr>
        <tr><td style="padding:6px 12px;color:#666;font-size:13px;">Email</td><td style="padding:6px 12px;font-size:14px;">${req.email}</td></tr>
        <tr><td style="padding:6px 12px;color:#666;font-size:13px;">Phone</td><td style="padding:6px 12px;font-size:14px;">${req.phone || '—'}</td></tr>
        <tr><td style="padding:6px 12px;color:#666;font-size:13px;">Country</td><td style="padding:6px 12px;font-size:14px;">${req.country || '—'}</td></tr>
        <tr><td style="padding:6px 12px;color:#666;font-size:13px;">Preferred</td><td style="padding:6px 12px;font-size:14px;">${req.preferred_contact || '—'}</td></tr>
      </table>
      <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:.1em;color:#666;margin:0 0 8px;">Request Details</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">${lines.join('')}</table>
      <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:.1em;color:#666;margin:0 0 8px;">Also Exploring</h2>
      <p style="margin:0 0 24px;font-size:14px;">${interest}</p>
      ${req.estimated_total ? `<div style="border-top:1px solid #e7d6a3;padding-top:16px;font-size:18px;"><strong>Estimated total:</strong> ${fmtMoney(req.estimated_total, req.currency)}</div>` : ''}
    </div>
  </body></html>`;
}

function renderConfirmation(req: ServiceRequestPayload) {
  const what = req.request_type === 'container_order' ? 'container order' : 'trailer build';
  return `<!doctype html><html><body style="font-family:Georgia,serif;background:#fff;color:#111;margin:0;padding:32px;">
    <div style="max-width:560px;margin:0 auto;border:1px solid #e7d6a3;padding:32px;">
      <div style="font-size:11px;letter-spacing:.2em;color:#b8860b;text-transform:uppercase;">A. Lindsay Luxe Estates</div>
      <h1 style="font-family:Georgia,serif;font-weight:400;font-size:26px;margin:12px 0;">We've received your request.</h1>
      <p style="font-size:15px;line-height:1.6;color:#333;">Thank you ${req.first_name}, your ${what} request has reached Ashante directly. She'll review your details and reply personally within one business day.</p>
      <p style="font-size:14px;color:#666;margin-top:24px;">— A. Lindsay Luxe Estates · Antigua &amp; Barbuda</p>
    </div>
  </body></html>`;
}

async function sendEmails(req: ServiceRequestPayload, id: string) {
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  if (!RESEND_API_KEY) {
    console.log('[notify] RESEND_API_KEY not configured — skipping email send');
    return { sent: false, reason: 'no_api_key' };
  }
  const useGateway = !!LOVABLE_API_KEY;
  const url = useGateway ? 'https://connector-gateway.lovable.dev/resend/emails' : 'https://api.resend.com/emails';
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (useGateway) {
    headers['Authorization'] = `Bearer ${LOVABLE_API_KEY}`;
    headers['X-Connection-Api-Key'] = RESEND_API_KEY;
  } else {
    headers['Authorization'] = `Bearer ${RESEND_API_KEY}`;
  }

  const adminPayload = {
    from: FROM_EMAIL,
    to: [ASHANTE_EMAIL],
    reply_to: req.email,
    subject: req.request_type === 'container_order' ? `New container order — ${req.first_name} ${req.last_name}` : `New trailer build — ${req.first_name} ${req.last_name}`,
    html: renderHtml(req, id),
  };
  const confirmPayload = {
    from: FROM_EMAIL,
    to: [req.email],
    subject: 'We received your request — A. Lindsay Luxe Estates',
    html: renderConfirmation(req),
  };

  const results = await Promise.allSettled([
    fetch(url, { method: 'POST', headers, body: JSON.stringify(adminPayload) }).then(r => r.text()),
    fetch(url, { method: 'POST', headers, body: JSON.stringify(confirmPayload) }).then(r => r.text()),
  ]);
  console.log('[notify]', JSON.stringify(results));
  return { sent: true };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method not allowed' }), { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid json' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const v = validate(body);
  if (!v.ok) {
    return new Response(JSON.stringify({ error: v.error }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { data, error } = await supabase
    .from('service_requests')
    .insert(v.data as any)
    .select('id')
    .single();

  if (error) {
    console.error('[insert]', error);
    return new Response(JSON.stringify({ error: 'failed to save request' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  // Notifications — fire and don't fail the request if email is misconfigured
  const notify = await sendEmails(v.data, data.id).catch((e) => {
    console.error('[notify]', e);
    return { sent: false, reason: 'error' };
  });

  return new Response(JSON.stringify({ id: data.id, notified: notify.sent }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
