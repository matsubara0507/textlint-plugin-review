// LICENSE : MIT
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _powerAssertRecorder = function () { function PowerAssertRecorder() { this.captured = []; } PowerAssertRecorder.prototype._capt = function _capt(value, espath) { this.captured.push({ value: value, espath: espath }); return value; }; PowerAssertRecorder.prototype._expr = function _expr(value, source) { var capturedValues = this.captured; this.captured = []; return { powerAssertContext: { value: value, events: capturedValues }, source: source }; }; return PowerAssertRecorder; }(),
    _powerAssertVisitorKeys = '{"ArrayExpression":["elements"],"AssignmentExpression":["left","right"],"BinaryExpression":["left","right"],"Directive":["value"],"DirectiveLiteral":[],"BlockStatement":["directives","body"],"BreakStatement":["label"],"CallExpression":["callee","arguments"],"CatchClause":["param","body"],"ConditionalExpression":["test","consequent","alternate"],"ContinueStatement":["label"],"DebuggerStatement":[],"DoWhileStatement":["test","body"],"EmptyStatement":[],"ExpressionStatement":["expression"],"File":["program"],"ForInStatement":["left","right","body"],"ForStatement":["init","test","update","body"],"FunctionDeclaration":["id","params","body","returnType","typeParameters"],"FunctionExpression":["id","params","body","returnType","typeParameters"],"Identifier":["typeAnnotation"],"IfStatement":["test","consequent","alternate"],"LabeledStatement":["label","body"],"StringLiteral":[],"NumericLiteral":[],"NullLiteral":[],"BooleanLiteral":[],"RegExpLiteral":[],"LogicalExpression":["left","right"],"MemberExpression":["object","property"],"NewExpression":["callee","arguments"],"Program":["directives","body"],"ObjectExpression":["properties"],"ObjectMethod":["key","params","body","decorators","returnType","typeParameters"],"ObjectProperty":["key","value","decorators"],"RestElement":["argument","typeAnnotation"],"ReturnStatement":["argument"],"SequenceExpression":["expressions"],"SwitchCase":["test","consequent"],"SwitchStatement":["discriminant","cases"],"ThisExpression":[],"ThrowStatement":["argument"],"TryStatement":["block","handler","finalizer"],"UnaryExpression":["argument"],"UpdateExpression":["argument"],"VariableDeclaration":["declarations"],"VariableDeclarator":["id","init"],"WhileStatement":["test","body"],"WithStatement":["object","body"],"AssignmentPattern":["left","right"],"ArrayPattern":["elements","typeAnnotation"],"ArrowFunctionExpression":["params","body","returnType","typeParameters"],"ClassBody":["body"],"ClassDeclaration":["id","body","superClass","mixins","typeParameters","superTypeParameters","implements","decorators"],"ClassExpression":["id","body","superClass","mixins","typeParameters","superTypeParameters","implements","decorators"],"ExportAllDeclaration":["source"],"ExportDefaultDeclaration":["declaration"],"ExportNamedDeclaration":["declaration","specifiers","source"],"ExportSpecifier":["local","exported"],"ForOfStatement":["left","right","body"],"ImportDeclaration":["specifiers","source"],"ImportDefaultSpecifier":["local"],"ImportNamespaceSpecifier":["local"],"ImportSpecifier":["local","imported"],"MetaProperty":["meta","property"],"ClassMethod":["key","params","body","decorators","returnType","typeParameters"],"ObjectPattern":["properties","typeAnnotation"],"SpreadElement":["argument"],"Super":[],"TaggedTemplateExpression":["tag","quasi"],"TemplateElement":[],"TemplateLiteral":["quasis","expressions"],"YieldExpression":["argument"],"AnyTypeAnnotation":[],"ArrayTypeAnnotation":["elementType"],"BooleanTypeAnnotation":[],"BooleanLiteralTypeAnnotation":[],"NullLiteralTypeAnnotation":[],"ClassImplements":["id","typeParameters"],"ClassProperty":["key","value","typeAnnotation","decorators"],"DeclareClass":["id","typeParameters","extends","body"],"DeclareFunction":["id"],"DeclareInterface":["id","typeParameters","extends","body"],"DeclareModule":["id","body"],"DeclareModuleExports":["typeAnnotation"],"DeclareTypeAlias":["id","typeParameters","right"],"DeclareOpaqueType":["id","typeParameters","supertype"],"DeclareVariable":["id"],"DeclareExportDeclaration":["declaration","specifiers","source"],"ExistentialTypeParam":[],"FunctionTypeAnnotation":["typeParameters","params","rest","returnType"],"FunctionTypeParam":["name","typeAnnotation"],"GenericTypeAnnotation":["id","typeParameters"],"InterfaceExtends":["id","typeParameters"],"InterfaceDeclaration":["id","typeParameters","extends","body"],"IntersectionTypeAnnotation":["types"],"MixedTypeAnnotation":[],"EmptyTypeAnnotation":[],"NullableTypeAnnotation":["typeAnnotation"],"NumericLiteralTypeAnnotation":[],"NumberTypeAnnotation":[],"StringLiteralTypeAnnotation":[],"StringTypeAnnotation":[],"ThisTypeAnnotation":[],"TupleTypeAnnotation":["types"],"TypeofTypeAnnotation":["argument"],"TypeAlias":["id","typeParameters","right"],"OpaqueType":["id","typeParameters","impltype","supertype"],"TypeAnnotation":["typeAnnotation"],"TypeCastExpression":["expression","typeAnnotation"],"TypeParameter":["bound"],"TypeParameterDeclaration":["params"],"TypeParameterInstantiation":["params"],"ObjectTypeAnnotation":["properties","indexers","callProperties"],"ObjectTypeCallProperty":["value"],"ObjectTypeIndexer":["id","key","value"],"ObjectTypeProperty":["key","value"],"ObjectTypeSpreadProperty":["argument"],"QualifiedTypeIdentifier":["id","qualification"],"UnionTypeAnnotation":["types"],"VoidTypeAnnotation":[],"JSXAttribute":["name","value"],"JSXClosingElement":["name"],"JSXElement":["openingElement","children","closingElement"],"JSXEmptyExpression":[],"JSXExpressionContainer":["expression"],"JSXSpreadChild":["expression"],"JSXIdentifier":[],"JSXMemberExpression":["object","property"],"JSXNamespacedName":["namespace","name"],"JSXOpeningElement":["name","attributes"],"JSXSpreadAttribute":["argument"],"JSXText":[],"Noop":[],"ParenthesizedExpression":["expression"],"AwaitExpression":["argument"],"ForAwaitStatement":["left","right","body"],"BindExpression":["object","callee"],"Import":[],"Decorator":["expression"],"DoExpression":["body"],"ExportDefaultSpecifier":["exported"],"ExportNamespaceSpecifier":["exported"],"RestProperty":["argument"],"SpreadProperty":["argument"]}';

exports.parse = parse;

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _astTraverse = require('@textlint/ast-traverse');

var _astTester = require('@textlint/ast-tester');

var _mapping = require('./mapping');

var _chunker = require('./chunker');

var _chunkParsers = require('./chunk-parsers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * parse text and return ast mapped location info.
 * @param {string} text
 * @return {TxtNode}
 */
function parse(text) {
  var lines = text.match(/(?:.*\r?\n|.+$)/g); // split lines preserving line endings
  var chunks = (0, _chunker.parseAsChunks)(text);
  var nodes = [];
  chunks.forEach(function (chunk) {
    var parser = _chunkParsers.ChunkParsers[chunk.type];
    var node = parser(chunk);
    if (node !== null) {
      nodes.push(node);
    }
  });

  var ast = {
    type: _mapping.Syntax.Document,
    raw: text,
    range: [0, text.length],
    loc: {
      start: {
        line: 1,
        column: 0
      },
      end: {
        line: lines.length,
        column: lines[lines.length - 1].length
      }
    },
    children: nodes
  };

  validateAST(ast, text, lines);

  return ast;
}

function validateAST(ast, text, lines) {
  (0, _astTester.test)(ast);

  var prevNode = ast;
  (0, _astTraverse.traverse)(ast, {
    enter: function enter(node) {
      try {
        var _rec = new _powerAssertRecorder();

        (0, _powerAssert2.default)(_rec._expr(_rec._capt(_rec._capt(_rec._capt(node, 'arguments/0/left/object').raw, 'arguments/0/left') === _rec._capt(_rec._capt(text, 'arguments/0/right/callee/object').slice(_rec._capt(_rec._capt(_rec._capt(node, 'arguments/0/right/arguments/0/object/object').range, 'arguments/0/right/arguments/0/object')[0], 'arguments/0/right/arguments/0'), _rec._capt(_rec._capt(_rec._capt(node, 'arguments/0/right/arguments/1/object/object').range, 'arguments/0/right/arguments/1/object')[1], 'arguments/0/right/arguments/1')), 'arguments/0/right'), 'arguments/0'), {
          content: 'assert(node.raw === text.slice(node.range[0], node.range[1]))',
          filepath: 'src/review-to-ast.js',
          line: 56
        }));

        if (node.loc.start.line === node.loc.end.line) {
          var _rec2 = new _powerAssertRecorder();

          // single line
          var line = lines[node.loc.start.line - 1];
          (0, _powerAssert2.default)(_rec2._expr(_rec2._capt(_rec2._capt(_rec2._capt(node, 'arguments/0/left/object').raw, 'arguments/0/left') === _rec2._capt(_rec2._capt(line, 'arguments/0/right/callee/object').slice(_rec2._capt(_rec2._capt(_rec2._capt(_rec2._capt(node, 'arguments/0/right/arguments/0/object/object/object').loc, 'arguments/0/right/arguments/0/object/object').start, 'arguments/0/right/arguments/0/object').column, 'arguments/0/right/arguments/0'), _rec2._capt(_rec2._capt(_rec2._capt(_rec2._capt(node, 'arguments/0/right/arguments/1/object/object/object').loc, 'arguments/0/right/arguments/1/object/object').end, 'arguments/0/right/arguments/1/object').column, 'arguments/0/right/arguments/1')), 'arguments/0/right'), 'arguments/0'), {
            content: 'assert(node.raw === line.slice(node.loc.start.column, node.loc.end.column))',
            filepath: 'src/review-to-ast.js',
            line: 61
          }));
        } else {
          var _rec3 = new _powerAssertRecorder(),
              _rec4 = new _powerAssertRecorder();

          // multi line
          var firstLine = lines[node.loc.start.line - 1];
          (0, _powerAssert2.default)(_rec3._expr(_rec3._capt(_rec3._capt(_rec3._capt(node, 'arguments/0/callee/object/object').raw, 'arguments/0/callee/object').startsWith(_rec3._capt(_rec3._capt(firstLine, 'arguments/0/arguments/0/callee/object').substr(_rec3._capt(_rec3._capt(_rec3._capt(_rec3._capt(node, 'arguments/0/arguments/0/arguments/0/object/object/object').loc, 'arguments/0/arguments/0/arguments/0/object/object').start, 'arguments/0/arguments/0/arguments/0/object').column, 'arguments/0/arguments/0/arguments/0')), 'arguments/0/arguments/0')), 'arguments/0'), {
            content: 'assert(node.raw.startsWith(firstLine.substr(node.loc.start.column)))',
            filepath: 'src/review-to-ast.js',
            line: 65
          }));
          var lastLine = lines[node.loc.end.line - 1];
          (0, _powerAssert2.default)(_rec4._expr(_rec4._capt(_rec4._capt(_rec4._capt(node, 'arguments/0/callee/object/object').raw, 'arguments/0/callee/object').endsWith(_rec4._capt(_rec4._capt(lastLine, 'arguments/0/arguments/0/callee/object').substr(0, _rec4._capt(_rec4._capt(_rec4._capt(_rec4._capt(node, 'arguments/0/arguments/0/arguments/1/object/object/object').loc, 'arguments/0/arguments/0/arguments/1/object/object').end, 'arguments/0/arguments/0/arguments/1/object').column, 'arguments/0/arguments/0/arguments/1')), 'arguments/0/arguments/0')), 'arguments/0'), {
            content: 'assert(node.raw.endsWith(lastLine.substr(0, node.loc.end.column)))',
            filepath: 'src/review-to-ast.js',
            line: 67
          }));
        }
      } catch (ex) {
        console.log('type: %s, line: %s, column: %s', prevNode.type, prevNode.loc.start.line, prevNode.loc.start.column);
        console.log('type: %s, line: %s, column: %s', node.type, node.loc.start.line, node.loc.start.column);
        throw ex;
      }

      prevNode = node;
    }
  });
}
//# sourceMappingURL=review-to-ast.js.map