# 📅 turnos-pasaporte-espanol

Este proyecto automatiza la verificación de la próxima fecha de apertura para solicitar pasaportes españoles en Argentina y envía una notificación por email si hay una nueva fecha disponible.

---

## 🚀 Requisitos

### Para ejecución local

- Node.js >= 22
- pnpm >= 10
- Tener una cuenta gratuita o paga en [Mailjet](https://www.mailjet.com/) para el envío de emails.

### Para ejecución con Docker

- Docker
- Docker Compose (opcional)
- Cuenta en Mailjet

---

## 📥 Instalación

```bash
git clone https://github.com/rodrimarchese/turnos-pasaporte-espanol.git
cd turnos-pasaporte-espanol
pnpm setup
cp .env.example .env
```

---

## 🔑 Configuración

Completa el archivo `.env` con tus datos:

```env
MJ_PUBLIC_KEY=tu_clave_publica
MJ_SECRET_KEY=tu_clave_secreta
MJ_FROM_EMAIL=origen@ejemplo.com
MJ_FROM_NAME=TuNombre
MJ_TO_EMAIL=destino@ejemplo.com
MJ_TO_NAME=Destino
```

---

## ⚙️ Ejecución

### ▶️ Modo manual (local)

1. Instala las dependencias:

```bash
pnpm install
```

2. Compila el proyecto:

```bash
pnpm build
```

3. Ejecuta el script:

```bash
pnpm start
```

---

### 🐳 Modo Docker

Este proyecto incluye un entorno Docker listo para producción y ejecución automática vía cronjob.

#### Construcción de la imagen

```bash
docker compose build
```

#### Ejecución manual (para probar)

```bash
pnpm run docker:test
```

Esto ejecutará el chequeo manualmente usando la imagen Docker ya construida.

#### Ejecución automática

El contenedor incluye un cronjob que ejecuta el chequeo todos los días a las **8:00 AM (Argentina)**.  
Está configurado en el archivo `cronjob`:

```plain
0 11 * * * cd /app && node dist/index.js >> /var/log/cron.log 2>&1
```

(El contenedor corre en UTC, por eso la hora es 11:00.)

Para dejar el contenedor corriendo en segundo plano:

```bash
docker compose up -d
```

#### Ver logs

```bash
docker logs -f turnos-pasaporte
```

---

## 🗂️ Estructura del Proyecto

```bash
.
├── cronjob                 # Configuración del cron
├── Dockerfile              # Imagen Docker
├── docker-compose.yml      # Docker Compose
├── index.ts                # Código fuente principal
├── tsconfig.json           # Configuración de TypeScript
├── .env.example            # Variables de entorno de ejemplo
└── README.md               # Documentación
```

---

## ☁️ Despliegue

Este proyecto está preparado para ser desplegado en cualquier servidor con Docker, incluyendo:

- Coolify
- CapRover
- Render
- Railway
- o cualquier VPS

---

## ℹ️ Notas técnicas

- El contenedor está basado en la imagen oficial de Playwright, que incluye todas las dependencias necesarias para correr WebKit en modo headless.
- La automatización utiliza Playwright + Tempo + Mailjet.
- El cronjob está embebido dentro del contenedor, ideal para plataformas como Coolify.

---

## 🙌 Autor

Desarrollado por [Rodri Marchese](https://github.com/rodrimarchese) para automatizar y simplificar la tarea de monitorear la apertura de turnos del Consulado de España en Buenos Aires.

---

## ⭐️ Licencia

Este proyecto es open source bajo la licencia MIT. Puedes usarlo y adaptarlo libremente.
