// Object Prototypes 3/3
//
// Run this script and explore its output to understand
// how javascript object inheritance works
// and the differences between
// 'new' and 'Object.create'.

var fns = require('./tutorial-fns')
var section = fns.section
var log = fns.log
var logr = fns.logr
var proto = fns.proto

section(`
In object-prototypes-2, we learned about setting an object's prorotype.
Now we take a look at some different ways to create objects:
Object literals, new Object(), and Object.create().
`)

log(`
Do you see the difference between these three objects? 
`)

proto('{}')
proto('new Object()')
proto('Object.create( {} )')

log(`
The Object.create( {} ) has an extra prototype level.  
That's because Object.create() takes a prototype as input.  
So to create the same object as the literal '{}', we can use:
`)

proto( 'Object.create( {}.__proto__ )' )


section(`
Now let's take a close look at functions and the function "prototype"
property.
`)

log(`
function Moose(prop) { this[prop] = 1 }
Moose
`)
function Moose(prop) { this[prop] = 1 }
proto(Moose)

log(`
Here we see the introduction of the 'prototype' property.
It should look familiar - it's the default object __proto__
we used above.  But in the function, the 'prototype' property is
not like __proto__ at all.  It has no purpose for the function.
It is only used by the 'new' operator when creating
objects.  It\'s pretty weird to have this value on every function
in the off chance that that function will be the target of 'new'
but there you have it.
The constructor property is also strange.  It has no real purpose
but debuggers will look to it to surmise the object type name, so
it's best to have it populated with a functon with a meaningful
name.  The constructor defaults to the function that contains it
but again, it isn't actually used for anything.
So let\'s change the prototype to a bare-bones object to see how
it works with the 'new' operator...
`)
log(`obj.prototype = {a:1, b:2, __proto__: null}`)
Moose.prototype = {a:1, b:2, __proto__: null, constructor: Moose}
proto(Moose)

log(`
var moose = new Moose('I AM MOOSE!')
`)
var moose = new Moose('I AM MOOSE!')
proto(moose)

log(`
... and there we have it, the new operator set the object\'s __proto__ instance
to the \'prototype\' we set in the function.  It was simply transferred over.
The "I AM MOOSE" property was set during construction on the instance.
Remember the Moose function?

   function Moose(prop) { this[prop] = 1 }

We can see that whatever property (or function...) that we set on \'this\' is
applied to the new instance, one level above the prototype.
`)

log(`
'new' has some other weirdness to be aware of.  If the constructor function (Moose())
returns an object, then THAT object will become the instance rather than a newly created
object.  IOW, returning an old object from Moose() will cause new to not create anything
new, which is again... weird.
`)

var shared_animal = { shared_prop: '', constructor: Moose, __proto__: null }
function Animal() { return shared_animal }

Moose.prototype = new Animal()
moose1 = new Moose('I AM MOOSE!')
moose2 = new Moose('I AM MOOSE AS WELL!')
proto(moose1)
proto(moose2)

shared_animal.shared_prop = "LET US SHARE STUFF!"
log(moose1, moose1.shared_prop)
log(moose2, moose2.shared_prop)

log(`
Creating inheritance hierarchies with the 'new' operator and function prototypes
is confusing, but now that we have shown the innards, I hope it is clear.
`)

