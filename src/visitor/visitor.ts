/**
 * Add new function to the object wihout changing the object
 */


interface Visitable {
  accept(visitor: VisitorFunc): void
}

interface VisitorFunc {
  visitItem(item: Item): void;
}

class Item implements Visitable {
  accept(visitor: VisitorFunc): void {
      visitor.visitItem(this)
  }
}

class LogVisitor implements VisitorFunc {
  visitItem(item: Item): void {
    console.log('Log mainItem, and add new logics', item);
  }
}

