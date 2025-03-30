# 🤝 Contribuir al proyecto

¡Gracias por tu interés en colaborar con **turnos-pasaporte-espanol**!  
Este proyecto es abierto y cualquier ayuda, sugerencia o mejora será bienvenida.

## 🚀 ¿Cómo puedo contribuir?

Podés ayudar de varias maneras:

### 1. Reportar problemas

Si encontrás algún bug o problema, podés abrir un **Issue** describiendo:

- Lo que esperabas que ocurra.
- Qué pasó realmente.
- Cómo reproducirlo (si es posible).

### 2. Sugerir mejoras

Si tenés ideas para nuevas funcionalidades, dejalas en un **Issue** con la etiqueta `enhancement`.

### 3. Proponer un Pull Request

Si querés sumar código, podés hacerlo siguiendo estos pasos:

#### 📝 Pasos

1. **Fork** del repositorio.
2. Cloná tu fork:

```bash
git clone https://github.com/tu-usuario/turnos-pasaporte-espanol.git
```

3. Creá una nueva rama:

```bash
git checkout -b feature/nueva-funcionalidad
```

4. Hacé tus cambios y asegurate de que el proyecto siga funcionando:

```bash
pnpm setup
pnpm build
pnpm start
```

5. Commit y push:

```bash
git add .
git commit -m "Agrega nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

6. Abrí un **Pull Request** hacia la rama `main`.

---

## ⭐️ Ideas sugeridas para contribuir

- Agregar notificaciones por **Telegram**.
- Integrar notificaciones por **Discord**.
- Mejorar el archivo `.env.example` para soportar múltiples canales de notificación.
- Agregar tests básicos.
- Publicar imagen oficial en **Docker Hub**.
- Documentar cómo desplegarlo en Coolify o en otras plataformas.

---

## ✅ Requisitos

Por favor asegurate de:

- Seguir la estructura y estilo del proyecto.
- Mantener las variables sensibles en el archivo `.env`.
- Que el proyecto funcione correctamente después de tus cambios.

---

**¡Gracias por ayudar a mejorar este proyecto! 🚀**
