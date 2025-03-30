FROM mcr.microsoft.com/playwright:v1.51.1-jammy

# Instalar cron
RUN apt-get update && apt-get install -y cron && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
RUN pnpm build

# Copiar cronjob
COPY cronjob /etc/cron.d/turnos-pasaporte
RUN chmod 0644 /etc/cron.d/turnos-pasaporte
RUN crontab /etc/cron.d/turnos-pasaporte

# Crear log
RUN touch /var/log/cron.log

CMD ["sh", "-c", "cron && tail -f /var/log/cron.log"]
