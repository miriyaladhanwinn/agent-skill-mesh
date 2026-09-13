/**
 * Fast AST Symbol Finder Tool
 * Copyright (c) 2026 MRLDHANWINN. Apache-2.0 Licensed.
 */

export interface GrepMatch {
  file: string;
  line: number;
  snippet: string;
  symbol: string;
}

export class ASTGrep {
  public static findSymbols(sourceCode: string, filename: string, pattern: string): GrepMatch[] {
    const lines = sourceCode.split(/\r?\n/);
    const matches: GrepMatch[] = [];
    const lowerPattern = pattern.toLowerCase();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.toLowerCase().includes(lowerPattern)) {
        // extract symbol name
        const words = line.trim().split(/[\s(),.:;{}]+/);
        const matchWord = words.find(w => w.toLowerCase().includes(lowerPattern)) || pattern;

        matches.push({
          file: filename,
          line: i + 1,
          snippet: line.trim(),
          symbol: matchWord
        });
      }
    }

    return matches;
  }
}
