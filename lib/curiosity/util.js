exports.nodeChildren = function(node) {
  switch (node.type) {
    case 'AssignmentExpression':
      return [node.right, node.left];

    case 'ArrayExpression':
      return node.elements;

    case 'BlockStatement':
    case 'Program':
      return node.body;

    case 'BinaryExpression':
      return [node.left, node.right];

    case 'CallExpression':
      return [node.callee, node.arguments];

    case 'CatchClause':
      return [node.body];

    case 'ConditionalExpression':
      return [node.consequent, node.alternate, node.test];

    case 'DoWhileStatement':
      return [node.body, node.test];

    case 'ExpressionStatement':
      return [node.expression];

    case 'ForStatement':
      return [node.body, node.init, node.test, node.update];

    case 'ForInStatement':
      return [node.left, node.right, node.body];

    case 'FunctionDeclaration':
    case 'FunctionExpression':
      return [node.body];

    case 'IfStatement':
      return [node.test, node.consequent, node.alternate];

    case 'MemberExpression':
      return [node.object, node.property];

    case 'ReturnStatement':
      return [node.argument];

    case 'SequenceExpression':
      return node.expressions;

    case 'ForInStatement':
    case 'WhileStatement':
      return [node.body, node.init, node.test, node.update];

    case 'SwitchStatement':
      return [node.cases, node.discriminant];

    case 'SwitchCase':
      return [node.consequent, node.test];

    case 'TryStatement':
      return [node.block, node.handlers, node.guardedHandlers, node.finalizer];

    case 'ObjectExpression':
      return node.properties;

    case 'NewExpression':
      return [node.callee, node.arguments];

    case 'UnaryExpression':
      return [node.argument];

    case 'UpdateExpression':
      return [node.argument];

    case 'LogicalExpression':
      return [node.left, node.right];

    case 'Property':
      return [node.key, node.value];

    case 'ThrowStatement':
      return [node.argument];

    case 'VariableDeclaration':
      return node.declarations;

    case 'VariableDeclarator':
      return [node.init];

    case 'WhileStatement':
      return [node.body, node.test];

    case 'WithStatement':
      return [node.body, node.object];

    case 'Literal':
    case 'Identifier':
    case 'ThisExpression':
    case 'EmptyStatement':
    case 'DebuggerStatement':
    case 'BreakStatement':
    case 'ContinueStatement':
    case 'LabeledStatement':
      return [];

    default:
      throw 'Unknown node type "' + node.type + '"';
  }
};
