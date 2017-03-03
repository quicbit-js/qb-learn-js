//
// The functions below are used to create the demo.
//
function padright(s,l,c)  { c = c || ' '; while(s.length < l) s += c; return s }
function log()            { console.log.apply(null, Array.prototype.slice.call(arguments) ) }

function section(text) {
    log('')
    log('')
    log('==============================================')
    log(text)
    log('==============================================')
    log('')
}

// return a descriptive one-line type string for a value
function typestr(v) {
    if(v === null) {
        return 'null'
    }
    switch(typeof(v)) {
        case 'function': return '<function' + ' "' + v.name + '">'
        case 'object':
            var proto = Object.getPrototypeOf(v)
            var name = proto && proto.constructor && proto.constructor.name || ''
            return '<object' + (name ? ' "' + name + '"' : '') + '>'
        default: return v + ''
    }
}

// Enumerate an objects properties with depth-first recursion over prototypes, calling:
//
//     cb(key, value, method_used, depth)
//
// for each property.
function iterate_props(v, cb, opt) {
    opt = opt || {}
    opt.max_depth = opt.max_depth || 99
    opt.proto_handling = opt.proto_handling || 'recurse'
    return _iterate_props(null, v, null, cb, opt, 0)
}

function _iterate_props(k, v, method, cb, opt, depth) {
    if(depth > opt.max_depth) {
        return
    }
    if(depth) {     // don't include top-level value
        cb(k, v, method, depth)
    }
    if(v && typeof(v) === 'object' || depth === 0 && typeof(v) === 'function') {
        Object.getOwnPropertyNames(v).forEach(function(k) {
            var desc = Object.getOwnPropertyDescriptor(v, k)
            var method = Object.keys(desc).filter((k) => k === 'get' || k === 'set' ).join('/')
            method = method ? method + ' accessor' : 'value'
            _iterate_props(k, v[k], method, cb, opt, depth + 1)
        })
        var proto = Object.getPrototypeOf(v)
        if(proto && !Object.prototype.hasOwnProperty.call(v, '__proto__')) {
            if(opt.proto_handling === 'recurse') {
                _iterate_props('__proto__', proto, 'getPrototypeOf', cb, opt, depth + 1)
            }
        }
    }
}

// Print the given object, or result of an expression.
// Include underlying __proto__ properties (recursive) in indented form
// > ...
// > ...
//
function proto(expr_or_obj, opt) {
    opt = opt || {}
    opt.show_access_method = opt.show_access_method == null ? true : opt.show_access_method
    var obj
    if(typeof(expr_or_obj) === 'string') {
        log('> proto( ' + expr_or_obj + ' )')
        obj = eval('(' + expr_or_obj + ')')
    } else {
        obj = expr_or_obj
    }

    log('>     ' + typestr(obj))
    iterate_props(obj, function(key, val, method, depth) {
        var indent = '>     ' + padright('', depth * 4)
        var keyval =  indent + padright(key + ': ', 20) + typestr(val)
        log( padright(keyval, 68) + ((opt.show_access_method && method) ? '  ' + method : '' ))
    }, opt )
    log('')
}

// execute the given expression and print both the expression and result in
// '> ....' indented form.
function logr(expr) {
    log( '> ' + expr )
    var res
    try {
        res = eval( '(' + expr + ')' )
    } catch(e) {
        res = e
    }
    log('> ', res) // handle objects without prototypes
}

module.exports = {
    proto: proto,
    logr: logr,
    log: log,
    section: section
}