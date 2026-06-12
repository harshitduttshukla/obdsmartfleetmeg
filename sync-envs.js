const fs = require('fs');
const path = require('path');

const rootEnvPath = path.resolve(__dirname, '.env');
if (!fs.existsSync(rootEnvPath)) {
  console.log('No root .env file found to sync.');
  process.exit(0);
}

const targets = [
  'apps/api/.env',
  'apps/web/.env.local',
  'apps/socket/.env',
  'apps/mqtt-consumer/.env',
  'apps/worker/.env',
  'packages/database/.env'
];

targets.forEach(target => {
  const targetPath = path.resolve(__dirname, target);
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.copyFileSync(rootEnvPath, targetPath);
  console.log(`Synced .env to ${target}`);
});
