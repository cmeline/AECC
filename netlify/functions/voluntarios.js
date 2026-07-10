// netlify/functions/voluntarios.js
// Simula Mago (MS Dynamics CRM) - base de datos de voluntarios de AECC

const TIPOS = ["Acompañamiento hospitalario", "Transporte adaptado", "Apoyo administrativo",
  "Eventos y captación de fondos", "Atención telefónica Infocáncer", "Talleres y sensibilización"];
const ORIGENES = ["Redes sociales", "Recomendación de un socio", "Web AECC", "Infocáncer", "Evento solidario", "Universidad"];

function seedVoluntarios() {
  return [
    { id: "23054", nombre: "Cristina", apellidos: "Díaz Romero", provincia: "Madrid", tipoVoluntariado: "Acompañamiento hospitalario", estado: "Activo", fechaInscripcion: "2024-02-11", comoNosConocio: "Recomendación de un socio" },
    { id: "25187", nombre: "Lucía", apellidos: "Álvarez Muñoz", provincia: "Barcelona", tipoVoluntariado: "Eventos y captación de fondos", estado: "Activo", fechaInscripcion: "2023-06-19", comoNosConocio: "Redes sociales" },
    { id: "24693", nombre: "Alberto", apellidos: "Serrano Blanco", provincia: "Valencia", tipoVoluntariado: "Transporte adaptado", estado: "Lista de espera", fechaInscripcion: "2026-05-02", comoNosConocio: "Web AECC" },
    { id: "21452", nombre: "Rocío", apellidos: "Ortega Castro", provincia: "Sevilla", tipoVoluntariado: "Apoyo administrativo", estado: "Activo", fechaInscripcion: "2022-09-14", comoNosConocio: "Infocáncer" },
    { id: "29038", nombre: "Ignacio", apellidos: "Vega Rubio", provincia: "Vizcaya", tipoVoluntariado: "Atención telefónica Infocáncer", estado: "Activo", fechaInscripcion: "2021-11-30", comoNosConocio: "Evento solidario" },
    { id: "26471", nombre: "Beatriz", apellidos: "Molina Ibáñez", provincia: "Málaga", tipoVoluntariado: "Talleres y sensibilización", estado: "Lista de espera", fechaInscripcion: "2026-06-20", comoNosConocio: "Redes sociales" },
    { id: "27193", nombre: "Raúl", apellidos: "Delgado Santos", provincia: "Zaragoza", tipoVoluntariado: "Acompañamiento hospitalario", estado: "Activo", fechaInscripcion: "2020-04-07", comoNosConocio: "Universidad" },
    { id: "28351", nombre: "Nuria", apellidos: "Cabrera Vidal", provincia: "Alicante", tipoVoluntariado: "Eventos y captación de fondos", estado: "Activo", fechaInscripcion: "2023-01-25", comoNosConocio: "Recomendación de un socio" },
    { id: "23647", nombre: "Sergio", apellidos: "Iglesias Pascual", provincia: "Murcia", tipoVoluntariado: "Transporte adaptado", estado: "Lista de espera", fechaInscripcion: "2026-07-01", comoNosConocio: "Web AECC" },
    { id: "25718", nombre: "Patricia", apellidos: "Herrero Reyes", provincia: "Las Palmas", tipoVoluntariado: "Apoyo administrativo", estado: "Activo", fechaInscripcion: "2019-10-03", comoNosConocio: "Infocáncer" },
    { id: "21384", nombre: "Óscar", apellidos: "Cano Marín", provincia: "A Coruña", tipoVoluntariado: "Talleres y sensibilización", estado: "Activo", fechaInscripcion: "2024-08-16", comoNosConocio: "Evento solidario" },
    { id: "27649", nombre: "Silvia", apellidos: "Vargas Crespo", provincia: "Valladolid", tipoVoluntariado: "Atención telefónica Infocáncer", estado: "Lista de espera", fechaInscripcion: "2026-04-28", comoNosConocio: "Redes sociales" },
    { id: "29125", nombre: "Rubén", apellidos: "Pastor Domínguez", provincia: "Granada", tipoVoluntariado: "Acompañamiento hospitalario", estado: "Activo", fechaInscripcion: "2022-03-22", comoNosConocio: "Web AECC" },
    { id: "24857", nombre: "Verónica", apellidos: "Bravo León", provincia: "Madrid", tipoVoluntariado: "Eventos y captación de fondos", estado: "Activo", fechaInscripcion: "2021-07-11", comoNosConocio: "Universidad" },
    { id: "26192", nombre: "Diego", apellidos: "Soler Campos", provincia: "Barcelona", tipoVoluntariado: "Transporte adaptado", estado: "Activo", fechaInscripcion: "2020-12-05", comoNosConocio: "Infocáncer" },
    { id: "28473", nombre: "Paula", apellidos: "Vicente Nieto", provincia: "Valencia", tipoVoluntariado: "Apoyo administrativo", estado: "Lista de espera", fechaInscripcion: "2026-06-30", comoNosConocio: "Recomendación de un socio" },
    { id: "21935", nombre: "Adrián", apellidos: "Carmona Gallego", provincia: "Sevilla", tipoVoluntariado: "Talleres y sensibilización", estado: "Activo", fechaInscripcion: "2023-05-09", comoNosConocio: "Evento solidario" },
    { id: "27384", nombre: "Eva", apellidos: "Suárez Cortés", provincia: "Vizcaya", tipoVoluntariado: "Atención telefónica Infocáncer", estado: "Activo", fechaInscripcion: "2019-02-14", comoNosConocio: "Redes sociales" },
    { id: "29561", nombre: "Fernando", apellidos: "Peña Lozano", provincia: "Málaga", tipoVoluntariado: "Acompañamiento hospitalario", estado: "Lista de espera", fechaInscripcion: "2026-03-17", comoNosConocio: "Web AECC" },
    { id: "23718", nombre: "Claudia", apellidos: "Aguilar Prieto", provincia: "Zaragoza", tipoVoluntariado: "Eventos y captación de fondos", estado: "Activo", fechaInscripcion: "2022-11-01", comoNosConocio: "Universidad" }
  ];
}

let voluntarios = seedVoluntarios();

// Quita acentos y pasa a minúsculas, igual que en socios.js
function normalize(str) {
  return String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Busca por nombre completo (o parcial), sin importar orden de palabras ni acentos
function buscarPorNombre(query) {
  const q = normalize(query);
  const palabras = q.split(/\s+/).filter(Boolean);
  return voluntarios.filter(v => {
    if (v.id.includes(query)) return true;
    const nombreCompleto = normalize(v.nombre + " " + v.apellidos);
    return palabras.every(p => nombreCompleto.includes(p));
  });
}

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
  "Content-Type": "application/json"
};

// Genera un ID de 5 dígitos que empieza por "2" y nunca tiene dos dígitos
// iguales seguidos (para que el ZVA no se confunda al leerlo/oírlo en voz alta).
function generarIdValido(existentes) {
  let intento;
  do {
    let digitos = "2";
    for (let i = 0; i < 4; i++) {
      let d;
      do {
        d = String(Math.floor(Math.random() * 10));
      } while (d === digitos[digitos.length - 1]);
      digitos += d;
    }
    intento = digitos;
  } while (existentes.has(intento));
  return intento;
}

function nextId() {
  const existentes = new Set(voluntarios.map(v => v.id));
  return generarIdValido(existentes);
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
        const results = buscarPorNombre(params.q);
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
