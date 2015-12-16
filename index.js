/**
 * Created by Rain Summers on 12.12.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */
'use strict';


var asyncTiny = (function () {
	function promiseWrapper( action ) {
		return this && this instanceof Promise
			? this.then( action )
			: action();
	}

	function partial( fn ) {
		var args = Array.prototype.slice.apply( arguments );
		args.shift();
		return function () { return fn.apply( null, args );};
	}

	function isArray( obj ) { return Object.prototype.toString.call( obj ) === "[object Array]"; }

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

	/**
	 *
	 * @param arg
	 * @returns {*}
	 */
	function asyncTiny( arg ) {
		return promiseWrapper.call(
			this,
			partial( isArray( arg ) ? asyncBundle : async, arg )
		);
	}

	Promise.prototype.async = asyncTiny;

	return asyncTiny;
}());


module.exports = asyncTiny;
