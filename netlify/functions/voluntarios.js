// netlify/functions/voluntarios.js
// Simula Mago (MS Dynamics CRM) - base de datos de voluntarios de AECC

const TIPOS = ["Acompañamiento hospitalario", "Transporte adaptado", "Apoyo administrativo",
  "Eventos y captación de fondos", "Atención telefónica Infocáncer", "Talleres y sensibilización"];
const ORIGENES = ["Redes sociales", "Recomendación de un socio", "Web AECC", "Infocáncer", "Evento solidario", "Universidad"];

function seedVoluntarios() {
  return [
    { id: "20001", nombre: "Cristina", apellidos: "Díaz Romero", provincia: "Madrid", tipoVoluntariado: "Acompañamiento hospitalario", estado: "Activo", fechaInscripcion: "2024-02-11", comoNosConocio: "Recomendación de un socio" },
    { id: "20002", nombre: "Lucía", apellidos: "Álvarez Muñoz", provincia: "Barcelona", tipoVoluntariado: "Eventos y captación de fondos", estado: "Activo", fechaInscripcion: "2023-06-19", comoNosConocio: "Redes sociales" },
    { id: "20003", nombre: "Alberto", apellidos: "Serrano Blanco", provincia: "Valencia", tipoVoluntariado: "Transporte adaptado", estado: "Lista de espera", fechaInscripcion: "2026-05-02", comoNosConocio: "Web AECC" },
    { id: "20004", nombre: "Rocío", apellidos: "Ortega Castro", provincia: "Sevilla", tipoVoluntariado: "Apoyo administrativo", estado: "Activo", fechaInscripcion: "2022-09-14", comoNosConocio: "Infocáncer" },
    { id: "20005", nombre: "Ignacio", apellidos: "Vega Rubio", provincia: "Vizcaya", tipoVoluntariado: "Atención telefónica Infocáncer", estado: "Activo", fechaInscripcion: "2021-11-30", comoNosConocio: "Evento solidario" },
    { id: "20006", nombre: "Beatriz", apellidos: "Molina Ibáñez", provincia: "Málaga", tipoVoluntariado: "Talleres y sensibilización", estado: "Lista de espera", fechaInscripcion: "2026-06-20", comoNosConocio: "Redes sociales" },
    { id: "20007", nombre: "Raúl", apellidos: "Delgado Santos", provincia: "Zaragoza", tipoVoluntariado: "Acompañamiento hospitalario", estado: "Activo", fechaInscripcion: "2020-04-07", comoNosConocio: "Universidad" },
    { id: "20008", nombre: "Nuria", apellidos: "Cabrera Vidal", provincia: "Alicante", tipoVoluntariado: "Eventos y captación de fondos", estado: "Activo", fechaInscripcion: "2023-01-25", comoNosConocio: "Recomendación de un socio" },
    { id: "20009", nombre: "Sergio", apellidos: "Iglesias Pascual", provincia: "Murcia", tipoVoluntariado: "Transporte adaptado", estado: "Lista de espera", fechaInscripcion: "2026-07-01", comoNosConocio: "Web AECC" },
    { id: "20010", nombre: "Patricia", apellidos: "Herrero Reyes", provincia: "Las Palmas", tipoVoluntariado: "Apoyo administrativo", estado: "Activo", fechaInscripcion: "2019-10-03", comoNosConocio: "Infocáncer" },
    { id: "20011", nombre: "Óscar", apellidos: "Cano Marín", provincia: "A Coruña", tipoVoluntariado: "Talleres y sensibilización", estado: "Activo", fechaInscripcion: "2024-08-16", comoNosConocio: "Evento solidario" },
    { id: "20012", nombre: "Silvia", apellidos: "Vargas Crespo", provincia: "Valladolid", tipoVoluntariado: "Atención telefónica Infocáncer", estado: "Lista de espera", fechaInscripcion: "2026-04-28", comoNosConocio: "Redes sociales" },
    { id: "20013", nombre: "Rubén", apellidos: "Pastor Domínguez", provincia: "Granada", tipoVoluntariado: "Acompañamiento hospitalario", estado: "Activo", fechaInscripcion: "2022-03-22", comoNosConocio: "Web AECC" },
    { id: "20014", nombre: "Verónica", apellidos: "Bravo León", provincia: "Madrid", tipoVoluntariado: "Eventos y captación de fondos", estado: "Activo", fechaInscripcion: "2021-07-11", comoNosConocio: "Universidad" },
    { id: "20015", nombre: "Diego", apellidos: "Soler Campos", provincia: "Barcelona", tipoVoluntariado: "Transporte adaptado", estado: "Activo", fechaInscripcion: "2020-12-05", comoNosConocio: "Infocáncer" },
    { id: "20016", nombre: "Paula", apellidos: "Vicente Nieto", provincia: "Valencia", tipoVoluntariado: "Apoyo administrativo", estado: "Lista de espera", fechaInscripcion: "2026-06-30", comoNosConocio: "Recomendación de un socio" },
    { id: "20017", nombre: "Adrián", apellidos: "Carmona Gallego", provincia: "Sevilla", tipoVoluntariado: "Talleres y sensibilización", estado: "Activo", fechaInscripcion: "2023-05-09", comoNosConocio: "Evento solidario" },
    { id: "20018", nombre: "Eva", apellidos: "Suárez Cortés", provincia: "Vizcaya", tipoVoluntariado: "Atención telefónica Infocáncer", estado: "Activo", fechaInscripcion: "2019-02-14", comoNosConocio: "Redes sociales" },
    { id: "20019", nombre: "Fernando", apellidos: "Peña Lozano", provincia: "Málaga", tipoVoluntariado: "Acompañamiento hospitalario", estado: "Lista de espera", fechaInscripcion: "2026-03-17", comoNosConocio: "Web AECC" },
    { id: "20020", nombre: "Claudia", apellidos: "Aguilar Prieto", provincia: "Zaragoza", tipoVoluntariado: "Eventos y captación de fondos", estado: "Activo", fechaInscripcion: "2022-11-01", comoNosConocio: "Universidad" }
  ];
}

let voluntarios = seedVoluntarios();

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
  "Content-Type": "application/json"
};

function nextId() {
  const maxId = voluntarios.reduce((max, v) => Math.max(max, parseInt(v.id, 10)), 20000);
  return String(maxId + 1);
}

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: HEADERS, body: "" };
  }

  try {
    if (event.httpMethod === "GET") {
      const params = event.queryStringParameters || {};

      if (params.reset === "true") {
        voluntarios = seedVoluntarios();
        return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ ok: true, message: "Datos de voluntarios reiniciados" }) };
      }

      if (params.id) {
        const v = voluntarios.find(v => v.id === params.id);
        if (!v) {
          return { statusCode: 404, headers: HEADERS, body: JSON.stringify({ error: "Voluntario no encontrado", id: params.id }) };
        }
        return { statusCode: 200, headers: HEADERS, body: JSON.stringify(v) };
      }

      if (params.provincia) {
        const results = voluntarios.filter(v => v.provincia.toLowerCase() === params.provincia.toLowerCase());
        return { statusCode: 200, headers: HEADERS, body: JSON.stringify(results) };
      }

      if (params.q) {
        const q = params.q.toLowerCase();
        const results = voluntarios.filter(v =>
          v.nombre.toLowerCase().includes(q) ||
          v.apellidos.toLowerCase().includes(q) ||
          v.id.includes(q)
        );
        return { statusCode: 200, headers: HEADERS, body: JSON.stringify(results) };
      }

      return { statusCode: 200, headers: HEADERS, body: JSON.stringify(voluntarios) };
    }

    if (event.httpMethod === "PATCH") {
      const data = JSON.parse(event.body || "{}");
      const { id } = data;
      if (!id) {
        return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Falta el campo id" }) };
      }
      const v = voluntarios.find(v => v.id === id);
      if (!v) {
        return { statusCode: 404, headers: HEADERS, body: JSON.stringify({ error: "Voluntario no encontrado", id }) };
      }
      ["estado", "tipoVoluntariado", "provincia"].forEach(field => {
        if (data[field] !== undefined) v[field] = data[field];
      });
      return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ ok: true, voluntario: v }) };
    }

    // POST = nueva inscripción (alta ágil desde llamada)
    if (event.httpMethod === "POST") {
      const data = JSON.parse(event.body || "{}");
      if (!data.nombre || !data.apellidos || !data.provincia) {
        return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Faltan campos obligatorios: nombre, apellidos, provincia" }) };
      }
      const nuevo = {
        id: nextId(),
        nombre: data.nombre,
        apellidos: data.apellidos,
        provincia: data.provincia,
        tipoVoluntariado: data.tipoVoluntariado || TIPOS[0],
        estado: data.estado || "Activo",
        fechaInscripcion: new Date().toISOString().slice(0, 10),
        comoNosConocio: data.comoNosConocio || "Infocáncer"
      };
      voluntarios.unshift(nuevo);
      return { statusCode: 201, headers: HEADERS, body: JSON.stringify({ ok: true, voluntario: nuevo }) };
    }

    return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ error: "Método no permitido" }) };
  } catch (err) {
    return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ error: err.message }) };
  }
};
