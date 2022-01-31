/**
 * 其实就是相当于发布订阅机制
 */

interface Mediator {
  send(msg: string, sender: Sender): void
}

class Sender {
  public mediator: Mediator
  public name: string

  constructor(mediator: Mediator, name: string) {
    this.mediator = mediator
    this.name = name
  }

  send(msg: string) {
    this.mediator.send(msg, this)
  }

  // recieve messag might trigger a function controlled by mediator
  receive(msg: string) {
    console.log(this.name, "receive", msg)
  }
}

class MediatorA implements Mediator {
  public A: Sender
  public B: Sender
  send(msg: string, sender: Sender): void {
    if (sender === this.A) {
      this.B.receive(msg)
    }
    if (sender === this.B) {
      this.A.receive(msg)
    }
  }
}

(function(){
  const mediator = new MediatorA()
  const a = new Sender(mediator, 'a')
  const b = new Sender(mediator, 'b')

  mediator.A = a
  mediator.B = b
  
  a.send('A send')
  b.send('B send')
})()