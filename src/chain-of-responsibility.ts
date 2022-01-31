/**
 * 用AOP的方式也在Function.prototype.after
 * 
 * 一系列的处理请求传递
 * 如果A不行 传给B, 如果B不行 传递给A
 */
class Handler {
  private _successor: Handler;

  public set successor(successor: Handler) {
    this._successor = successor
  }

  public get successor() {
    return this._successor
  }

  public handleRequest(msg: Number): void { };
}

class StepA extends Handler {
  public handleRequest(msg: Number): void {
    if (msg > 0) {
      console.log(`Hanlder A process ${msg}`);
    } else {
      this.successor.handleRequest(msg)
    }
  }
}

class StepB extends Handler {
  public handleRequest(msg: Number): void {
    if (msg > 0) {
      console.log(`Hanlder A process ${msg}`);
    } else {
      this.successor.handleRequest(msg)
    }
  }
}

(function () {
  const stepA = new StepA();
  const stepB = new StepB();

  stepA.successor = stepB

})()

const NEXT = 'next'

class Chain {
  private _successor: Chain
  private fn: () => string

  constructor(fn: () => string) {
    this.fn = fn
  }

  public setNextsuccessor(successor: Chain) {
    this._successor = successor
  }

  public passRequest() {
    const res = this.fn.apply(this, arguments)

    if (res === NEXT) {
      this.next()
    }
  }

  public next() {
    return this._successor && this._successor.passRequest.apply(this._successor, arguments)
  }
}