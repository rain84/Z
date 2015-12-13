/**
 * Created by Rain Summers on 12.12.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */
'use strict';


function promiseWrapper( action ) {
	var promise = this.then ? this.then( action ) : action();
	extend( promise, asyncTiny );

	return promise;
}
function bind( fn ) {
	var args = Array.prototype.slice.apply( arguments );
	args.shift();
	return function () { return fn.apply( null, args );};
}
function extend( obj, mixin ) {
	for ( var prop in mixin ) {
		if ( mixin.hasOwnProperty( prop ) ) {
			obj[prop] = mixin[prop];
		}
	}
	return obj;
}


function asyncBundle( a ) {
	return a.reduce( function ( sequence, fn ) {
		return sequence.then( function () {
			return async( fn );
		} );
	}, Promise.resolve() );
}

/**
 * Promise-decorator for async function
 * @param fn
 * @returns {Function}
 */
function async( fn ) {
	var defer = Promise.defer();
	fn( defer );

	return defer.promise;
}

//noinspection JSUnusedGlobalSymbols
var asyncTiny = {
	asyncBundle : function ( a ) {
		return promiseWrapper.call( this, bind( asyncBundle, a ) );
	},

	async : function ( fn ) {
		return promiseWrapper.call( this, bind( async, fn ) );
	}
};
extend( Promise.prototype, asyncTiny );

//noinspection JSUnresolvedVariable
module.exports = asyncTiny;
