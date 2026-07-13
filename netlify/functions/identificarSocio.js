// netlify/functions/identificarSocio.js
// Envuelve a socios.js pero devuelve un objeto plano (no un array), pensado
// específicamente para mapear a variables simples (Boolean/String) en ZVA,
// evitando el uso de variables globales de tipo Array.

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Content-Type": "application/json"
};

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: HEADERS, body: "" };
  }

  try {
    const params = event.queryStringParameters || {};
    const host = event.headers["x-forwarded-host"] || event.headers.host;
    const proto = event.headers["x-forwarded-proto"] || "https";
    const url = `${proto}://${host}/.netlify/functions/socios?nombre=${encodeURIComponent(params.nombre || "")}&apellido1=${encodeURIComponent(params.apellido1 || "")}&apellido2=${encodeURIComponent(params.apellido2 || "")}`;

    const res = await fetch(url);
    const arr = await res.json();
    const encontrado = Array.isArray(arr) && arr.length > 0;
    const s = encontrado ? arr[0] : {};

    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({
        encontrado: encontrado,
        id: s.id || "",
        nombre: s.nombre || "",
        apellidos: s.apellidos || "",
        provincia: s.provincia || ""
      })
    };
  } catch (err) {
    return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ error: err.message, encontrado: false, id: "", nombre: "", apellidos: "", provincia: "" }) };
  }
};
