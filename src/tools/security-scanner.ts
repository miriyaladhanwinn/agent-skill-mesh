/**
 * Static Security Rules Scanner Tool
 * Copyright (c) 2026 MRLDHANWINN. Apache-2.0 Licensed.
 */

import { SecurityFinding } from '../types.js';

export class SecurityScanner {
  private static rules = [
    {
      id: 'SEC-001',
      name: 'Dynamic Code Execution',
      regex: /\b(eval|exec|Function)\s*\(/,
      severity: 'critical' as const,
      message: 'Dangerous dynamic code evaluation construct detected.'
    },
    {
      id: 'SEC-002',
      name: 'Insecure Regular Expression',
      regex: /(?:[a-zA-Z0-9_]+\+)+\+/,
      severity: 'medium' as const,
      message: 'Catastrophic backtracking vulnerability detected in regex.'
    },
    {
      id: 'SEC-003',
      name: 'Exposed Cloud Token',
      regex: /(?:AKIA[0-9A-Z]{16}|ghp_[a-zA-Z0-9]{36}|sk-[a-zA-Z0-9]{32,})/,
      severity: 'critical' as const,
      message: 'High-entropy secret token literal detected.'
    }
  ];

  public static scan(code: string, filename: string): SecurityFinding[] {
    const findings: SecurityFinding[] = [];
    const lines = code.split(/\r?\n/);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (const rule of this.rules) {
        if (rule.regex.test(line)) {
          findings.push({
            ruleId: rule.id,
            severity: rule.severity,
            file: filename,
            line: i + 1,
            message: rule.message
          });
        }
      }
    }

    return findings;
  }
}
