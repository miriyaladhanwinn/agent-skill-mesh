/**
 * Tests for AgentSkillMesh Tools
 * Copyright (c) 2026 MRLDHANWINN. Apache-2.0 Licensed.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { SecurityScanner } from '../tools/security-scanner.js';
import { ASTGrep } from '../tools/ast-grep.js';
import { MeshMCPServer } from '../server.js';

describe('AgentSkillMesh Tool Suite', () => {
  test('SecurityScanner detects dynamic eval hazards', () => {
    const code = 'const res = eval("2 + 2");';
    const findings = SecurityScanner.scan(code, 'test.js');
    assert.equal(findings.length, 1);
    assert.equal(findings[0].ruleId, 'SEC-001');
    assert.equal(findings[0].severity, 'critical');
  });

  test('ASTGrep extracts symbol snippets', () => {
    const code = `
export function computeMetrics(val: number) {
  return val * 2;
}
`;
    const matches = ASTGrep.findSymbols(code, 'metrics.ts', 'computeMetrics');
    assert.equal(matches.length, 1);
    assert.equal(matches[0].line, 2);
  });

  test('MeshMCPServer lists tools and executes correctly', async () => {
    const server = new MeshMCPServer();
    const listRes = await server.handleMessage({ jsonrpc: '2.0', id: 1, method: 'tools/list' });
    assert.equal(listRes.result.tools.length, 2);

    const callRes = await server.handleMessage({
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'scan_code_security',
        arguments: { code: 'const x = 1;', filename: 'clean.js' }
      }
    });
    assert.ok(callRes.result?.content);
  });
});
