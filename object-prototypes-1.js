// Object Prototypes 1/3
//
// Run this script and explore it's output to learn the functions that help
// investigate objects.  See how we
// use these functions to understand objects, object properties, their prototypes
// and prototype properties.

var fns = require('./tutorial-fns')
var section = fns.section
var log = fns.log
var logr = fns.logr
var proto = fns.proto

section(`
To explore what javascript objects and prototypes are, we need a
way to inspect object properties and prototypes.  What can
we use to get started and see what we need from any object?

console.log() Object.getPrototypeOf() are a good start.  With these we
can see the 'enumerable' properties of an object:
`)

log(`> console.log( { a: 1, b: 2 } )`)
console.log( '>', { a: 1, b: 2 } )


log(`
But these don't show non-enumerable properties of an object.  The
default prototype of an object, which includes 11 non-enumerable functions,
will appear to be empty using these functions:
`)

log(`> console.log( Object.getPrototypeOf( { a: 1, b: 2 } )`)
console.log( '>', Object.getPrototypeOf( { a: 1, b: 2 } ) )

log(`
Obect.getOwnPropertyNames() in combination with Object.getOwnPropertyDescriptor()
are the way to reveal all of an 
object's immediate properties, whether
they are 'enumerable' or not:
`)

logr(`Object.getOwnPropertyNames( { a:1, b:2 } )`)
logr(`Object.getOwnPropertyDescriptor( { a:1, b:2 }, 'b' )`)
logr(`Object.getOwnPropertyNames( Object.getPrototypeOf( { a:1, b:2 } ) )`)
log(`
or
`)
logr(`Object.getOwnPropertyNames( { a:1, b:2 }.__proto__ )`)

log(`
debuggers often use the
__proto__ property to represent the prototype on an object like so:
`)

proto(`{ a:1, b:2 }`, { show_access_method: false })

log(`
However, when you see a "__proto__" looking like a property in a debug view
remember that it probably isn't a property at any level except the base object level - and
in that case, it is not a simple value property, but a pair of get/set accessor functions.
Let's use more debug output to show this:
`)

proto(`{ a:1, b:2 }`)

log(`
The 'proto' function shows us the 11 function value-properties and 1 prototype accessor which 
returns null for the prototype itself.
We will use the proto function throughout tutorials to show all the properties of 
the object and it's prototype, and how these properties are fetched.
`)

/*
OUTPUT:

 ==============================================

 To explore what javascript objects and prototypes are, we need a
 way to inspect object properties and prototypes.  What can
 we use to get started and see what we need from any object?

 console.log() Object.getPrototypeOf() are a good start.  With these we
 can see the 'enumerable' properties of an object:

 ==============================================

 > console.log( { a: 1, b: 2 } )
 > { a: 1, b: 2 }

 But these don't show non-enumerable properties of an object.  The
 default prototype of an object, which includes 11 non-enumerable functions,
 will appear to be empty using these functions:

 > console.log( Object.getPrototypeOf( { a: 1, b: 2 } )
 > {}

 Obect.getOwnPropertyNames() in combination with Object.getOwnPropertyDescriptor()
 are the way to reveal all of an
 object's immediate properties, whether
 they are 'enumerable' or not:

 > Object.getOwnPropertyNames( { a:1, b:2 } )
 >  [ 'a', 'b' ]
 > Object.getOwnPropertyDescriptor( { a:1, b:2 }, 'b' )
 >  { value: 2, writable: true, enumerable: true, configurable: true }
 > Object.getOwnPropertyNames( Object.getPrototypeOf( { a:1, b:2 } ) )
 >  [ 'constructor',
 'toString',
 'toLocaleString',
 'valueOf',
 'hasOwnProperty',
 'isPrototypeOf',
 'propertyIsEnumerable',
 '__defineGetter__',
 '__lookupGetter__',
 '__defineSetter__',
 '__lookupSetter__',
 '__proto__' ]

 or

 > Object.getOwnPropertyNames( { a:1, b:2 }.__proto__ )
 >  [ 'constructor',
 'toString',
 'toLocaleString',
 'valueOf',
 'hasOwnProperty',
 'isPrototypeOf',
 'propertyIsEnumerable',
 '__defineGetter__',
 '__lookupGetter__',
 '__defineSetter__',
 '__lookupSetter__',
 '__proto__' ]

 debuggers often use the
 __proto__ property to represent the prototype on an object like so:

 > proto( { a:1, b:2 } )
 >     <object "Object">
 >         a:                  1
 >         b:                  2
 >         __proto__:          <object>
 >             constructor:        <function "Object">
 >             toString:           <function "toString">
 >             toLocaleString:     <function "toLocaleString">
 >             valueOf:            <function "valueOf">
 >             hasOwnProperty:     <function "hasOwnProperty">
 >             isPrototypeOf:      <function "isPrototypeOf">
 >             propertyIsEnumerable: <function "propertyIsEnumerable">
 >             __defineGetter__:   <function "__defineGetter__">
 >             __lookupGetter__:   <function "__lookupGetter__">
 >             __defineSetter__:   <function "__defineSetter__">
 >             __lookupSetter__:   <function "__lookupSetter__">
 >             __proto__:          null


 However, when you see a "__proto__" looking like a property in a debug view
 remember that it probably isn't a property at any level except the base object level - and
 in that case, it is not a simple value property, but a pair of get/set accessor functions.
 Let's use more debug output to show this:

 > proto( { a:1, b:2 } )
 >     <object "Object">
 >         a:                  1                                       value
 >         b:                  2                                       value
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


 The 'proto' function shows us the 11 function value-properties and 1 prototype accessor which
 returns null for the prototype itself.
 We will use the proto function throughout tutorials to show all the properties of
 the object and it's prototype, and how these properties are fetched.

 */