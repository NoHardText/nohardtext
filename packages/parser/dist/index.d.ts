import * as _babel_parser from '@babel/parser';
import * as _babel_types from '@babel/types';

declare function parseSource(source: string): _babel_parser.ParseResult<_babel_types.File>;

export { parseSource };
