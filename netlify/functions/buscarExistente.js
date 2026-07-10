// netlify/functions/buscarExistente.js
// Busca en un único paso si la persona que llama ya existe como socio (CERM)
// y/o como voluntario (Mago). Internamente llama a ambas funciones en
// paralelo (en vez de duplicar sus datos) para reflejar siempre el estado
// más reciente, incluidas las modificaciones hechas vía PATCH.

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Content-Type": "application/json"
};

async function buscarEnSistema(baseUrl, funcion, nombre, apellidos) {
  const url = `${baseUrl}/.netlify/functions/${funcion}?nombre=${encodeURIComponent(nombre || "")}&apellidos=${encodeURIComponent(apellidos || "")}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    return [];
  }
}

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: HEADERS, body: "" };
  }

  try {
    const params = event.queryStringParameters || {};
    const nombre = params.nombre || "";
    const apellidos = params.apellidos || "";

    if (!nombre && !apellidos) {
      return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Se requiere al menos nombre o apellidos" }) };
    }

    const host = event.headers["x-forwarded-host"] || event.headers.host;
    const proto = event.headers["x-forwarded-proto"] || "https";
    const baseUrl = `${proto}://${host}`;

    const [socios, voluntarios] = await Promise.all([
      buscarEnSistema(baseUrl, "socios", nombre, apellidos),
      buscarEnSistema(baseUrl, "voluntarios", nombre, apellidos)
    ]);

    const resultados = [];

    socios.forEach(s => resultados.push({
      sistema: "CERM",
      tipo: "socio",
      id: s.id,
      nombre: s.nombre,
      apellidos: s.apellidos,
      provincia: s.provincia,
      cuota: s.cuota,
      periodicidad: s.periodicidad,
      fechaAlta: s.fechaAlta
    }));

    voluntarios.forEach(v => resultados.push({
      sistema: "Mago",
      tipo: "voluntario",
      id: v.id,
      nombre: v.nombre,
      apellidos: v.apellidos,
      provincia: v.provincia,
      tipoVoluntariado: v.tipoVoluntariado,
      estado: v.estado,
      fechaInscripcion: v.fechaInscripcion
    }));

    return { statusCode: 200, headers: HEADERS, body: JSON.stringify(resultados) };
  } catch (err) {
    return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ error: err.message }) };
  }
};
