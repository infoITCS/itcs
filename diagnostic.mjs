import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('__dirname:', __dirname);
console.log('cwd:', process.cwd());

dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config();

console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
console.log('MONGO_URI:', process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 40) + '...' : 'NOT SET');

try {
  const mongoose = await import('mongoose');
  console.log('mongoose loaded:', !!mongoose);
  console.log('mongoose.Types.ObjectId:', typeof mongoose.Types?.ObjectId);
} catch(e) {
  console.log('mongoose LOAD ERROR:', e.message);
}

try {
  const express = await import('express');
  console.log('express loaded:', !!express);
} catch(e) {
  console.log('express LOAD ERROR:', e.message);
}

try {
  const cors = await import('cors');
  console.log('cors loaded:', !!cors);
} catch(e) {
  console.log('cors LOAD ERROR:', e.message);
}

try {
  const jwt = await import('jsonwebtoken');
  console.log('jwt loaded:', !!jwt);
} catch(e) {
  console.log('jwt LOAD ERROR:', e.message);
}

try {
  const dbHelpers = await import('./src/Backend/models/dbHelpers.js');
  console.log('dbHelpers loaded:', !!dbHelpers);
  console.log('dbHelpers exports:', Object.keys(dbHelpers));
} catch(e) {
  console.log('dbHelpers LOAD ERROR:', e.message);
}

try {
  const server = await import('./src/Backend/server.js');
  console.log('server loaded:', !!server);
  console.log('server exports:', Object.keys(server));
} catch(e) {
  console.log('server LOAD ERROR:', e.message);
}

console.log('DIAGNOSTIC COMPLETE');
