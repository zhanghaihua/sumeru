/*
 * 测试文件描述
 * 文件命名: netMessage.js
 * 测试模块：netMessage
 * 作者：zhanghaihua@baidu.com
 * 重点说明：
 */

var assert = require("assert");

/**
 * Assert that the first two arguments are equal, with an optional message.
 * Prints out both actual and expected values.
 * @name equal
 * @function
 * @example equal( format( "Received {0} bytes.", 2), "Received 2 bytes.", "format() replaces {0} with next argument" );
 */
var equal = function( actual, expected, message ) {
	assert.equal(actual, expected);
};

/**
 * @name notEqual
 * @function
 */
var notEqual = function( actual, expected, message ) {
	//QUnit.push( expected != actual, actual, expected, message );
	assert.notEqual(actual, expected);
};

function ok(expr, msg) {
  	if (!expr) throw new Error(msg);
}


// Test for equality any JavaScript type.
// Author: Philippe Rathé <prathe@gmail.com>
sumeru.equiv = (function() {

	// Call the o related callback with the given arguments.
	function bindCallbacks( o, callbacks, args ) {
		var prop = QUnit.objectType( o );
		if ( prop ) {
			if ( QUnit.objectType( callbacks[ prop ] ) === "function" ) {
				return callbacks[ prop ].apply( callbacks, args );
			} else {
				return callbacks[ prop ]; // or undefined
			}
		}
	}

	// the real equiv function
	var innerEquiv,
		// stack to decide between skip/abort functions
		callers = [],
		// stack to avoiding loops from circular referencing
		parents = [],

		getProto = Object.getPrototypeOf || function ( obj ) {
			return obj.__proto__;
		},
		callbacks = (function () {

			// for string, boolean, number and null
			function useStrictEquality( b, a ) {
				/*jshint eqeqeq:false */
				if ( b instanceof a.constructor || a instanceof b.constructor ) {
					// to catch short annotaion VS 'new' annotation of a
					// declaration
					// e.g. var i = 1;
					// var j = new Number(1);
					return a == b;
				} else {
					return a === b;
				}
			}

			return {
				"string": useStrictEquality,
				"boolean": useStrictEquality,
				"number": useStrictEquality,
				"null": useStrictEquality,
				"undefined": useStrictEquality,

				"nan": function( b ) {
					return isNaN( b );
				},

				"date": function( b, a ) {
					return QUnit.objectType( b ) === "date" && a.valueOf() === b.valueOf();
				},

				"regexp": function( b, a ) {
					return QUnit.objectType( b ) === "regexp" &&
						// the regex itself
						a.source === b.source &&
						// and its modifers
						a.global === b.global &&
						// (gmi) ...
						a.ignoreCase === b.ignoreCase &&
						a.multiline === b.multiline &&
						a.sticky === b.sticky;
				},

				// - skip when the property is a method of an instance (OOP)
				// - abort otherwise,
				// initial === would have catch identical references anyway
				"function": function() {
					var caller = callers[callers.length - 1];
					return caller !== Object && typeof caller !== "undefined";
				},

				"array": function( b, a ) {
					var i, j, len, loop;

					// b could be an object literal here
					if ( QUnit.objectType( b ) !== "array" ) {
						return false;
					}

					len = a.length;
					if ( len !== b.length ) {
						// safe and faster
						return false;
					}

					// track reference to avoid circular references
					parents.push( a );
					for ( i = 0; i < len; i++ ) {
						loop = false;
						for ( j = 0; j < parents.length; j++ ) {
							if ( parents[j] === a[i] ) {
								loop = true;// dont rewalk array
							}
						}
						if ( !loop && !innerEquiv(a[i], b[i]) ) {
							parents.pop();
							return false;
						}
					}
					parents.pop();
					return true;
				},

				"object": function( b, a ) {
					var i, j, loop,
						// Default to true
						eq = true,
						aProperties = [],
						bProperties = [];

					// comparing constructors is more strict than using
					// instanceof
					if ( a.constructor !== b.constructor ) {
						// Allow objects with no prototype to be equivalent to
						// objects with Object as their constructor.
						if ( !(( getProto(a) === null && getProto(b) === Object.prototype ) ||
							( getProto(b) === null && getProto(a) === Object.prototype ) ) ) {
								return false;
						}
					}

					// stack constructor before traversing properties
					callers.push( a.constructor );
					// track reference to avoid circular references
					parents.push( a );

					for ( i in a ) { // be strict: don't ensures hasOwnProperty
									// and go deep
						loop = false;
						for ( j = 0; j < parents.length; j++ ) {
							if ( parents[j] === a[i] ) {
								// don't go down the same path twice
								loop = true;
							}
						}
						aProperties.push(i); // collect a's properties

						if (!loop && !innerEquiv( a[i], b[i] ) ) {
							eq = false;
							break;
						}
					}

					callers.pop(); // unstack, we are done
					parents.pop();

					for ( i in b ) {
						bProperties.push( i ); // collect b's properties
					}

					// Ensures identical properties name
					return eq && innerEquiv( aProperties.sort(), bProperties.sort() );
				}
			};
		}());

	innerEquiv = function() { // can take multiple arguments
		var args = [].slice.apply( arguments );
		if ( args.length < 2 ) {
			return true; // end transition
		}

		return (function( a, b ) {
			if ( a === b ) {
				return true; // catch the most you can
			} else if ( a === null || b === null || typeof a === "undefined" ||
					typeof b === "undefined" ||
					QUnit.objectType(a) !== QUnit.objectType(b) ) {
				return false; // don't lose time with error prone cases
			} else {
				return bindCallbacks(a, callbacks, [ b, a ]);
			}

			// apply transition with (1..n) arguments
		}( args[0], args[1] ) && arguments.callee.apply( this, args.splice(1, args.length - 1 )) );
	};

	return innerEquiv;
}());


/*
 * 测试模块说明
 */
	
describe("message", function() {
	before(function() {
		var netMessage = fw.netMessage;
	
		var testRsaOnMessage = function(msg,type,conn){
			console.log('type :' + type);
			setTimeout(function(){
				netMessage.sendMessage({a:100,b:200},'test-message',conn._sumeru_socket_id);  
				//console.log('send done!!!',conn._sumeru_socket_id);
			},10);
	    };
	    
	    var testRsaonError = function(msg,type,conn){
	    	console.log('msg :' + msg);
	    };
	    
	    var testRsaonLocalMessage = function(msg,type,conn){
	    	console.log('msg :' + msg);
	    };
	    
	    var testRsaonGlobalMessage = function(msg,type,conn){
	    	console.log('msg :' + msg);
	    };
	    
	    var testRsaonGlobalError = function(msg,type,conn){
	    	console.log('msg :' + msg);
	    };
	    
	    console.log("set test-message receiver");
	    
		netMessage.setReceiver({
	        onMessage:{target:'test-message',handle:testRsaOnMessage},
	        onError:{target:'test-message',handle:testRsaonError},
	        onLocalMessage:{target:'test-message',handle:testRsaonLocalMessage},
	        onGlobalMessage:{target:'test-message',handle:testRsaonGlobalMessage},
	        onGlobalError:{target:'test-message',handle:testRsaonGlobalError}
	    });
		
		//for test-message-2
		/* temp
		var testFilter = false;
		netMessage.addOutFilter(function(msg){
			if(msg.number == 555) {
				if (testFilter) {
					testFilter = false;
					msg.inFilter = true;
				}
			}
			return msg;
		}, 10);
		
		netMessage.addInFilter(function(msg,conn,cb){
			if(msg.number == 555) {
				if (msg.outFilter) {
					testFilter = true;
				}
			}
			return cb(msg,conn);   //下一个过滤
	    },100);*/
		
		var testOnMyData = function(msg,type,conn){
			console.log('type :' + type);
			console.log(JSON.stringify(msg));
			setTimeout(function(){
				//netMessage.sendMyData({a:100,b:200},'test-message-2',conn._sumeru_socket_id);
				netMessage.sendMyData(msg,'test-message-2',conn._sumeru_socket_id);  
			},10);
	    };
	    
		netMessage.addACL(555,"myData");
		netMessage.setReceiver({
	        onMyData:{target:'test-message-2',handle:testOnMyData}
	    });
	});
	
	/*
	 * case id: test-message-1
	 * 测试说明：测试netMessage addACL 方法
	 * 测试数据说明：
	 */
	
	it('addACL', function(){
		var netMessage = sumeru.netMessage;
		
		netMessage.addACL(1000,"testData");
	    notEqual(netMessage.sendTestData, undefined); // 增加acl的同时， 应增加对应的数据发送方法
	});

	/*
	 * case id: test-message-2
	 * 测试说明：测试netMessage sendMessage&recvMessage
	 * 测试数据说明：
	 */
	
	it('netMessage sendMessage&recvMessage', function(done){
		var netMessage = sumeru.netMessage;
		
		netMessage.setReceiver({
	        onMessage:{target:'test-message', handle: function() {
	        	//实际执行结果与预期结果比较
	        	ok( true, "true succeeds" );
	        	done();
	        }},
	    });
		
	    netMessage.sendMessage({a:100,b:200},'test-message');  
	});

	/*
	 * case id: test-message-3
	 * 测试说明：测试netMessage addInFilter&addOutFilter
	 * 测试数据说明：
	 */
	
	it('netMessage addInFilter&addOutFilter', function(done){
		var netMessage = sumeru.netMessage;
		netMessage.addACL(555,"myData");
		
		/**
	     * 附加输入输出的过滤器,从此以下的代码， 都应附加target，并在输出的时候增加 out = true，输入的时候同时检测该标记,证明回传时会携带对应标记
	     */
	    netMessage.addInFilter(function(msg, conn){
	    	if (msg.target == "test-message-2") {
	    		//ok(true , 'validata target by filter input..');
	    		//ok(msg.inFilter == true , 'validata target by filter input..');
	    		ok(msg.outFilter, 'validata target by filter input..');
	    	}
	        return msg;
	    });
	    
	    netMessage.addOutFilter(function(msg){
	        if (msg.target == "test-message-2") {
	        	msg.outFilter = true;
	        }
	        return msg;
	    });
	    
	    
		netMessage.setReceiver({
	        onMyData:{target:'test-message-2', handle: function(data, type) {
	        	//实际执行结果与预期结果比较
	        	ok( true, "true succeeds" );
	        	//deepEqual(data, {a:100,b:200}, "receive data ok");
	        	done();
	        }},
	    });
		
	    netMessage.sendMyData({a:100,b:200},'test-message-2');  
	});

});


