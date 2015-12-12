# Async-tiny

## A very tiny helper for working with Promise-workflow

---------------------------------------------

## Installation
    npm: npm i -D async-tiny
    github: git clone https://github.com/rain84/async-tiny.git


---------------------------------------------

Methods : 
    1. async(fn)
    2. syncArray([fn1, fn2, fn3, ...])      


---------------------------------------------

function fn(defer) {
    ....some cool asynchronous code stuff, then
    
    defer.resolve();
     or
    defer.reject();
}


---------------------------------------------

Examples
  1. async(fn)
    
        var asyncTiny = require( 'async-tiny' );
        
        
        function someAsyncFn( defer ) {
            setTimeout( function () {
                console.log( 'asyncFn stuff' );
                defer.resolve();
            }, 1000 );
        }
        
        
        asyncTiny
            .async( someAsyncFn )()
            .then( function () {
                console.log( 'asyncFn done' );
            } )
        ;
    
    
  2. syncArray([fn1, fn2, fn3, ...])    

        var asyncTiny = require( 'async-tiny' );
        
        
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
        
        function asyncTask3( defer ) {
            setTimeout( function () {
                console.log( 'asyncTask3' );
                defer.resolve();
            }, 250 );
        }
        
        var tasks = [asyncTask1, asyncTask2, asyncTask3,];
        
        
        asyncTiny.syncArray( tasks )
            .then( function () { console.log( 'asyncTasks done' );} )
        ;
        
