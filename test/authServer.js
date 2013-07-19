/*
 * �����ļ�����
 * �ļ�����: authServer.js
 * ����ģ�飺authServer
 * ���ߣ�zhanghaihua@baidu.com
 * �ص�˵����
 * Keeping Tests Atomic
 */

var expect = require("chai").expect;
var run = require('./support/sumeru.js');
var fw = run.fw;

/*
 * env SUMERU_COVΪ�棬ͳ�Ƹ����ʣ����ñ�instrumented�Ĵ���
 */
var libpath = process.env.SUMERU_COV ? '../sumeru-cov/src' : '../sumeru/src';
var libserverpath = process.env.SUMERU_COV ? './sumeru-cov/server' : '../sumeru/server';

/*
 * ���Զ����ļ�
 */

describe('authServer', function () {
	before(function( done ){
    	fw.sumeruReady( function (dbready) {
    		done();
    	});
  	});
  
  /*describe("#checkLogin", function () {
    it("����û�����״̬", function (done) {
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
