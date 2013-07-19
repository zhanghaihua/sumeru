/*
 * �����ļ�����
 * �ļ�����: newPkg.js
 * ����ģ�飺newPkg
 * ���ߣ�zhanghaihua@baidu.com
 * �ص�˵����
 * Keeping Tests Atomic
 */


var expect = require("chai").expect;
var run = require('./support/sumeru.js');
fw = run.fw;

/*
 * env SUMERU_COVΪ�棬ͳ�Ƹ����ʣ����ñ�instrumented�Ĵ���
 */
var libpath = process.env.SUMERU_COV ? './sumeru-cov/src' : '../sumeru/src';


/*
 * ���Զ����ļ�
 */
//var fw = require(libpath + '/newPkg.js')();

/*
 * case id: test-newPkg-1
 * ����˵����ͬ��ʵ��
 * ��������˵����
 */

describe('newPkg', function () {
  describe("#addSubPackage", function () {
    it("����������ƿռ�", function () {
    	var a = fw.addSubPackage("abc");
    	expect(a).to.be.an.instanceof(Object);
		//expect(fw.addSubPackage("abc")).to.throwError();
    });
    
	it("should cause throw error", function () {
    	//var a = fw.addSubPackage("abc");
		//console.log(a);
		var fn = function() {
			return fw.addSubPackage("abc");
		}
    	//expect(a).to.be.an.instanceof(Object);
		expect(fn).to.throw('package ["' + 'sumeru_AppFW.abc' + '"] already exists');
    });

  });
  
  describe("#__reg", function () {
    it("��������ƿռ���ע����Դ", function () {
    	var a1 = fw.addSubPackage('a1');
		var b1 = a1.addSubPackage('b1');
 
 		// sync __reg , async __load
		fw.a1.b1.__reg('age',100,true);
		
		expect(fw.a1.b1.age).to.equal(100);
		expect(fw.a1.b1.__load("age")).to.equal(100);
    });
  });
    
    describe("#clear", function () {
    it("���ظ������ռ��µ�˽�г�Ա", function () {
    	//var root = sumeru; // ���������FW����
    	var a = fw.addSubPackage('a');
		var b = a.addSubPackage('b');
 
 		// sync __reg , async __load
		fw.a.b.__reg('age',100,true);
		
		//fw.clear();
		//expect(fw.a.b.age).to.be.an('undefined');
		expect(fw.a.b.age).to.equal(100);
		
		//console.log(root.a.b.age === 100);     // true
		//expect(fw.addSubPackage).to.be.an('undefined');
		//expect(fw.a.addSubPackage).to.be.an('undefined');
		//expect(fw.a.b.addSubPackage).to.be.an('undefined');

		//expect(a.addSubPackage).to.be.an('undefined');
		//expect(b.addSubPackage).to.be.an('undefined');
    });
    
  });
  
});
