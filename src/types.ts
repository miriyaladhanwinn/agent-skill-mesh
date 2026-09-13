/**
 * AgentSkillMesh Type Definitions
 * Copyright (c) 2026 MRLDHANWINN. Apache-2.0 Licensed.
 */

export interface MCPTool {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, { type: string; description: string }>;
    required?: string[];
  };
  execute(args: Record<string, any>): Promise<any>;
}

export interface SecurityFinding {
  ruleId: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  file: string;
  line: number;
  message: string;
}

export interface WorktreeResult {
  branch: string;
  worktreePath: string;
  created: boolean;
}
