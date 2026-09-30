// This runner script executes the Cucumber suite and writes a nice HTML report.
// It loads feature files and TypeScript step definitions using the Cucumber CLI.
import { spawn } from 'child_process';
import * as path from 'path';

const projectRoot = path.resolve(__dirname, '..');

const cucumberArgs = [
  'cucumber-js',
  'features/**/*.feature',
  '--require-module',
  'ts-node/register',
  '--require',
  'step-definitions/**/*.ts',
  '--require',
  'hooks/**/*.ts',
  '--require',
  'pages/**/*.ts',
  '--require',
  'config/**/*.ts',
  '--format',
  'html:reports/cucumber-report.html',
  '--format',
  'progress'
];

const child = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', cucumberArgs, {
  cwd: projectRoot,
  stdio: 'inherit',
  env: {
    ...process.env,
    FORCE_COLOR: '1'
  }
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

child.on('error', (error) => {
  console.error('Failed to start the Cucumber runner:', error);
  process.exit(1);
});
