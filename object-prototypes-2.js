// Object Prototypes 2/3
//
// Run this script and explore its output to  how to change
// (a.k.a "mess with") an object's prototype and
// what happens when we do.
//
// (OUTPUT of this script is included at the bottom of the file)

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
> obj.toString();`)

obj = {};
var obj_proto = obj.__proto__;
obj.__proto__ = null;
obj.__proto__ = obj_proto;
logr(`obj.toString()`)


log(`
How can that be?  We assigned obj.__proto__ to the same prototype.  Let's take a closer
look at the object..

> proto( obj );`)

proto( obj )

log(`
The modified object above looks very much like the default object below, but  
notice that in the modified object that __proto__ at the top level is a *value*
property, not a result of Object.getPrototypeOf().
`)

proto(`{}`)

log(`
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

/*
OUTPUT:

 ==============================================

 In object-prototypes-1, we showed that objects are normally created with
 11 function value properties in
 the prototype.  Why?  What is the importance of this?  What if
 we change the prototype to something else... or nothing at all?

 ==============================================


 setting __proto__ to null...

 > var obj = {};
 > obj.__proto__ = null;
 > obj;
 >     <object>


 We can also use an object literal to create an object without a __proto__:

 > proto( { __proto__: null } )
 >     <object>

 > proto( { __proto__: null }.__proto__ )
 >     undefined


 So the prototype property is gone.  So calling functions like toString(), valueOf()... will
 throw error:

 > { __proto__: null }.toString()
 > TypeError: (intermediate value).toString is not a function
 >     at eval (eval at logr (/Users/dad/ghub/qb-learn-js/tutorial-fns.js:97:32), <anonymous>:1:22)
 >     at logr (/Users/dad/ghub/qb-learn-js/tutorial-fns.js:97:15)
 >     at Object.<anonymous> (/Users/dad/ghub/qb-learn-js/object-prototypes-2.js:46:1)
 >     at Module._compile (module.js:541:32)
 >     at Object.Module._extensions..js (module.js:550:10)
 >     at Module.load (module.js:458:32)
 >     at tryModuleLoad (module.js:417:12)
 >     at Function.Module._load (module.js:409:3)
 >     at Function.Module.runMain (module.js:575:10)
 >     at startup (node.js:160:18)

 So let's see what happens if we remove a prototype and add it back, and
 then call toString()...

 > var obj = {};
 > var p = obj.__proto__;
 > obj.__proto__ = null;     // remove
 > obj.__proto__ = p;        // add back
 > obj.toString();
 > obj.toString()
 > TypeError: obj.toString is not a function
 >     at eval (eval at logr (/Users/dad/ghub/qb-learn-js/tutorial-fns.js:97:32), <anonymous>:1:6)
 >     at logr (/Users/dad/ghub/qb-learn-js/tutorial-fns.js:97:15)
 >     at Object.<anonymous> (/Users/dad/ghub/qb-learn-js/object-prototypes-2.js:64:1)
 >     at Module._compile (module.js:541:32)
 >     at Object.Module._extensions..js (module.js:550:10)
 >     at Module.load (module.js:458:32)
 >     at tryModuleLoad (module.js:417:12)
 >     at Function.Module._load (module.js:409:3)
 >     at Function.Module.runMain (module.js:575:10)
 >     at startup (node.js:160:18)

 How can that be?  We assigned obj.__proto__ to the same prototype.  Let's take a closer
 look at the object..

 > proto( obj );
 >     <object>
 >         __proto__:          <object>                                value
 >             constructor:        <function "Object">                 value
 >             toString:           <function "toString">               value
 >             toLocaleString:     <function "toLocaleString">         value
 >             valueOf:            <function "valueOf">                value
 >             hasOwnProperty:     <function "hasOwnProperty">         value
 >             isPrototypeOf:      <function "isPrototypeOf">          value
 >             propertyIsEnumerable: <function "propertyIsEnumerable">  value
 >             __defineGetter__:   <function "__defineGetter__">       value
 >             __lookupGetter__:   <function "__lookupGetter__">       value
 >             __defineSetter__:   <function "__defineSetter__">       value
 >             __lookupSetter__:   <function "__lookupSetter__">       value
 >             __proto__:          null                                get/set accessor


 This object looks very much like the original, but
 notice that __proto__ at the top level is simply a *value*
 property, not a result of Object.getPrototypeOf().

 > proto( {} )
 >     <object "Object">
 >         __proto__:          <object>                                getPrototypeOf
 >             constructor:        <function "Object">                 value
 >             toString:           <function "toString">               value
 >             toLocaleString:     <function "toLocaleString">         value
 >             valueOf:            <function "valueOf">                value
 >             hasOwnProperty:     <function "hasOwnProperty">         value
 >             isPrototypeOf:      <function "isPrototypeOf">          value
 >             propertyIsEnumerable: <function "propertyIsEnumerable">  value
 >             __defineGetter__:   <function "__defineGetter__">       value
 >             __lookupGetter__:   <function "__lookupGetter__">       value
 >             __defineSetter__:   <function "__defineSetter__">       value
 >             __lookupSetter__:   <function "__lookupSetter__">       value
 >             __proto__:          null                                get/set accessor


 > Object.getPrototypeOf( obj );
 > null

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

 > var setPrototypeOf = Object.setPrototypeOf
 > Object.setPrototypeOf = function(obj, proto) { return "ha! - I'm not setin' nutin'!" ) }
 > SyntaxError: Unexpected token )
 >     at logr (/Users/dad/ghub/qb-learn-js/tutorial-fns.js:97:32)
 >     at Object.<anonymous> (/Users/dad/ghub/qb-learn-js/object-prototypes-2.js:112:1)
 >     at Module._compile (module.js:541:32)
 >     at Object.Module._extensions..js (module.js:550:10)
 >     at Module.load (module.js:458:32)
 >     at tryModuleLoad (module.js:417:12)
 >     at Function.Module._load (module.js:409:3)
 >     at Function.Module.runMain (module.js:575:10)
 >     at startup (node.js:160:18)
 >     at node.js:456:3

 Let's try it now...

 > Object.setPrototypeOf( {a:1}, Object.getPrototypeOf( { b: 2 } ) )
 >  ha! - I'm not setin' nutin'!

 Poor grammar aside, that's not a good thing to do to the environment.
 Let's undo that.
 Luckily we saved a reference...

 Object.setPrototypeOf = setPrototypeOf

 > proto( Object.setPrototypeOf( { a: 1 }, { b: 2, __proto__: null } ) )
 >     <object>
 >         a:                  1                                       value
 >         __proto__:          <object>                                getPrototypeOf
 >             b:                  2                                   value


 That's better.  Notice in this last statement, we also set our first raw/custom
 prototype.  Pause for a moment and congratulate yourself - have a cookie.
 We covered object prototype methods and can now move on to prototype
 inheritance.

 */