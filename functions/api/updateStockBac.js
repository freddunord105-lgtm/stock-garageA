export async function onRequestPost({ request }) {
  // ⚠️ Mets TON URL Apps Script /exec ici (celle déployée)
  const GAS_URL = "https://script.google.com/macros/s/AKfycbxsHiBMzEZwLZN_cg-farnblXkaC69AoJxL1v7tmi9RH4-H15KOl9iOCe8U9q3Tbnpt/exec";

  try {
    const form = await request.formData();
    const bac = String(form.get("bac") || "").trim();
    const qtyAdded = String(form.get("qtyAdded") || "0").trim();
    const actor = String(form.get("actor") || "").trim();

    const body = new URLSearchParams();
    body.set("action", "updateStockBac");
    body.set("bac", bac);
    body.set("qtyAdded", qtyAdded);
    if (actor) body.set("actor", actor);

    const resp = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: body.toString(),
    });

    const text = await resp.text();

    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
