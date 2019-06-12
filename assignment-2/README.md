# Assignment 2

We need to create a memoizer / cache with the following signature:

```
// cache :: String -> Future e Result
```
, where

```
// Result :: {value: String, hit: Boolean}
// e :: String
```

That is, our cache is a function with a string key and a [Future](https://github.com/fluture-js/Fluture) return value resolving to a ```Result``` type or an error ```e``` type. The ```Result```  member ```hit``` is ```true``` if the value was retrieved from cache and ```false``` if not.

Cache test is performed solely using the string parameter. In case of a cache miss, the cache performs a function returning a Future. In case of a cache hit, the cache returns an already resolved future with the previously resolved value. We assume that the internal function producing the Future is always resolved instantly.

Your goal is to write a set of runnable tests for the yet unwritten cache. You may use any approach / technology / sourcery but the end result, sources and auxiliaries included, should be production level and in working order.

The results will be verified by running the following commands:

```
npm install
npm run test
```
