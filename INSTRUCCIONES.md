# Guía de Mantenimiento - French in 10

¡Felicidades por tu proyecto! Aquí tienes una guía rápida para manejarlo en el futuro.

## ¿Dónde está mi proyecto?
Todo el código de tu aplicación está guardado en tu computadora en:
`C:\Users\destr\Desktop\New git hub french\French-in-10`

Y también está guardado en la nube (GitHub):
https://github.com/TalentCode1/French-in-10-Finale

## Comandos Útiles

Cuando quieras trabajar en tu proyecto nuevamente, abre una terminal (PowerShell o CMD) en la carpeta del proyecto y usa estos comandos:

### 1. Iniciar la aplicación (modo desarrollo)
Para ver la app en tu computadora mientras haces cambios:
```bash
npm run dev
```
(Luego abre http://localhost:3000 en tu navegador)

### 2. Guardar cambios y actualizar la web
Si modificas el código y quieres que se refleje en tu página web pública (GitHub Pages), ejecuta estos comandos en orden:

**Paso 1: Guardar en la nube (GitHub)**
```bash
git add .
git commit -m "Descripción de tus cambios"
git push origin main
```

**Paso 2: Actualizar la página web pública**
```bash
npm run deploy
```

## Notas Importantes
- **Terminal:** Es la ventana de comandos (pantalla negra o azul). Puedes usar la que viene integrada en VS Code (Menú Ver > Terminal) o abrir PowerShell en la carpeta.
- **Antigravity:** Soy yo, tu asistente. Mientras me uses, yo puedo ejecutar estos comandos por ti. Si trabajas solo en el futuro, usarás la terminal.
- **Clave API:** Tu clave de Gemini está segura en el archivo `.env` en tu computadora. Nunca la compartas públicamente.
