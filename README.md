#Essential [Riot](https://muut.com/riotjs/)

> A minimal skeleton for building testable Riot apps using ES7 async function

[![Build Status](https://travis-ci.org/jcouyang/essential-riot.svg)](https://travis-ci.org/jcouyang/essential-riot)

## start
1. `npm start`
2. open http://localhost:5555
3. login with username `oyang` and password `lulu`

## test
`npm test`

## Howdy, async function, Bye, Flux
```js
async function(){
  var todo = await db.getItems();
  this.title = todo.title
  this.items = todo.items;
  this.update();
})
```

* http://git.io/js-csp
* http://blog.oyanglul.us/javascript/clojure-core.async-essence-in-native-javascript.html
* http://swannodette.github.io/2013/08/24/es6-generators-and-csp
* http://talks.golang.org/2012/concurrency.slide
* http://wiki.ecmascript.org/doku.php?id=strawman:async_functions
* http://taskjs.org/
* http://sweetjs.org/
