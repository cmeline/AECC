// netlify/functions/socios.js
// Simula CERM (Salesforce) - base de datos de socios de AECC
// Datos en memoria: persisten mientras la function esté "caliente".
// Si pasa mucho rato sin actividad o se hace un redeploy, vuelve a los datos originales.

const PROVINCIAS = ["Madrid", "Barcelona", "Valencia", "Sevilla", "Vizcaya", "Málaga",
  "Zaragoza", "Alicante", "Murcia", "Las Palmas", "A Coruña", "Valladolid", "Granada"];

function seedSocios() {
  return [
    { id: "13024", nombre: "Pedro", apellidos: "Pérez García", provincia: "Madrid", genero: "Hombre",
      cuota: 7, periodicidad: "Trimestral", cuentaBancaria: "ES21 **** **** **** 4521",
      fechaAlta: "2015-04-12", donativos: [
        { fecha: "2026-01-10", importe: 7, concepto: "Cuota periódica" },
        { fecha: "2025-10-10", importe: 7, concepto: "Cuota periódica" }
      ], incidencias: [], observaciones: "" },
    { id: "15287", nombre: "Pablo", apellidos: "Ruiz Picasso", provincia: "Málaga", genero: "Hombre",
      cuota: 15, periodicidad: "Mensual", cuentaBancaria: "ES08 **** **** **** 7734",
      fechaAlta: "2019-09-01", donativos: [
        { fecha: "2026-06-01", importe: 15, concepto: "Cuota periódica" }
      ], incidencias: [], observaciones: "" },
    { id: "12693", nombre: "Javier", apellidos: "Bardem Sánchez", provincia: "Las Palmas", genero: "Hombre",
      cuota: 20, periodicidad: "Mensual", cuentaBancaria: "ES44 **** **** **** 2210",
      fechaAlta: "2012-02-20", donativos: [
        { fecha: "2026-06-05", importe: 20, concepto: "Cuota periódica" },
        { fecha: "2025-12-03", importe: 50, concepto: "Donativo puntual - Mi Reto" }
      ], incidencias: [], observaciones: "" },
    { id: "17452", nombre: "Penélope", apellidos: "Cruz Sánchez", provincia: "Madrid", genero: "Mujer",
      cuota: 10, periodicidad: "Trimestral", cuentaBancaria: "ES19 **** **** **** 5588",
      fechaAlta: "2017-11-03", donativos: [
        { fecha: "2026-01-15", importe: 10, concepto: "Cuota periódica" }
      ], incidencias: [], observaciones: "" },
    { id: "19038", nombre: "Salvador", apellidos: "Dalí Domènech", provincia: "Zaragoza", genero: "Hombre",
      cuota: 5, periodicidad: "Anual", cuentaBancaria: "ES63 **** **** **** 9021",
      fechaAlta: "2009-06-30", donativos: [
        { fecha: "2026-06-30", importe: 5, concepto: "Cuota periódica" }
      ], incidencias: [{ fecha: "2025-03-14", descripcion: "Reclamó recibo duplicado, resuelto." }], observaciones: "" },
    { id: "14829", nombre: "Antonio", apellidos: "García López", provincia: "Sevilla", genero: "Hombre",
      cuota: 10, periodicidad: "Mensual", cuentaBancaria: "ES30 **** **** **** 1123",
      fechaAlta: "2021-01-18", donativos: [], incidencias: [], observaciones: "" },
    { id: "16571", nombre: "María", apellidos: "López Fernández", provincia: "Valencia", genero: "Mujer",
      cuota: 8, periodicidad: "Trimestral", cuentaBancaria: "ES55 **** **** **** 3345",
      fechaAlta: "2018-07-22", donativos: [], incidencias: [], observaciones: "" },
    { id: "18293", nombre: "Manuel", apellidos: "Martínez Ruiz", provincia: "Alicante", genero: "Hombre",
      cuota: 12, periodicidad: "Mensual", cuentaBancaria: "ES77 **** **** **** 6678",
      fechaAlta: "2014-03-09", donativos: [], incidencias: [], observaciones: "" },
    { id: "13947", nombre: "Carmen", apellidos: "Sánchez Gómez", provincia: "Murcia", genero: "Mujer",
      cuota: 6, periodicidad: "Mensual", cuentaBancaria: "ES12 **** **** **** 9910",
      fechaAlta: "2020-05-14", donativos: [], incidencias: [], observaciones: "" },
    { id: "15618", nombre: "José", apellidos: "Rodríguez Díaz", provincia: "A Coruña", genero: "Hombre",
      cuota: 25, periodicidad: "Anual", cuentaBancaria: "ES90 **** **** **** 4432",
      fechaAlta: "2011-08-27", donativos: [], incidencias: [], observaciones: "" },
    { id: "17384", nombre: "Isabel", apellidos: "Fernández Martín", provincia: "Valladolid", genero: "Mujer",
      cuota: 9, periodicidad: "Trimestral", cuentaBancaria: "ES41 **** **** **** 7723",
      fechaAlta: "2016-12-01", donativos: [], incidencias: [], observaciones: "" },
    { id: "12759", nombre: "Francisco", apellidos: "Gómez Jiménez", provincia: "Granada", genero: "Hombre",
      cuota: 10, periodicidad: "Mensual", cuentaBancaria: "ES66 **** **** **** 5511",
      fechaAlta: "2022-02-10", donativos: [], incidencias: [], observaciones: "" },
    { id: "19426", nombre: "Ana", apellidos: "Martín Ruiz", provincia: "Barcelona", genero: "Mujer",
      cuota: 15, periodicidad: "Mensual", cuentaBancaria: "ES25 **** **** **** 8834",
      fechaAlta: "2013-10-05", donativos: [], incidencias: [{ fecha: "2026-02-01", descripcion: "Solicitó certificado de donación 2025." }], observaciones: "" },
    { id: "14093", nombre: "Laura", apellidos: "Ruiz Hernández", provincia: "Vizcaya", genero: "Mujer",
      cuota: 7, periodicidad: "Trimestral", cuentaBancaria: "ES38 **** **** **** 2290",
      fechaAlta: "2019-01-29", donativos: [], incidencias: [], observaciones: "" },
    { id: "16852", nombre: "Miguel", apellidos: "Muñoz Álvarez", provincia: "Madrid", genero: "Hombre",
      cuota: 10, periodicidad: "Mensual", cuentaBancaria: "ES47 **** **** **** 6612",
      fechaAlta: "2010-07-19", donativos: [], incidencias: [], observaciones: "" },
    { id: "18467", nombre: "Elena", apellidos: "Romero Torres", provincia: "Sevilla", genero: "Mujer",
      cuota: 5, periodicidad: "Mensual", cuentaBancaria: "ES52 **** **** **** 3367",
      fechaAlta: "2023-03-03", donativos: [], incidencias: [], observaciones: "" },
    { id: "13529", nombre: "Alejandro", apellidos: "Alonso Navarro", provincia: "Zaragoza", genero: "Hombre",
      cuota: 12, periodicidad: "Trimestral", cuentaBancaria: "ES61 **** **** **** 9945",
      fechaAlta: "2017-05-16", donativos: [], incidencias: [], observaciones: "" },
    { id: "15748", nombre: "Sara", apellidos: "Gutiérrez Moreno", provincia: "Málaga", genero: "Mujer",
      cuota: 8, periodicidad: "Mensual", cuentaBancaria: "ES83 **** **** **** 1156",
      fechaAlta: "2021-09-09", donativos: [], incidencias: [], observaciones: "" },
    { id: "17293", nombre: "David", apellidos: "Navarro Muñoz", provincia: "Valencia", genero: "Hombre",
      cuota: 10, periodicidad: "Anual", cuentaBancaria: "ES29 **** **** **** 7789",
      fechaAlta: "2012-11-27", donativos: [], incidencias: [], observaciones: "" },
    { id: "19684", nombre: "Marta", apellidos: "Torres Jiménez", provincia: "Las Palmas", genero: "Mujer",
      cuota: 6, periodicidad: "Trimestral", cuentaBancaria: "ES14 **** **** **** 4423",
      fechaAlta: "2020-08-08", donativos: [], incidencias: [], observaciones: "" }
  ];
}

let socios = seedSocios();

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
  "Content-Type": "application/json"
};

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: HEADERS, body: "" };
  }

  try {
    if (event.httpMethod === "GET") {
      const params = event.queryStringParameters || {};

      if (params.reset === "true") {
        socios = seedSocios();
        return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ ok: true, message: "Datos de socios reiniciados" }) };
      }

      if (params.id) {
        const socio = socios.find(s => s.id === params.id);
        if (!socio) {
          return { statusCode: 404, headers: HEADERS, body: JSON.stringify({ error: "Socio no encontrado", id: params.id }) };
        }
        return { statusCode: 200, headers: HEADERS, body: JSON.stringify(socio) };
      }

      if (params.q) {
        const q = params.q.toLowerCase();
        const results = socios.filter(s =>
          s.nombre.toLowerCase().includes(q) ||
          s.apellidos.toLowerCase().includes(q) ||
          s.id.includes(q)
        );
        return { statusCode: 200, headers: HEADERS, body: JSON.stringify(results) };
      }

      return { statusCode: 200, headers: HEADERS, body: JSON.stringify(socios) };
    }

    if (event.httpMethod === "PATCH" || event.httpMethod === "POST") {
      const data = JSON.parse(event.body || "{}");
      const { id } = data;
      if (!id) {
        return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Falta el campo id" }) };
      }
      const socio = socios.find(s => s.id === id);
      if (!socio) {
        return { statusCode: 404, headers: HEADERS, body: JSON.stringify({ error: "Socio no encontrado", id }) };
      }

      // Actualización de campos simples
      ["cuota", "periodicidad", "cuentaBancaria", "provincia", "observaciones"].forEach(field => {
        if (data[field] !== undefined) socio[field] = data[field];
      });

      // Añadir un nuevo donativo
      if (data.nuevoDonativo) {
        socio.donativos.unshift({
          fecha: data.nuevoDonativo.fecha || new Date().toISOString().slice(0, 10),
          importe: data.nuevoDonativo.importe,
          concepto: data.nuevoDonativo.concepto || "Donativo puntual"
        });
      }

      // Añadir una nueva incidencia
      if (data.nuevaIncidencia) {
        socio.incidencias.unshift({
          fecha: new Date().toISOString().slice(0, 10),
          descripcion: data.nuevaIncidencia
        });
      }

      return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ ok: true, socio }) };
    }

    return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ error: "Método no permitido" }) };
  } catch (err) {
    return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ error: err.message }) };
  }
};
