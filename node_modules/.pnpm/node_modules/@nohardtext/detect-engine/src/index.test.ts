import { describe, expect, it } from 'vitest';
import { detect } from './index';
import type { Rule } from '@nohardtext/rule-engine';

describe('@nohardtext/detect-engine', () => {
  it('runs rules through the detect pipeline', () => {
    const rule: Rule = {
      id: 'NHT1001',
      name: 'JSX Text',
      run: () => [{
        id: 'finding-1',
        ruleId: 'NHT1001',
        severity: 'high',
        category: 'localization',
        message: 'Hardcoded text found.',
        explanation: 'Move user-facing text to localization files.',
        location: {
          filePath: 'src/App.tsx',
          startLine: 1,
          startColumn: 1,
          endLine: 1,
          endColumn: 10
        },
        fixable: true,
        suggestions: [{ message: 'Extract to translation key.' }]
      }]
    };

    const result = detect({
      filePath: 'src/App.tsx',
      sourceText: '<h1>Welcome</h1>',
      rules: [rule]
    });

    expect(result.filePath).toBe('src/App.tsx');
    expect(result.findings).toHaveLength(1);
  });
});
