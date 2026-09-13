/**
 * MCP Stdio Server Implementation for AgentSkillMesh
 * Copyright (c) 2026 MRLDHANWINN. Apache-2.0 Licensed.
 */

import { SecurityScanner } from './tools/security-scanner.js';
import { ASTGrep } from './tools/ast-grep.js';

export class MeshMCPServer {
  public getToolsList() {
    return [
      {
        name: 'scan_code_security',
        description: 'Scans source code for critical security hazards, dynamic eval, and secret leaks.',
        inputSchema: {
          type: 'object',
          properties: {
            code: { type: 'string', description: 'Source code content to scan' },
            filename: { type: 'string', description: 'Filename or path for contextual rules' }
          },
          required: ['code', 'filename']
        }
      },
      {
        name: 'search_ast_symbols',
        description: 'Performs semantic symbol search across code files.',
        inputSchema: {
          type: 'object',
          properties: {
            code: { type: 'string', description: 'Source code string' },
            filename: { type: 'string', description: 'Filename' },
            pattern: { type: 'string', description: 'Symbol or pattern to match' }
          },
          required: ['code', 'filename', 'pattern']
        }
      }
    ];
  }

  public async executeTool(name: string, args: any): Promise<any> {
    if (name === 'scan_code_security') {
      return SecurityScanner.scan(args.code, args.filename);
    }
    if (name === 'search_ast_symbols') {
      return ASTGrep.findSymbols(args.code, args.filename, args.pattern);
    }
    throw new Error(`Tool ${name} not supported`);
  }

  public async handleMessage(msg: any): Promise<any> {
    const { id, method, params } = msg;

    if (method === 'tools/list') {
      return {
        jsonrpc: '2.0',
        id,
        result: { tools: this.getToolsList() }
      };
    }

    if (method === 'tools/call') {
      try {
        const result = await this.executeTool(params?.name, params?.arguments || {});
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
          }
        };
      } catch (err: any) {
        return {
          jsonrpc: '2.0',
          id,
          error: { code: -32000, message: err.message }
        };
      }
    }

    return {
      jsonrpc: '2.0',
      id,
      error: { code: -32601, message: `Method ${method} not found` }
    };
  }

  public startStdio(): void {
    process.stdin.setEncoding('utf-8');
    let buffer = '';

    process.stdin.on('data', async (chunk) => {
      buffer += chunk;
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const req = JSON.parse(line.trim());
          const resp = await this.handleMessage(req);
          process.stdout.write(JSON.stringify(resp) + '\n');
        } catch (e: any) {
          process.stdout.write(JSON.stringify({
            jsonrpc: '2.0',
            id: null,
            error: { code: -32700, message: 'Parse error', data: e.message }
          }) + '\n');
        }
      }
    });
  }
}
