// LICENSE : MIT
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _powerAssertRecorder = function () { function PowerAssertRecorder() { this.captured = []; } PowerAssertRecorder.prototype._capt = function _capt(value, espath) { this.captured.push({ value: value, espath: espath }); return value; }; PowerAssertRecorder.prototype._expr = function _expr(value, source) { var capturedValues = this.captured; this.captured = []; return { powerAssertContext: { value: value, events: capturedValues }, source: source }; }; return PowerAssertRecorder; }(),
    _powerAssertVisitorKeys = '{"ArrayExpression":["elements"],"AssignmentExpression":["left","right"],"BinaryExpression":["left","right"],"Directive":["value"],"DirectiveLiteral":[],"BlockStatement":["directives","body"],"BreakStatement":["label"],"CallExpression":["callee","arguments"],"CatchClause":["param","body"],"ConditionalExpression":["test","consequent","alternate"],"ContinueStatement":["label"],"DebuggerStatement":[],"DoWhileStatement":["test","body"],"EmptyStatement":[],"ExpressionStatement":["expression"],"File":["program"],"ForInStatement":["left","right","body"],"ForStatement":["init","test","update","body"],"FunctionDeclaration":["id","params","body","returnType","typeParameters"],"FunctionExpression":["id","params","body","returnType","typeParameters"],"Identifier":["typeAnnotation"],"IfStatement":["test","consequent","alternate"],"LabeledStatement":["label","body"],"StringLiteral":[],"NumericLiteral":[],"NullLiteral":[],"BooleanLiteral":[],"RegExpLiteral":[],"LogicalExpression":["left","right"],"MemberExpression":["object","property"],"NewExpression":["callee","arguments"],"Program":["directives","body"],"ObjectExpression":["properties"],"ObjectMethod":["key","params","body","decorators","returnType","typeParameters"],"ObjectProperty":["key","value","decorators"],"RestElement":["argument","typeAnnotation"],"ReturnStatement":["argument"],"SequenceExpression":["expressions"],"SwitchCase":["test","consequent"],"SwitchStatement":["discriminant","cases"],"ThisExpression":[],"ThrowStatement":["argument"],"TryStatement":["block","handler","finalizer"],"UnaryExpression":["argument"],"UpdateExpression":["argument"],"VariableDeclaration":["declarations"],"VariableDeclarator":["id","init"],"WhileStatement":["test","body"],"WithStatement":["object","body"],"AssignmentPattern":["left","right"],"ArrayPattern":["elements","typeAnnotation"],"ArrowFunctionExpression":["params","body","returnType","typeParameters"],"ClassBody":["body"],"ClassDeclaration":["id","body","superClass","mixins","typeParameters","superTypeParameters","implements","decorators"],"ClassExpression":["id","body","superClass","mixins","typeParameters","superTypeParameters","implements","decorators"],"ExportAllDeclaration":["source"],"ExportDefaultDeclaration":["declaration"],"ExportNamedDeclaration":["declaration","specifiers","source"],"ExportSpecifier":["local","exported"],"ForOfStatement":["left","right","body"],"ImportDeclaration":["specifiers","source"],"ImportDefaultSpecifier":["local"],"ImportNamespaceSpecifier":["local"],"ImportSpecifier":["local","imported"],"MetaProperty":["meta","property"],"ClassMethod":["key","params","body","decorators","returnType","typeParameters"],"ObjectPattern":["properties","typeAnnotation"],"SpreadElement":["argument"],"Super":[],"TaggedTemplateExpression":["tag","quasi"],"TemplateElement":[],"TemplateLiteral":["quasis","expressions"],"YieldExpression":["argument"],"AnyTypeAnnotation":[],"ArrayTypeAnnotation":["elementType"],"BooleanTypeAnnotation":[],"BooleanLiteralTypeAnnotation":[],"NullLiteralTypeAnnotation":[],"ClassImplements":["id","typeParameters"],"ClassProperty":["key","value","typeAnnotation","decorators"],"DeclareClass":["id","typeParameters","extends","body"],"DeclareFunction":["id"],"DeclareInterface":["id","typeParameters","extends","body"],"DeclareModule":["id","body"],"DeclareModuleExports":["typeAnnotation"],"DeclareTypeAlias":["id","typeParameters","right"],"DeclareOpaqueType":["id","typeParameters","supertype"],"DeclareVariable":["id"],"DeclareExportDeclaration":["declaration","specifiers","source"],"ExistentialTypeParam":[],"FunctionTypeAnnotation":["typeParameters","params","rest","returnType"],"FunctionTypeParam":["name","typeAnnotation"],"GenericTypeAnnotation":["id","typeParameters"],"InterfaceExtends":["id","typeParameters"],"InterfaceDeclaration":["id","typeParameters","extends","body"],"IntersectionTypeAnnotation":["types"],"MixedTypeAnnotation":[],"EmptyTypeAnnotation":[],"NullableTypeAnnotation":["typeAnnotation"],"NumericLiteralTypeAnnotation":[],"NumberTypeAnnotation":[],"StringLiteralTypeAnnotation":[],"StringTypeAnnotation":[],"ThisTypeAnnotation":[],"TupleTypeAnnotation":["types"],"TypeofTypeAnnotation":["argument"],"TypeAlias":["id","typeParameters","right"],"OpaqueType":["id","typeParameters","impltype","supertype"],"TypeAnnotation":["typeAnnotation"],"TypeCastExpression":["expression","typeAnnotation"],"TypeParameter":["bound"],"TypeParameterDeclaration":["params"],"TypeParameterInstantiation":["params"],"ObjectTypeAnnotation":["properties","indexers","callProperties"],"ObjectTypeCallProperty":["value"],"ObjectTypeIndexer":["id","key","value"],"ObjectTypeProperty":["key","value"],"ObjectTypeSpreadProperty":["argument"],"QualifiedTypeIdentifier":["id","qualification"],"UnionTypeAnnotation":["types"],"VoidTypeAnnotation":[],"JSXAttribute":["name","value"],"JSXClosingElement":["name"],"JSXElement":["openingElement","children","closingElement"],"JSXEmptyExpression":[],"JSXExpressionContainer":["expression"],"JSXSpreadChild":["expression"],"JSXIdentifier":[],"JSXMemberExpression":["object","property"],"JSXNamespacedName":["namespace","name"],"JSXOpeningElement":["name","attributes"],"JSXSpreadAttribute":["argument"],"JSXText":[],"Noop":[],"ParenthesizedExpression":["expression"],"AwaitExpression":["argument"],"ForAwaitStatement":["left","right","body"],"BindExpression":["object","callee"],"Import":[],"Decorator":["expression"],"DoExpression":["body"],"ExportDefaultSpecifier":["exported"],"ExportNamespaceSpecifier":["exported"],"RestProperty":["argument"],"SpreadProperty":["argument"]}';

exports.parseLine = parseLine;
exports.parseText = parseText;

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _mapping = require('./mapping');

var _parserUtils = require('./parser-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * parse a line.
 * @param {Line} line - line to parse
 * @return {[TxtNode]} TxtNodes
 */
function parseLine(line) {
  if (line.isComment) {
    return [(0, _parserUtils.createCommentNodeFromLine)(line)];
  }

  return parseText(line.text, (0, _parserUtils.contextFromLine)(line));
}

var InlineParsers = {
  // text tags
  bou: inlineTextTagParser(_mapping.Syntax.Bouten),
  ami: inlineTextTagParser(_mapping.Syntax.Amikake),
  u: inlineTextTagParser(_mapping.Syntax.Underline),
  b: inlineTextTagParser(_mapping.Syntax.Bold),
  i: inlineTextTagParser(_mapping.Syntax.Italic),
  strong: inlineTextTagParser(_mapping.Syntax.Strong),
  em: inlineTextTagParser(_mapping.Syntax.Emphasis),
  tt: inlineTextTagParser(_mapping.Syntax.Teletype),
  tti: inlineTextTagParser(_mapping.Syntax.TeletypeItalic),
  ttb: inlineTextTagParser(_mapping.Syntax.TeletypeBold),
  tcy: inlineTextTagParser(_mapping.Syntax.TateChuYoko),

  // partially text tags
  kw: parseKeywordTag,
  ruby: parseRubyTag,
  href: parseHrefTag,

  // non-text tags
  chap: inlineNonTextTagParser(_mapping.Syntax.Reference),
  title: inlineNonTextTagParser(_mapping.Syntax.Reference),
  chapref: inlineNonTextTagParser(_mapping.Syntax.Reference),
  list: inlineNonTextTagParser(_mapping.Syntax.Reference),
  img: inlineNonTextTagParser(_mapping.Syntax.Reference),
  table: inlineNonTextTagParser(_mapping.Syntax.Reference),
  hd: inlineNonTextTagParser(_mapping.Syntax.Reference),
  column: inlineNonTextTagParser(_mapping.Syntax.Reference),
  fn: inlineNonTextTagParser(_mapping.Syntax.Reference),

  code: withValue(inlineNonTextTagParser(_mapping.Syntax.Code)),
  comment: withValue(inlineNonTextTagParser(_mapping.Syntax.Comment)),
  uchar: inlineNonTextTagParser(_mapping.Syntax.UnicodeChar),
  br: inlineNonTextTagParser(_mapping.Syntax.Break),
  icon: inlineNonTextTagParser(_mapping.Syntax.Icon),
  m: inlineNonTextTagParser(_mapping.Syntax.Math),
  raw: inlineNonTextTagParser(_mapping.Syntax.Raw)
};

/**
 * get new inline tag parser to get value attribute.
 * @param {function} inlineParser - Parser function of a inline tag
 * @return {function} parser function
 */
function withValue(inlineParser) {
  return function (tag, context) {
    var node = inlineParser(tag, context);
    node.value = (0, _parserUtils.unescapeValue)(tag.content.raw, context);
    return node;
  };
}

/**
 * get non-text tag parser function.
 * @param {string} type - type of tag
 * @return {function} parser function
 */
function inlineNonTextTagParser(type) {
  return function (tag, context) {
    return parseInlineNonTextTag(type, tag, context);
  };
}

/**
 * get text tag parser function.
 * @param {string} type - type of tag
 * @return {function} parser function
 */
function inlineTextTagParser(type) {
  return function (tag, context) {
    return parseInlineTextTag(type, tag, context);
  };
}

/**
 * parse non-text tag, which has no child.
 * @param {string} type - type of tag
 * @param {Tag} tag - tag to parse
 * @param {Context} context - context of the node
 * @return {TxtNode}
 */
function parseInlineNonTextTag(type, tag, context) {
  var node = (0, _parserUtils.createInlineNode)(type, tag.fullText, context);
  return node;
}

/**
 * parse text tag, which has child Str node.
 * @param {string} type - type of tag
 * @param {Tag} tag - tag to parse
 * @param {Context} context - context of the node
 * @return {TxtNode}
 */
function parseInlineTextTag(type, tag, context) {
  var node = (0, _parserUtils.createInlineNode)(type, tag.fullText, context);
  var strContext = (0, _parserUtils.offsetContext)(context, tag.content.index);
  var strNode = (0, _parserUtils.createStrNode)(tag.content.raw, strContext);
  node.children = [strNode];
  return node;
}

/**
 * parse @<kw>{} tag.
 * @param {Tag} tag - tag to parse
 * @param {Context} context - context of the node
 * @return {TxtNode}
 */
function parseKeywordTag(tag, context) {
  var node = (0, _parserUtils.createInlineNode)(_mapping.Syntax.Keyword, tag.fullText, context);

  var pieces = tag.content.raw.split(/\s*,\s*/, 2);
  var word = pieces[0];
  if (pieces.length === 2) {
    node.alt = pieces[1];
  }

  var strNode = (0, _parserUtils.createStrNode)(word, (0, _parserUtils.offsetContext)(context, tag.content.index));
  node.children = [strNode];

  return node;
}

/**
 * parse @<href>{} tag.
 * @param {Tag} tag - tag to parse
 * @param {Context} context - context of the node
 * @return {TxtNode}
 */
function parseHrefTag(tag, context) {
  var node = (0, _parserUtils.createInlineNode)(_mapping.Syntax.Href, tag.fullText, context);

  var pieces = tag.content.raw.split(/\s*,\s*/, 2);
  var url = pieces[0];
  var label = void 0;
  var labelOffset = void 0;
  if (pieces.length === 2) {
    var _rec = new _powerAssertRecorder();

    label = pieces[1];
    labelOffset = tag.content.index + tag.content.raw.indexOf(label, url.length);
    (0, _powerAssert2.default)(_rec._expr(_rec._capt(_rec._capt(labelOffset, 'arguments/0/left') >= _rec._capt(_rec._capt(_rec._capt(tag, 'arguments/0/right/object/object').content, 'arguments/0/right/object').index, 'arguments/0/right'), 'arguments/0'), {
      content: 'assert(labelOffset >= tag.content.index)',
      filepath: 'src/inline-parsers.js',
      line: 159
    }));
  } else {
    label = url;
    labelOffset = tag.content.index;
  }

  var strContext = (0, _parserUtils.offsetContext)(context, labelOffset);
  var strNode = (0, _parserUtils.createStrNode)(label, strContext);

  node.url = url;
  node.children = [strNode];

  return node;
}

/**
 * parse @<ruby>{} tag.
 * @param {Tag} tag - tag to parse
 * @param {Context} context - context of the node
 * @return {TxtNode}
 */
function parseRubyTag(tag, context) {
  var _rec2 = new _powerAssertRecorder();

  var node = (0, _parserUtils.createInlineNode)(_mapping.Syntax.Ruby, tag.fullText, context);
  var pieces = tag.content.raw.split(/\s*,\s*/, 2);
  (0, _powerAssert2.default)(_rec2._expr(_rec2._capt(_rec2._capt(_rec2._capt(pieces, 'arguments/0/left/object').length, 'arguments/0/left') === 2, 'arguments/0'), {
    content: 'assert(pieces.length === 2)',
    filepath: 'src/inline-parsers.js',
    line: 183
  }));
  var rubyBase = pieces[0];
  var rubyText = pieces[1];

  var strNode = (0, _parserUtils.createStrNode)(rubyBase, (0, _parserUtils.offsetContext)(context, tag.content.index));

  node.rubyText = rubyText;
  node.children = [strNode];

  return node;
}

/**
 * parse inline tags and StrNodes from line.
 * @param {string} text - Text of the line
 * @param {Context} context - context of the node
 * @return {[TxtNode]} TxtNodes in the line
 */
function parseText(text, context) {
  var _rec3 = new _powerAssertRecorder();

  (0, _powerAssert2.default)(_rec3._expr(_rec3._capt(!_rec3._capt(_rec3._capt(text, 'arguments/0/argument/callee/object').match(/[\r\n]/), 'arguments/0/argument'), 'arguments/0'), {
    content: 'assert(!text.match(/[\\r\\n]/))',
    filepath: 'src/inline-parsers.js',
    line: 202
  }));

  var nodes = [];
  var tag = void 0;
  while (tag = (0, _parserUtils.findInlineTag)(text)) {
    if (tag.precedingText !== '') {
      var node = (0, _parserUtils.createStrNode)(tag.precedingText, context);
      nodes.push(node);
      context = (0, _parserUtils.offsetContext)(context, node.raw.length);
    }

    var parser = InlineParsers[tag.name];
    if (parser) {
      var _node = parser(tag, (0, _parserUtils.contextNeedsUnescapeBraces)(context));
      nodes.push(_node);
    }

    context = (0, _parserUtils.offsetContext)(context, tag.fullText.length);
    text = tag.followingText;
  }

  if (text.length) {
    var _node2 = (0, _parserUtils.createStrNode)(text, context);
    nodes.push(_node2);
  }

  return nodes;
}
//# sourceMappingURL=inline-parsers.js.map