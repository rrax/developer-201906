# Assignment 0

Explain the following code in your own words; deduce and describe as much as you can.

Functions ```removeStatus```, ```dbReference``` and ```dbSet``` have the following signatures:

```
// removeStatus :: String -> Task e String
// dbSet :: Reference -> { k: v } -> Task e { k: v }
// dbReference :: String -> Reference
```

Don't hesitate to show off your markdown skills!

## Code

```javascript


const func = R.curry(
  (id, state) =>
    removeStatus(id)
    .chain(
      refId => dbSet( dbReference(refId), { state: state } )
    )
    .map(R.always(state))
);

```

## Explanation

### Shell

```javascript
const func = R.curry(
  (id, state) => ...
);
```

We are declaring a ES6 **const** which is in essence a variable-like *constant* which cannot be reassigned or redeclared. (It is not immutable however, since the contents of for example a const object can be modified.)

The name of the const is **func** and we are **assigning** a value to it, which in this case is a *function*. In other words we are defining a named function func. We will not be calling it in this example, though.

We are using the **Ramda** functional library which we have probably imported earlier in the code.

We are **currying** the function inside the parentheses. A *curried function* can be *partially applied*. We can supply any combination of arguments to the new curried function and get as a result a new function loaded with the given arguments which will then be accepting the rest of the arguments.

The function we are currying is an *anonymous* function defined by the ES6 **fat arrow** syntax. The parameters for the function are **id** and **state**. Based on later usage id is a *String*, state is not otherwise defined but it describes most likely a state.

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
* https://ramdajs.com
* https://ramdajs.com/docs/#curry
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

### What is happening

This is about *functional programming* and we seem to be defining a *pure function* which will most likely changing a state in the database and returning the state if successful. Based on the job requirements the database is most likely the NoSQL *mongoDb*.

In functional programming we are not *imperatively* giving instructions what to do we are using *declarative* coding to *express the logic of what we want to achieve*. Functional programming uses pure functions which *must depend only on their parameters* and not use any outside information. They *can not have any side effects* such as changing something in a database and *they can not modify their input*.

Since changing something in a database is very much an *impure* action the code has to be written differently for it to be functional. We can *wrap the actions* in special wrappers, mappable containers known as *functors*. We are able use the future return values of the functions in our code but We do not yet execute them here which would be impure. What we return at the end is only the *collection of pure wrapped things and functions ready to be executed*.

After all the pure logic has been compiled together we can then make an impure action of executing the definitions previously combined.

Based on the given function signatures we are using *Task* which is a Functor for *asyncronous functions*. The Task stores the actions needed and we can later use *fork* to execute the code. We need to prepare callbacks to both a success and a rejection.

* https://www.mongodb.com
* https://en.wikipedia.org/wiki/Pure_function
* https://mostly-adequate.gitbooks.io/mostly-adequate-guide/ch08.html#asynchronous-tasks

### Function contents

```javascript
    removeStatus(id)
    .chain(
      refId => dbSet( dbReference(refId), { state: state } )
    )
    .map(R.always(state))
```

**removeStatus(id)** does something that based on the name removes the status of the object defined by the id parameter. Since there is no db in the name or anything else I'm a bit confused does it operate already on the database. It returns a *Task* for the next part which in this case has a *String* with a reference id.

If there is an *error* (in this function or the next) we do not wish to *throw any errors* since we are making functional definitions. We have a *Promise-like* thing. With Task we get an error type *e* which will pass through the following actions and be handled by the *reject* part of the calling fork.

The next thing is that we **.chain** the next function to the command list. By chaining we do a *flatlist mapping* (a map followed by a join) to avoid nested Tasks. (We need a *Monad*, a pointed functor with an of method which can flatten. And *Task is such*.) We use the String given in the Task as *refId*, and probably set the state of the referenced object with the state parameter.

If everything is successful the last thing we do is that we **.map** the value we return inside the Task to be the status. If we have failed before this will not happen.

* https://mostly-adequate.gitbooks.io/mostly-adequate-guide/ch09.html#my-chain-hits-my-chest
