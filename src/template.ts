/**
 * 模版方法
 * 结构
 * 1. 抽象父类别
 * 2. 具体的实现子类
 * 
 * 如果用javascript写的话，不会提供检查的方式，如果ConcreteA没有，会顺着找到Base.prototype
 * 
 * solution
 * 1. throw error
 * 2. 鸭子类型
 * 
 * Hook:隔离变化的方式， 需要变化的地方加一个hook
 * 
 * 好莱坞原则
 * 子类放弃了对自己的控制权， 改为由父亲通知子类
 * + 发布-订阅模式
 * + 回调函数 => 通过轮训获取数据非常不理智， 所以放到callback中， 当数据返回的时候才去执行
 */

class BaseClass {
  public templateMethod(): void {
    this.actionA();
    this.actionB();
  }

  public actionA(): void {
    throw new Error('should not be invoker by BaseClass');
  };

  public actionB(): void {
    throw new Error('should not be invoker by BaseClass');
  }
}

/*抽象类 */
abstract class Base {
  public abstract actionA(): void;
  /**
   * child必须对其进行重写
   */
  public abstract actionB(): void;

  /**init*/
  public templateMethod(): void {
    this.actionA()
    this.actionB()
  }
}

class ConcreteA extends Base {
  actionA(): void {
    console.log('A take actionA')
  }

  actionB(): void {
    console.log('A take actionB')
  }
}

class ConcreteB extends Base {
  actionA(): void {
    console.log('B take actionA')
  }

  actionB(): void {
    console.log('B take actionB')
  }
}

(function main() {
  const a = new ConcreteA();
  const b = new ConcreteB();

  a.templateMethod();
  b.templateMethod();
})();