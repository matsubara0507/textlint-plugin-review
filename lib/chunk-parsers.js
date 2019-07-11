// LICENSE : MIT
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChunkParsers = undefined;

var _powerAssertRecorder = function () { function PowerAssertRecorder() { this.captured = []; } PowerAssertRecorder.prototype._capt = function _capt(value, espath) { this.captured.push({ value: value, espath: espath }); return value; }; PowerAssertRecorder.prototype._expr = function _expr(value, source) { var capturedValues = this.captured; this.captured = []; return { powerAssertContext: { value: value, events: capturedValues }, source: source }; }; return PowerAssertRecorder; }(),
    _powerAssertVisitorKeys = '{"ArrayExpression":["elements"],"AssignmentExpression":["left","right"],"BinaryExpression":["left","right"],"Directive":["value"],"DirectiveLiteral":[],"BlockStatement":["directives","body"],"BreakStatement":["label"],"CallExpression":["callee","arguments"],"CatchClause":["param","body"],"ConditionalExpression":["test","consequent","alternate"],"ContinueStatement":["label"],"DebuggerStatement":[],"DoWhileStatement":["test","body"],"EmptyStatement":[],"ExpressionStatement":["expression"],"File":["program"],"ForInStatement":["left","right","body"],"ForStatement":["init","test","update","body"],"FunctionDeclaration":["id","params","body","returnType","typeParameters"],"FunctionExpression":["id","params","body","returnType","typeParameters"],"Identifier":["typeAnnotation"],"IfStatement":["test","consequent","alternate"],"LabeledStatement":["label","body"],"StringLiteral":[],"NumericLiteral":[],"NullLiteral":[],"BooleanLiteral":[],"RegExpLiteral":[],"LogicalExpression":["left","right"],"MemberExpression":["object","property"],"NewExpression":["callee","arguments"],"Program":["directives","body"],"ObjectExpression":["properties"],"ObjectMethod":["key","params","body","decorators","returnType","typeParameters"],"ObjectProperty":["key","value","decorators"],"RestElement":["argument","typeAnnotation"],"ReturnStatement":["argument"],"SequenceExpression":["expressions"],"SwitchCase":["test","consequent"],"SwitchStatement":["discriminant","cases"],"ThisExpression":[],"ThrowStatement":["argument"],"TryStatement":["block","handler","finalizer"],"UnaryExpression":["argument"],"UpdateExpression":["argument"],"VariableDeclaration":["declarations"],"VariableDeclarator":["id","init"],"WhileStatement":["test","body"],"WithStatement":["object","body"],"AssignmentPattern":["left","right"],"ArrayPattern":["elements","typeAnnotation"],"ArrowFunctionExpression":["params","body","returnType","typeParameters"],"ClassBody":["body"],"ClassDeclaration":["id","body","superClass","mixins","typeParameters","superTypeParameters","implements","decorators"],"ClassExpression":["id","body","superClass","mixins","typeParameters","superTypeParameters","implements","decorators"],"ExportAllDeclaration":["source"],"ExportDefaultDeclaration":["declaration"],"ExportNamedDeclaration":["declaration","specifiers","source"],"ExportSpecifier":["local","exported"],"ForOfStatement":["left","right","body"],"ImportDeclaration":["specifiers","source"],"ImportDefaultSpecifier":["local"],"ImportNamespaceSpecifier":["local"],"ImportSpecifier":["local","imported"],"MetaProperty":["meta","property"],"ClassMethod":["key","params","body","decorators","returnType","typeParameters"],"ObjectPattern":["properties","typeAnnotation"],"SpreadElement":["argument"],"Super":[],"TaggedTemplateExpression":["tag","quasi"],"TemplateElement":[],"TemplateLiteral":["quasis","expressions"],"YieldExpression":["argument"],"AnyTypeAnnotation":[],"ArrayTypeAnnotation":["elementType"],"BooleanTypeAnnotation":[],"BooleanLiteralTypeAnnotation":[],"NullLiteralTypeAnnotation":[],"ClassImplements":["id","typeParameters"],"ClassProperty":["key","value","typeAnnotation","decorators"],"DeclareClass":["id","typeParameters","extends","body"],"DeclareFunction":["id"],"DeclareInterface":["id","typeParameters","extends","body"],"DeclareModule":["id","body"],"DeclareModuleExports":["typeAnnotation"],"DeclareTypeAlias":["id","typeParameters","right"],"DeclareOpaqueType":["id","typeParameters","supertype"],"DeclareVariable":["id"],"DeclareExportDeclaration":["declaration","specifiers","source"],"ExistentialTypeParam":[],"FunctionTypeAnnotation":["typeParameters","params","rest","returnType"],"FunctionTypeParam":["name","typeAnnotation"],"GenericTypeAnnotation":["id","typeParameters"],"InterfaceExtends":["id","typeParameters"],"InterfaceDeclaration":["id","typeParameters","extends","body"],"IntersectionTypeAnnotation":["types"],"MixedTypeAnnotation":[],"EmptyTypeAnnotation":[],"NullableTypeAnnotation":["typeAnnotation"],"NumericLiteralTypeAnnotation":[],"NumberTypeAnnotation":[],"StringLiteralTypeAnnotation":[],"StringTypeAnnotation":[],"ThisTypeAnnotation":[],"TupleTypeAnnotation":["types"],"TypeofTypeAnnotation":["argument"],"TypeAlias":["id","typeParameters","right"],"OpaqueType":["id","typeParameters","impltype","supertype"],"TypeAnnotation":["typeAnnotation"],"TypeCastExpression":["expression","typeAnnotation"],"TypeParameter":["bound"],"TypeParameterDeclaration":["params"],"TypeParameterInstantiation":["params"],"ObjectTypeAnnotation":["properties","indexers","callProperties"],"ObjectTypeCallProperty":["value"],"ObjectTypeIndexer":["id","key","value"],"ObjectTypeProperty":["key","value"],"ObjectTypeSpreadProperty":["argument"],"QualifiedTypeIdentifier":["id","qualification"],"UnionTypeAnnotation":["types"],"VoidTypeAnnotation":[],"JSXAttribute":["name","value"],"JSXClosingElement":["name"],"JSXElement":["openingElement","children","closingElement"],"JSXEmptyExpression":[],"JSXExpressionContainer":["expression"],"JSXSpreadChild":["expression"],"JSXIdentifier":[],"JSXMemberExpression":["object","property"],"JSXNamespacedName":["namespace","name"],"JSXOpeningElement":["name","attributes"],"JSXSpreadAttribute":["argument"],"JSXText":[],"Noop":[],"ParenthesizedExpression":["expression"],"AwaitExpression":["argument"],"ForAwaitStatement":["left","right","body"],"BindExpression":["object","callee"],"Import":[],"Decorator":["expression"],"DoExpression":["body"],"ExportDefaultSpecifier":["exported"],"ExportNamespaceSpecifier":["exported"],"RestProperty":["argument"],"SpreadProperty":["argument"]}';

exports.parseParagraph = parseParagraph;
exports.parseHeading = parseHeading;
exports.parseList = parseList;
exports.parseBlock = parseBlock;
exports.parseComment = parseComment;

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _mapping = require('./mapping');

var _blockParsers = require('./block-parsers');

var _inlineParsers = require('./inline-parsers');

var _parserUtils = require('./parser-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChunkParsers = exports.ChunkParsers = {
  Paragraph: parseParagraph,
  Heading: parseHeading,
  UnorderedList: function UnorderedList(chunk) {
    return parseList(/^\s+\*+\s+/, chunk);
  },
  OrderedList: function OrderedList(chunk) {
    return parseList(/^\s+\d+\.\s+/, chunk);
  },
  DefinitionList: function DefinitionList(chunk) {
    return parseList(/^(\s+:\s+|\s+)/, chunk);
  },
  Block: parseBlock,
  Comment: parseComment
};

/**
 * parse paragraph chunk.
 * @param {Chunk} chunk - Chunk to parse
 * @return {TxtNode} Paragraph node
 */
function parseParagraph(chunk) {
  var node = (0, _parserUtils.createNodeFromChunk)(chunk);
  node.children = [];
  chunk.lines.forEach(function (line) {
    Array.prototype.push.apply(node.children, (0, _inlineParsers.parseLine)(line));
  });
  return node;
}

/**
 * parse heading chunk.
 * @param {Chunk} chunk - Chunk to parse
 * @return {TxtNode} Heading node
 */
function parseHeading(chunk) {
  var _rec = new _powerAssertRecorder(),
      _rec2 = new _powerAssertRecorder();

  (0, _powerAssert2.default)(_rec._expr(_rec._capt(_rec._capt(_rec._capt(_rec._capt(chunk, 'arguments/0/left/object/object').lines, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
    content: 'assert(chunk.lines.length === 1)',
    filepath: 'src/chunk-parsers.js',
    line: 42
  }));
  var line = chunk.lines[0];
  var match = line.text.match(/(=+)\S*\s*(.*)/); // \S* skip [column] and {ch01}
  var depth = match[1].length;
  var label = match[2].trim();
  var labelOffset = line.text.indexOf(label);
  (0, _powerAssert2.default)(_rec2._expr(_rec2._capt(_rec2._capt(labelOffset, 'arguments/0/left') >= 0, 'arguments/0'), {
    content: 'assert(labelOffset >= 0)',
    filepath: 'src/chunk-parsers.js',
    line: 48
  }));
  var strNode = (0, _parserUtils.createStrNode)(label, (0, _parserUtils.contextFromLine)(line, labelOffset));
  var heading = (0, _parserUtils.createNodeFromLine)(_mapping.Syntax.Heading, line);
  heading.depth = depth;
  heading.label = label;
  heading.children = [strNode];

  return heading;
}

/**
 * parse list chunk.
 * @param {Chunk} chunk - Chunk to parse
 * @return {TxtNode} Block node
 */
function parseList(prefixRegex, chunk) {
  var node = (0, _parserUtils.createNodeFromChunk)(chunk);
  node.children = [];
  chunk.lines.forEach(function (line) {
    if (line.isComment) {
      node.children.push((0, _parserUtils.createCommentNodeFromLine)(line));
      return;
    }

    var itemNode = (0, _parserUtils.createNodeFromLine)(_mapping.Syntax.ListItem, line);
    itemNode.children = [];
    var itemText = line.text.replace(prefixRegex, '');
    var startColumn = line.text.length - itemText.length;
    Array.prototype.push.apply(itemNode.children, (0, _inlineParsers.parseText)(itemText, (0, _parserUtils.contextFromLine)(line, startColumn)));

    node.children.push(itemNode);
  });
  return node;
}

/**
 * parse block chunk.
 * @param {Chunk} chunk - Chunk to parse
 * @return {TxtNode} Block node
 */
function parseBlock(chunk) {
  var line = chunk.lines[0];
  var match = line.text.match(/^\/\/(\w+)(.*)\{?$/);
  var block = {
    name: match[1],
    args: (0, _parserUtils.parseBlockArgs)(match[2], 2 + match[1].length),
    chunk: chunk
  };
  var parser = _blockParsers.BlockParsers[block.name];

  if (!parser) {
    return null;
  }

  return parser(block);
}

/**
 * parse comment chunk.
 * @param {Chunk} chunk - Chunk to parse
 * @return {TxtNode}  node
 */
function parseComment(chunk) {
  var _rec3 = new _powerAssertRecorder();

  (0, _powerAssert2.default)(_rec3._expr(_rec3._capt(_rec3._capt(_rec3._capt(_rec3._capt(chunk, 'arguments/0/left/object/object').lines, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
    content: 'assert(chunk.lines.length === 1)',
    filepath: 'src/chunk-parsers.js',
    line: 112
  }));
  var node = (0, _parserUtils.createCommentNodeFromLine)(chunk.lines[0]);

  return node;
}
//# sourceMappingURL=chunk-parsers.js.map