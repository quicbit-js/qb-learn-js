// Symbols are simple identifiers supported in several languages
//
//    https://en.wikipedia.org/wiki/Symbol_(programming)
//
// They are basically unique integers that are used
// to add and fetch private information to/from objects.
// You can think of them as a bit like non-enumerable
// properties, but one level more hidden.
//
// Knowing how Symbols work is an important step towards
// understanding how javascript really works.
//

var fns = require('./tutorial-fns')
var section = fns.section
var log = fns.log
var loge = fns.logexec
var logr = fns.logr
var proto = fns.proto

log(`
Start with an empty object - with no prototype, and confirm it has
no properties or symbols:
`)
loge(`{__proto__: null}`)
loge(`Object.getOwnPropertyNames({__proto__: null})`)
loge(`Object.getOwnPropertySymbols({__proto__: null})`)


log(`
Compare that with prototype:`)

loge(`{}.__proto__`)
loge(`Object.getOwnPropertyNames(Date.prototype)`)
loge(`Object.getOwnPropertySymbols(Date.prototype)`)

log(`
log(Symbol.toStringTag)
`)
log(Symbol.toStringTag)

log(`

Defined a symbol property:

> var q = {__proto__: null}               
> Object.defineProperty(q, Symbol.toStringTag, { __proto__: null, get: function toStringTag() { return 'I_AM_Q_SYM!' } } )
`)
var q = {__proto__: null}               // see object-prototypes-2.js for more about prototypes
Object.defineProperty(q, Symbol.toStringTag, { __proto__: null, get: function toStringTag() { return 'I_AM_Q_SYM!' } } )


log(`
And it does not show up as a property:
> log(Object.getOwnPropertyNames(q))`)

log(Object.getOwnPropertyNames(q))

log(`

... It's listed as a symbol 
> log(Object.getOwnPropertySymbols(q))`)
log('>', Object.getOwnPropertySymbols(q))


log(`

... and accessed by that symbol:
> q[Object.getOwnPropertySymbols(q)[0]]()`)
log('>', q[Object.getOwnPropertySymbols(q)[0]])

