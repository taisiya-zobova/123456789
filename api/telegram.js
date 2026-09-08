export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const payload = req.body?.payload || req.body;
  const data = payload?.data || payload;

  const text = `Новая заявка с сайта:\n` +
    Object.entries(data || {})
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

  const tgResponse = await fetch(
    `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: process.env.TG_CHAT_ID, text }),
    }
  );

  if (!tgResponse.ok) return res.status(500).send('Telegram error');
  res.status(200).send('OK');
}
