const { spawn } = require('child_process');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const nestArgs = ['nest', 'start', '--watch', '--watchAssets', ...process.argv.slice(2)];

let copied = false;

const copyGeneratedPrisma = () => {
  if (copied) return;
  copied = true;
  require('./copy-generated-prisma.js');
};

const child = spawn('npx', nestArgs, {
  cwd: projectRoot,
  shell: true,
  stdio: ['inherit', 'pipe', 'pipe'],
});

child.stdout.on('data', (chunk) => {
  const text = chunk.toString();
  process.stdout.write(text);
  if (/Found .* errors\.|Watching for file changes\./.test(text)) {
    copyGeneratedPrisma();
  }
});

child.stderr.on('data', (chunk) => {
  process.stderr.write(chunk);
});

child.on('close', (code) => {
  process.exit(code);
});

process.on('SIGINT', () => {
  child.kill('SIGINT');
  process.exit(0);
});
