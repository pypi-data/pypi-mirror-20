CodeMirror.defineMode("jinja2", function(config, parserConf) {
    var keywords = ["block", "endblock", "for", "endfor", "in", "true", "false", 
                    "loop", "none", "self", "super", "if", "as", "not", "and",
                    "else", "import", "with", "without", "context", 'extends', 'macro', 'endmacro'];

    var blocks = ['block', 'for', 'if', 'import', 'with', 'macro', 'raw', 'call', 'filter'];
    // TODO raw should stop highlighting until the endraw
    var standalone = ['extends', 'import', 'else', 'elif', 'from', 'include', 'set'];
    var special = ['in', 'is', 'true', 'false', 'loop', 'none', 'self', 'super',
                   'as', 'not', 'and', 'if', 'else', 'without', 'with',
                   'context', 'ignore', 'missing', 'import'];
    // TODO list builtin filters and tests

    keywords = new RegExp("^((" + keywords.join(")|(") + "))\\b");

    function tokenBase (stream, state) {
        var ch = stream.next();
        if (ch == "{") {
            if (ch = stream.eat(/\{|%|#/)) {
                stream.eat("-");
                state.tokenize = inTag(ch);
                return "tag";
            }
        }
    }
    function inTag (close) {
        if (close == "{") {
            close = "}";
        }
        return function (stream, state) {
            var ch = stream.next();
            if ((ch == close || (ch == "-" && stream.eat(close)))
                && stream.eat("}")) {
                state.tokenize = tokenBase;
                return "tag";
            }
            if (stream.match(keywords)) {
                return "keyword";
            }
            return close == "#" ? "comment" : "string";
        };
    }
    return {
        startState: function () {
            return {tokenize: tokenBase};
        },
        token: function (stream, state) {
            return state.tokenize(stream, state);
        }
    }; 
});
