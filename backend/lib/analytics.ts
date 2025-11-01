export async function gaLead(payload: { client_id?: string }) {
  if (!process.env.GA4_MEASUREMENT_ID || !process.env.GA4_API_SECRET) return;
  await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA4_MEASUREMENT_ID}&api_secret=${process.env.GA4_API_SECRET}`,
    {
      method: "POST",
      body: JSON.stringify({
        client_id: payload.client_id || "555.555",
        events: [{ name: "lead_created" }]
      })
    }
  ).catch(() => {});
}

