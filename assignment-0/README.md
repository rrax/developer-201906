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

(enter your answer here)