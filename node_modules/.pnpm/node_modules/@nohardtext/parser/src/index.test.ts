import { describe, expect, it } from 'vitest';
import { parseSource } from './index';

describe('@nohardtext/parser', () => {
  it('parses TSX source', () => {
    const ast = parseSource('export default function App() { return <h1>Welcome</h1>; }');

    expect(ast.program.body.length).toBeGreaterThan(0);
  });
});
