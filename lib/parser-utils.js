// LICENSE : MIT
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _powerAssertRecorder = function () { function PowerAssertRecorder() { this.captured = []; } PowerAssertRecorder.prototype._capt = function _capt(value, espath) { this.captured.push({ value: value, espath: espath }); return value; }; PowerAssertRecorder.prototype._expr = function _expr(value, source) { var capturedValues = this.captured; this.captured = []; return { powerAssertContext: { value: value, events: capturedValues }, source: source }; }; return PowerAssertRecorder; }(),
    _powerAssertVisitorKeys = '{"ArrayExpression":["elements"],"AssignmentExpression":["left","right"],"BinaryExpression":["left","right"],"Directive":["value"],"DirectiveLiteral":[],"BlockStatement":["directives","body"],"BreakStatement":["label"],"CallExpression":["callee","arguments"],"CatchClause":["param","body"],"ConditionalExpression":["test","consequent","alternate"],"ContinueStatement":["label"],"DebuggerStatement":[],"DoWhileStatement":["test","body"],"EmptyStatement":[],"ExpressionStatement":["expression"],"File":["program"],"ForInStatement":["left","right","body"],"ForStatement":["init","test","update","body"],"FunctionDeclaration":["id","params","body","returnType","typeParameters"],"FunctionExpression":["id","params","body","returnType","typeParameters"],"Identifier":["typeAnnotation"],"IfStatement":["test","consequent","alternate"],"LabeledStatement":["label","body"],"StringLiteral":[],"NumericLiteral":[],"NullLiteral":[],"BooleanLiteral":[],"RegExpLiteral":[],"LogicalExpression":["left","right"],"MemberExpression":["object","property"],"NewExpression":["callee","arguments"],"Program":["directives","body"],"ObjectExpression":["properties"],"ObjectMethod":["key","params","body","decorators","returnType","typeParameters"],"ObjectProperty":["key","value","decorators"],"RestElement":["argument","typeAnnotation"],"ReturnStatement":["argument"],"SequenceExpression":["expressions"],"SwitchCase":["test","consequent"],"SwitchStatement":["discriminant","cases"],"ThisExpression":[],"ThrowStatement":["argument"],"TryStatement":["block","handler","finalizer"],"UnaryExpression":["argument"],"UpdateExpression":["argument"],"VariableDeclaration":["declarations"],"VariableDeclarator":["id","init"],"WhileStatement":["test","body"],"WithStatement":["object","body"],"AssignmentPattern":["left","right"],"ArrayPattern":["elements","typeAnnotation"],"ArrowFunctionExpression":["params","body","returnType","typeParameters"],"ClassBody":["body"],"ClassDeclaration":["id","body","superClass","mixins","typeParameters","superTypeParameters","implements","decorators"],"ClassExpression":["id","body","superClass","mixins","typeParameters","superTypeParameters","implements","decorators"],"ExportAllDeclaration":["source"],"ExportDefaultDeclaration":["declaration"],"ExportNamedDeclaration":["declaration","specifiers","source"],"ExportSpecifier":["local","exported"],"ForOfStatement":["left","right","body"],"ImportDeclaration":["specifiers","source"],"ImportDefaultSpecifier":["local"],"ImportNamespaceSpecifier":["local"],"ImportSpecifier":["local","imported"],"MetaProperty":["meta","property"],"ClassMethod":["key","params","body","decorators","returnType","typeParameters"],"ObjectPattern":["properties","typeAnnotation"],"SpreadElement":["argument"],"Super":[],"TaggedTemplateExpression":["tag","quasi"],"TemplateElement":[],"TemplateLiteral":["quasis","expressions"],"YieldExpression":["argument"],"AnyTypeAnnotation":[],"ArrayTypeAnnotation":["elementType"],"BooleanTypeAnnotation":[],"BooleanLiteralTypeAnnotation":[],"NullLiteralTypeAnnotation":[],"ClassImplements":["id","typeParameters"],"ClassProperty":["key","value","typeAnnotation","decorators"],"DeclareClass":["id","typeParameters","extends","body"],"DeclareFunction":["id"],"DeclareInterface":["id","typeParameters","extends","body"],"DeclareModule":["id","body"],"DeclareModuleExports":["typeAnnotation"],"DeclareTypeAlias":["id","typeParameters","right"],"DeclareOpaqueType":["id","typeParameters","supertype"],"DeclareVariable":["id"],"DeclareExportDeclaration":["declaration","specifiers","source"],"ExistentialTypeParam":[],"FunctionTypeAnnotation":["typeParameters","params","rest","returnType"],"FunctionTypeParam":["name","typeAnnotation"],"GenericTypeAnnotation":["id","typeParameters"],"InterfaceExtends":["id","typeParameters"],"InterfaceDeclaration":["id","typeParameters","extends","body"],"IntersectionTypeAnnotation":["types"],"MixedTypeAnnotation":[],"EmptyTypeAnnotation":[],"NullableTypeAnnotation":["typeAnnotation"],"NumericLiteralTypeAnnotation":[],"NumberTypeAnnotation":[],"StringLiteralTypeAnnotation":[],"StringTypeAnnotation":[],"ThisTypeAnnotation":[],"TupleTypeAnnotation":["types"],"TypeofTypeAnnotation":["argument"],"TypeAlias":["id","typeParameters","right"],"OpaqueType":["id","typeParameters","impltype","supertype"],"TypeAnnotation":["typeAnnotation"],"TypeCastExpression":["expression","typeAnnotation"],"TypeParameter":["bound"],"TypeParameterDeclaration":["params"],"TypeParameterInstantiation":["params"],"ObjectTypeAnnotation":["properties","indexers","callProperties"],"ObjectTypeCallProperty":["value"],"ObjectTypeIndexer":["id","key","value"],"ObjectTypeProperty":["key","value"],"ObjectTypeSpreadProperty":["argument"],"QualifiedTypeIdentifier":["id","qualification"],"UnionTypeAnnotation":["types"],"VoidTypeAnnotation":[],"JSXAttribute":["name","value"],"JSXClosingElement":["name"],"JSXElement":["openingElement","children","closingElement"],"JSXEmptyExpression":[],"JSXExpressionContainer":["expression"],"JSXSpreadChild":["expression"],"JSXIdentifier":[],"JSXMemberExpression":["object","property"],"JSXNamespacedName":["namespace","name"],"JSXOpeningElement":["name","attributes"],"JSXSpreadAttribute":["argument"],"JSXText":[],"Noop":[],"ParenthesizedExpression":["expression"],"AwaitExpression":["argument"],"ForAwaitStatement":["left","right","body"],"BindExpression":["object","callee"],"Import":[],"Decorator":["expression"],"DoExpression":["body"],"ExportDefaultSpecifier":["exported"],"ExportNamespaceSpecifier":["exported"],"RestProperty":["argument"],"SpreadProperty":["argument"]}';

exports.parseBlockArgs = parseBlockArgs;
exports.findInlineTag = findInlineTag;
exports.createNodeFromChunk = createNodeFromChunk;
exports.createNodeFromLinesInChunk = createNodeFromLinesInChunk;
exports.createNodeFromLine = createNodeFromLine;
exports.createCommentNodeFromLine = createCommentNodeFromLine;
exports.createStrNode = createStrNode;
exports.unescapeValue = unescapeValue;
exports.createInlineNode = createInlineNode;
exports.contextFromLine = contextFromLine;
exports.offsetContext = offsetContext;
exports.contextNeedsUnescapeBraces = contextNeedsUnescapeBraces;
exports.contextNeedsUnescapeBrackets = contextNeedsUnescapeBrackets;

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _mapping = require('./mapping');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * parse arguments of a block like "[foo][This is foo]".
 * @param {string} argsText - String to parse
 * @param {number} offset - Offset index where the args starts with in the line
 * @return {[Arg]} Array of Args
 */
function parseBlockArgs(argsText, offset) {
  var argRegex = /\[(.*?)\]/g;
  var args = [];

  var openIndex = 0;
  while (argsText[openIndex] === '[') {
    var closeIndex = findCloseBracket(argsText, ']', openIndex);

    args.push({
      value: argsText.slice(openIndex + 1, closeIndex),
      startColumn: offset + openIndex + 1
    });

    openIndex = closeIndex + 1;
  }

  return args;
}

/**
 * find inline tag from text
 * @param {string} text - Text to parse
 * @return {Tag} the first Tag object if inline tag found, otherwise null
 */
function findInlineTag(text) {
  var match = text.match(/@<(\w+)>\{/);
  if (!match) {
    return null; // inline tag not found
  }

  // We need to ignore escaped closing brace \}.
  // As look-behind expression is relatively new, use indexOf()
  var contentStartIndex = match.index + match[0].length;
  var closeIndex = findCloseBracket(text, '}', contentStartIndex);
  if (closeIndex < 0) {
    return null; // not found
  }

  var contentCloseIndex = closeIndex - 1;
  var rawContent = text.substr(contentStartIndex, contentCloseIndex - contentStartIndex + 1);
  var tag = {
    name: match[1],
    content: {
      raw: rawContent,
      index: contentStartIndex - match.index
    },
    fullText: text.substr(match.index, closeIndex - match.index + 1),
    precedingText: text.substr(0, match.index),
    followingText: text.substr(closeIndex + 1)
  };

  return tag;
}

function findCloseBracket(text, character) {
  var fromIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var closeIndex = void 0;
  while (true) {
    closeIndex = text.indexOf(character, fromIndex);
    if (closeIndex < 0) {
      break; // closing } not found. this is normal string not a inline tag
    }

    if (text[closeIndex - 1] !== '\\') {
      break; // found closing } which is not escaped
    }

    fromIndex = closeIndex + 1;
  }

  return closeIndex;
}

/**
 * create TxtNode from chunk.
 * @param {Chunk} chunk - A chunk
 * @param {string} [type=chunk.type] - Type of node
 * @return {TxtNode} Created TxtNode
 */
function createNodeFromChunk(chunk, type) {
  type = type || _mapping.Syntax[chunk.type];
  return createNodeFromLinesInChunk(type, chunk.lines, chunk);
}

/**
 * create TxtNode from lines in a chunk.
 * @param {string} type - Type of node
 * @param {[Line]} lines - lines in a chunk
 * @param {Chunk} chunk - A chunk
 * @return {TxtNode} Created TxtNode
 */
function createNodeFromLinesInChunk(type, lines, chunk) {
  var firstLine = lines[0];
  var lastLine = lines[lines.length - 1];
  var chunkStartIndex = chunk.lines[0].startIndex;
  var startIndex = firstLine.startIndex;
  var endIndex = lastLine.startIndex + lastLine.text.length;
  var text = chunk.raw.slice(startIndex - chunkStartIndex, endIndex - chunkStartIndex);

  return {
    type: type,
    raw: text,
    range: [startIndex, endIndex],
    loc: {
      start: {
        line: firstLine.lineNumber,
        column: 0
      },
      end: {
        line: lastLine.lineNumber,
        column: lastLine.text.length
      }
    }
  };
}

/**
 * create TxtNode from single line.
 * @param {Line} line - A line
 * @param {string} type - Type of node
 * @return {TxtNode} Created TxtNode
 */
function createNodeFromLine(type, line) {
  var _rec = new _powerAssertRecorder();

  (0, _powerAssert2.default)(_rec._expr(_rec._capt(!_rec._capt(_rec._capt(line, 'arguments/0/argument/object').isComment, 'arguments/0/argument'), 'arguments/0'), {
    content: 'assert(!line.isComment)',
    filepath: 'src/parser-utils.js',
    line: 134
  }));
  return createInlineNode(type, line.text, contextFromLine(line));
}

/**
 * create comment TxtNode from single line.
 * @param {Line} line - A line
 * @return {TxtNode} Created TxtNode
 */
function createCommentNodeFromLine(line) {
  var _rec2 = new _powerAssertRecorder();

  (0, _powerAssert2.default)(_rec2._expr(_rec2._capt(_rec2._capt(line, 'arguments/0/object').isComment, 'arguments/0'), {
    content: 'assert(line.isComment)',
    filepath: 'src/parser-utils.js',
    line: 144
  }));
  var node = createInlineNode(_mapping.Syntax.Comment, line.text, contextFromLine(line));
  var match = void 0;
  if (match = line.text.match(/^#@#\s*(.*)/)) {
    node.value = match[1];
  } else if (match = line.text.match(/^#@warn\((.*)\)/)) {
    node.value = match[1];
  } else {
    node.value = line.text;
  }

  return node;
}

/**
 * create Str TxtNode.
 * @param {string} raw - Raw text of node
 * @param {Context} context - context of the node
 * @return {TxtNode} Created TxtNode
 */
function createStrNode(raw, context) {
  var node = createInlineNode(_mapping.Syntax.Str, raw, context);
  node.value = unescapeValue(raw, context);
  return node;
}

/**
 * unescape value considering context
 * @param {string} value - Value to unescape
 * @param {Context} context - context of unescape
 * @return {string} Unescaped value
 */
function unescapeValue(value, context) {
  if (context.unescapeBraces) {
    value = value.replace(/\\\}/g, '}');
  }

  if (context.unescapeBrackets) {
    value = value.replace(/\\\]/g, ']');
  }

  return value;
}

/**
 * create inline TxtNode.
 * @param {string} type - Type of node
 * @param {string} raw - Raw text of node
 * @param {Context} context - context of the node
 * @return {TxtNode} Created TxtNode
 */
function createInlineNode(type, raw, context) {
  var _rec3 = new _powerAssertRecorder();

  (0, _powerAssert2.default)(_rec3._expr(_rec3._capt(!_rec3._capt(_rec3._capt(raw, 'arguments/0/argument/callee/object').match(/[\r\n]/), 'arguments/0/argument'), 'arguments/0'), {
    content: 'assert(!raw.match(/[\\r\\n]/))',
    filepath: 'src/parser-utils.js',
    line: 196
  }));

  return {
    type: type,
    raw: raw,
    range: [context.startIndex, context.startIndex + raw.length],
    loc: {
      start: {
        line: context.lineNumber,
        column: context.startColumn
      },
      end: {
        line: context.lineNumber,
        column: context.startColumn + raw.length
      }
    }
  };
}

/**
 * create context from Line.
 * @param {Line} line - Line object
 * @param {number} [offset=0] - Column offset
 * @return {Context} Created Context object
 */
function contextFromLine(line) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return {
    startIndex: line.startIndex + offset,
    lineNumber: line.lineNumber,
    startColumn: offset
  };
}

/**
 * create new context with offset from original context.
 * @param {Context} originalContext - Original Context object
 * @param {number} offset - Column offset
 * @return {Context} New Context object
 */
function offsetContext(originalContext, offset) {
  var newContext = Object.assign({}, originalContext);
  newContext.startIndex += offset;
  newContext.startColumn += offset;
  return newContext;
}

/**
 * create new context with unescapeBraces = true.
 * @param {Context} originalContext - Original Context object
 * @return {Context} New Context object
 */
function contextNeedsUnescapeBraces(originalContext) {
  var newContext = Object.assign({}, originalContext);
  newContext.unescapeBraces = true;
  return newContext;
}

/**
 * create new context with unescapeBrackets = true.
 * @param {Context} originalContext - Original Context object
 * @return {Context} New Context object
 */
function contextNeedsUnescapeBrackets(originalContext) {
  var newContext = Object.assign({}, originalContext);
  newContext.unescapeBrackets = true;
  return newContext;
}
//# sourceMappingURL=parser-utils.js.map