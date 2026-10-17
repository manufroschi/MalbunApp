// Passt das von Capacitor erzeugte Android-Projekt an: Website-Adresse prüfen, App-Icons einsetzen.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'capacitor.config.json'), 'utf8'));
const url = config?.server?.url || '';
if (!url.startsWith('https://') || url.includes('DEINE-SEITE')) {
  console.error('\n❌ In capacitor.config.json bei "server" → "url" noch die Adresse deiner Website eintragen, z. B. https://malbun.pages.dev\n');
  process.exit(1);
}
console.log('✔ App lädt die Website:', url);

const res = path.join(root, 'android', 'app', 'src', 'main', 'res');
if (!fs.existsSync(res)) { console.error('❌ Android-Projekt fehlt – zuerst "npx cap add android" ausführen.'); process.exit(1); }

// Adaptive Standard-Icons entfernen, damit unsere Icons verwendet werden
fs.rmSync(path.join(res, 'mipmap-anydpi-v26'), { recursive: true, force: true });
for (const dir of fs.readdirSync(path.join(root, 'resources'))) {
  const target = path.join(res, dir);
  fs.mkdirSync(target, { recursive: true });
  for (const f of fs.readdirSync(path.join(root, 'resources', dir))) {
    fs.copyFileSync(path.join(root, 'resources', dir, f), path.join(target, f));
  }
}
console.log('✔ App-Icons eingesetzt');

// Sicherstellen, dass die Standort-Berechtigungen im Manifest stehen (das Plugin bringt sie auch selbst mit)
const manifestPath = path.join(root, 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
let manifest = fs.readFileSync(manifestPath, 'utf8');
const perms = ['ACCESS_COARSE_LOCATION', 'ACCESS_FINE_LOCATION', 'FOREGROUND_SERVICE', 'FOREGROUND_SERVICE_LOCATION', 'POST_NOTIFICATIONS'];
const missing = perms.filter(p => !manifest.includes(`android.permission.${p}"`));
if (missing.length) {
  manifest = manifest.replace('</manifest>', missing.map(p => `    <uses-permission android:name="android.permission.${p}" />`).join('\n') + '\n</manifest>');
  fs.writeFileSync(manifestPath, manifest);
}
console.log('✔ Standort-Berechtigungen gesetzt');
