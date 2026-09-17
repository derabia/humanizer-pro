#!/usr/bin/env node
// Cross-version test runner: enumerates tests/*.test.js explicitly so it works
// on Node 18 (no glob support in --test) and Node 21+ (directory arg quirk).
'use strict';
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'tests');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.test.js')).sort().map((f) => path.join(dir, f));
const r = spawnSync(process.execPath, ['--test', ...files], { stdio: 'inherit' });
process.exit(r.status === null ? 1 : r.status);
