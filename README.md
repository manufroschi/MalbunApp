# Malbun-App (Android)

Diese App lädt die Malbun-Website und ergänzt nur eine Sache: **GPS-Teilen auch bei gesperrtem Handy**.
Login, Listen und Daten sind dieselben wie auf der Website (gleiche Firebase-Datenbank).

## So entsteht die App-Datei

GitHub baut die App bei jeder Änderung automatisch (Reiter **Actions**, dauert ca. 5–10 Minuten).
Die fertige Datei liegt danach unter **Releases → „Malbun-App (Android)“ → Malbun.apk**.

## Einstellung

In `capacitor.config.json` steht bei `server.url` die Adresse der Website, z. B.

```json
"server": { "url": "https://malbun.pages.dev" }
```

Wenn sich die Website-Adresse ändert, hier anpassen und speichern (Commit) – die App wird neu gebaut.

## Dateien

| Datei | Zweck |
|---|---|
| `capacitor.config.json` | App-Name, App-ID und Website-Adresse |
| `package.json` | verwendete Bausteine (Capacitor, Hintergrund-GPS) |
| `scripts/patch-android.mjs` | setzt Icons und Berechtigungen ins Android-Projekt |
| `resources/` | App-Icons |
| `www/index.html` | Seite, die nur ohne Internet erscheint |
| `.github/workflows/build-apk.yml` | Bauanleitung für GitHub |
