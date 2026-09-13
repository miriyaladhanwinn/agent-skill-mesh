<div align="center">

# 🕸️ AgentSkillMesh

### High-Performance Model Context Protocol (MCP) Tool Suite & Skill Runtime
**Optimized for OpenAI Codex, ChatGPT Pro Workspace Agents, and Autonomous Coding Harnesses**

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![MCP](https://img.shields.io/badge/MCP-Standard%202.0-orange.svg)](https://modelcontextprotocol.io/)

</div>

---

## Overview

**AgentSkillMesh** provides foundational tools for AI coding agents communicating via the **Model Context Protocol (MCP)**. It equips **OpenAI Codex**, **ChatGPT Pro**, and coding harnesses with fast security static analysis, AST symbol indexing, and safe execution contexts.

## Key Capabilities

- 🛡️ **Static Security Rule Engine**: Instant linting for dynamic eval, secret leaks, and insecure regexes.
- 🔎 **AST Symbol Grep**: Sub-millisecond symbol search across large repositories without embedding overhead.
- ⚡ **Zero External Bloat**: Zero-dependency, pure ESM architecture designed for high-concurrency agent workflows.

## Quick Start

```bash
# Clone and build
git clone https://github.com/MRLDHANWINN/agent-skill-mesh.git
cd agent-skill-mesh
npm install
npm run build

# Start MCP stdio server
node dist/cli.js serve

# Scan a source file
node dist/cli.js scan ./path/to/file.js
```

## MCP Configuration

```json
{
  "mcpServers": {
    "agent-mesh": {
      "command": "node",
      "args": ["/path/to/agent-skill-mesh/dist/cli.js", "serve"]
    }
  }
}
```

## License

Licensed under the [Apache License, Version 2.0](LICENSE).  
Maintained by [@MRLDHANWINN](https://github.com/MRLDHANWINN).
