// Object Prototypes 2/3
//
// Learn how to change (or "mess with") an object's prototype and
// what happens when we do.

var fns = require('./tutorial-fns')
var section = fns.section
var log = fns.log
var logr = fns.logr
var proto = fns.proto


section(`
In object-prototypes-1, we showed that objects are normally created with 
11 function value properties in
the prototype.  Why?  What is the importance of this?  What if
we change the prototype to something else... or nothing at all?
`)

log(`
setting __proto__ to null...

> var obj = {}; 
> obj.__proto__ = null; 
> obj;`)

obj = {}; obj.__proto__ = null;
proto(obj)

log(`
We can also use an object literal to create an object without a __proto__:
`)

proto('{ __proto__: null }')

proto('{ __proto__: null }.__proto__')

log(`
So the prototype property is gone.  So calling functions like toString(), valueOf()... will 
throw error:
`)

logr(`{ __proto__: null }.toString()`)


log(
    `
So let's see what happens if we remove a prototype and add it back, and
then call toString()...

> var obj = {};
> var p = obj.__proto__;
> obj.__proto__ = null;     // remove 
> obj.__proto__ = p;        // add back
> obj.toString();
`
)

obj = {};
var obj_proto = obj.__proto__;
obj.__proto__ = null;
obj.__proto__ = obj_proto;
logr(`obj.toString()`)


log(`
How can that be?  We assigned obj.__proto__ to the same prototype.  Let's take a closer
look at the object..
`)

proto(obj)

log(`
This object looks very much like the original, but  
notice that __proto__ at the top level is simply a *value*
property, not a result of Object.getPrototypeOf(). 
 
> Object.getPrototypeOf( obj );
> ${Object.getPrototypeOf( obj )}
 
It isn't actually a prototype, it is just a property called "__proto__".  
None of its properties (functions) are in scope when accessing
the top-level object.

Why is that?  When we set the __proto__ property, it created a value property
called "__proto__ which then overshadowed the underlying prototype's 
"__proto__" accessor.

Because prototypes on objects are so fluid and can give confusing results
like we saw here, it is usually better to use Object.getPrototypeOf/setPrototypeOf
instead the __proto__ property.

That being said, nothing in javascript is certain.  The language leaves
things so open that it is always possible to 
alter the prototype environment in disastrous ways...

(note, that I don't think this power over the environment is a bad thing... 
just that with great power comes great responsibility and all that)
`)

log(`> var setPrototypeOf = Object.setPrototypeOf`)
var setPrototypeOf = Object.setPrototypeOf
Object.setPrototypeOf = function() {
    return "ha! - I'm not setin' nutin'!"
}
logr(`Object.setPrototypeOf = function(obj, proto) { return "ha! - I'm not setin' nutin'!" ) }`)

log(`
Let's try it now...
`)
logr(`Object.setPrototypeOf( {a:1}, Object.getPrototypeOf( { b: 2 } ) )`)

log(`
Poor grammar aside, that's not a good thing to do to the environment.
Let's undo that.
Luckily we saved a reference...

Object.setPrototypeOf = setPrototypeOf
`)
Object.setPrototypeOf = setPrototypeOf

proto(`Object.setPrototypeOf( { a: 1 }, { b: 2, __proto__: null } )`)
log(`
That's better.  Notice in this last statement, we also set our first raw/custom
prototype.  Pause for a moment and congratulate yourself - have a cookie.  
We covered object prototype methods and can now move on to prototype
inheritance.
`)
