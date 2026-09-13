#!/usr/bin/env node
/**
 * AgentSkillMesh CLI
 * Copyright (c) 2026 MRLDHANWINN. Apache-2.0 Licensed.
 */

import { MeshMCPServer } from './server.js';
import { SecurityScanner } from './tools/security-scanner.js';
import * as fs from 'fs';
import * as path from 'path';

const args = process.argv.slice(2);
const command = args[0] || 'help';

if (command === 'serve') {
  const server = new MeshMCPServer();
  server.startStdio();
} else if (command === 'scan') {
  const filePath = args[1];
  if (!filePath) {
    console.error('Usage: agent-mesh scan <file>');
    process.exit(1);
  }
  const content = fs.readFileSync(path.resolve(filePath), 'utf-8');
  const findings = SecurityScanner.scan(content, path.basename(filePath));
  console.log(`Scan completed for ${filePath}. Findings: ${findings.length}`);
  findings.forEach(f => {
    console.log(`- [${f.severity.toUpperCase()}] Line ${f.line}: ${f.message} (${f.ruleId})`);
  });
} else {
  console.log(`
AgentSkillMesh - MCP Tool Suite for OpenAI Codex & Coding Agents
Author: MRLDHANWINN <dhanwinn15@gmail.com>

Commands:
  serve        Start Model Context Protocol stdio server
  scan <file>  Scan code file for security hazards
  help         Show this help message
  `);
}
