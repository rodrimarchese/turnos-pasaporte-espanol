import { isAfter, parse } from "@formkit/tempo";
import { webkit } from "playwright";
import { existsSync } from "fs";

if (existsSync(".env")) {
  // Solo en local
  process.loadEnvFile();
  console.log("✅ Variables de entorno cargadas desde .env");
} else {
  console.log("✅ Variables de entorno cargadas desde el entorno");
}

async function checkPasaporteDate() {
  try {
    const browser = await webkit.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(
      "https://www.cgeonline.com.ar/informacion/apertura-de-citas.html"
    );

    const table = page.locator("table");
    const rowCount = await table.locator("tbody tr").count();

    for (let i = 0; i < rowCount; i++) {
      const row = table.locator("tbody tr").nth(i);
      const servicio = await row.locator("td:nth-child(1)").innerText();

      if (servicio.includes("renovación y primera vez")) {
        const nextDateText = await row.locator("td:nth-child(3)").innerText();
        const nextDateTextClean = nextDateText.replace(" hs", "").trim();

        // Verificar si el texto tiene el formato esperado de fecha (DD/MM/YYYY HH:mm) ó un formato asi: 29/05/2025 a las 08:45
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}\s\d{2}:\d{2}$/;
        const dateRegex2 = /^\d{2}\/\d{2}\/\d{4}\sa\slas\s\d{2}:\d{2}$/;

        let date, time;
        if (dateRegex.test(nextDateTextClean)) {
          [date, time] = nextDateTextClean.split(" ");
        } else if (dateRegex2.test(nextDateTextClean)) {
          const parts = nextDateTextClean.split(" a las ");
          date = parts[0];
          time = parts[1];
        } else {
          console.log(
            `❌ El texto "${nextDateText}" no tiene el formato de fecha esperado`
          );
          continue;
        }

        let parsedDate;
        try {
          parsedDate = parse(`${date} ${time} -03:00`, "DD/MM/YYYY HH:mm Z");
        } catch (error: any) {
          console.log(
            `❌ Error al parsear la fecha "${nextDateTextClean}": ${error.message}`
          );
          continue;
        }

        console.log(`✅ Próxima apertura: ${parsedDate}`);

        if (isAfter(parsedDate, new Date())) {
          console.log(
            `✅ La próxima apertura de fechas para pasaportes es el: ${parsedDate}`
          );

          await fetch("https://api.mailjet.com/v3.1/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${Buffer.from(
                `${process.env.MJ_PUBLIC_KEY}:${process.env.MJ_SECRET_KEY}`
              ).toString("base64")}`,
            },
            body: JSON.stringify({
              Messages: [
                {
                  From: {
                    Email: process.env.MJ_FROM_EMAIL,
                    Name: process.env.MJ_FROM_NAME,
                  },
                  To: [
                    {
                      Email: process.env.MJ_TO_EMAIL,
                      Name: process.env.MJ_TO_NAME,
                    },
                  ],
                  Subject: "📅 Apertura de Citas para Pasaportes",
                  TextPart: `La próxima apertura de fechas para pasaportes es el: ${parsedDate}`,
                },
              ],
            }),
          });
        }
        break;
      }
    }

    await browser.close();
  } catch (error) {
    console.error("❗ Error verificando fechas:", error);
  }
}

checkPasaporteDate();
