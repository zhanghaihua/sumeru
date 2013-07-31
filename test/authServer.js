/*
 * 测试文件描述
 * 文件命名: authServer.js
 * 测试模块：authServer
 * 作者：zhanghaihua@baidu.com
 * 重点说明：
 * Keeping Tests Atomic
 */

var expect = require("chai").expect;
var run = require('./support/sumeru.js');
var fw = run.fw;


/*
 * 测试对象文件
 */

describe('authServer', function () {
	before(function( done ){
    	fw.sumeruReady( function (dbready) {
    		done();
    	});
  	});
  
  /*describe("#checkLogin", function () {
    it("检查用户登入状态", function (done) {
    	fw.checkLogin("abc", "aa", "rsa", function(status, info) {
    		expect(status).to.equal("0");
    		done();
    	});
    });
  });*/
  
  describe("#auth-init", function () {
    it("auth-init", function (done) {
    	var sessionId = "1";
    	var clientId = 1;
    	var passportType = "tpa";
    	var pubsub = new fw.pubsub._pubsubObject();
    	
    	pubsub.subscribe('auth-init', sessionId, clientId, passportType, function(collection){
			done();
		});
    });
  });
  
});
