# Async-tiny

>  **_[Async-tiny](https://github.com/rain84/async-tiny)_** is a tiny helper plugin with a very simple API for working with Promise-workflow, which operates around native "Promise"-object and which can help to work with async stuff and promises in the simplier way. You should only receive "defer"-argument in your custom async functions , and invoke "resolve" or "reject" on it. For example, this plugin can be used at working with GULP-tasks with a couple of dependencies, which should be executed in a certain way.


*Issues should be reported on the async-tiny [issue tracker](https://github.com/rain84/async-tiny/issues).*

##### Your typical async-workflow will be looking like this

    async( asyncFn1 )
        .async( asyncFn2 )
        .then( ... )
        .catch( ... )
        
        .....
        
        .async( multipleAsyncTasks )
        .then( ... )
    ;

##### where "asyncFn1" and "asyncFn2" should looking like this

    function asyncFn(defer) {
        // ....some cool asynchronous code stuff....
        
        defer.resolve();
        // or   
        defer.reject();
    }

---------------------------------------------

##### Installation
    npm: npm i -D async-tiny
    github: git clone https://github.com/rain84/async-tiny.git


---------------------------------------------

##### **API**
**async(arg)**

   Param type: *Function|Array*
   
   Returns: *Promise*
   
   Wrapper for async-function or array with async-functions to work in async-workflow. If the case of array passing,  every async-function will be invoked in expected order of array.

---------------------------------------------

##### **Example**
    var async = require('async-tiny');
    
    //  Preparation of test functions
    function asyncFn1( defer ) {
    	setTimeout( function () {
    		console.log( 'asyncFn-1' );
    		defer.resolve();
    	}, 1000 );
    }
    function asyncFn2( defer ) {
    	setTimeout( function () {
    		console.log( 'asyncFn-2' );
    		defer.resolve();
    	}, 500 );
    }
    function asyncTask1( defer ) {
    	setTimeout( function () {
    		console.log( 'asyncTask1' );
    		defer.resolve();
    	}, 1000 );
    }
    function asyncTask2( defer ) {
    	setTimeout( function () {
    		console.log( 'asyncTask2' );
    		defer.resolve();
    	}, 500 );
    }
    
    
    console.log( 'Example starts' );
    
    async( asyncFn1 )
    	.catch( function ( err ) { console.log( 'asyncFn1 err. %s', err ); } )
    
    	.async( asyncFn2 )
    	.then( function () { console.log( 'async done' );} )
    
    	.async( [
    		        asyncTask1,
    		        asyncTask2,
    	        ]
    	)
    	.then( function () { console.log( 'Example done' ); } )
    ;
