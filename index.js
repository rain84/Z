/**
 * Created by Rain Summers on 12.12.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */
'use strict';


//noinspection JSUnusedGlobalSymbols
var asyncTiny = {
	/**
	 *
	 * @param {Array}
	 * @returns {Promise}
	 */
	syncArray : function ( a ) {
		var self = this;
		return a.reduce( function ( sequence, fn ) {
			return sequence.then( function () {
				return self.async( fn )();
			} );
		}, Promise.resolve() );
	},

	/**
	 * Promise-decorator for async function
	 * @param fn
	 * @returns {Function}
	 */
	async : function ( fn ) {
		return function () {
			var defer = Promise.defer();
			fn( defer );
			return defer.promise;
		};
	}
};

//noinspection JSUnresolvedVariable
module.exports = asyncTiny;
