// LICENSE : MIT
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reviewToAst = require('./review-to-ast');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReVIEWProcessor = function () {
  function ReVIEWProcessor(config) {
    _classCallCheck(this, ReVIEWProcessor);

    this.config = config;
  }

  _createClass(ReVIEWProcessor, [{
    key: 'processor',
    value: function processor(ext) {
      return {
        preProcess: function preProcess(text, filePath) {
          return (0, _reviewToAst.parse)(text);
        },
        postProcess: function postProcess(messages, filePath) {
          return {
            messages: messages,
            filePath: filePath ? filePath : '<text>'
          };
        }
      };
    }
  }], [{
    key: 'availableExtensions',
    value: function availableExtensions() {
      return ['.re'];
    }
  }]);

  return ReVIEWProcessor;
}();

exports.default = ReVIEWProcessor;
//# sourceMappingURL=ReVIEWProcessor.js.map