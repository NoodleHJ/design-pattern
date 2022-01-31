/**
 * 1. 并不是父子关系
 * 2. leaf操作的一致性
 * 3. 双向映射关系： 必须是严格意义上的层级结构
 * 4，子节点保持对父节点的引用
 * 优点
 * 1. 一致性的对待组合对象和基本对象， 并不需要知道这个是folder还是file
 * 2. 很好的表示对象的部分 -整体的层级结构
 */


interface ArmyObject {
  seq: string;
  operate(): void;
  parent: Team | null;

  add(newObject: ArmyObject | null): void

  remove(): void
}

class Solider implements ArmyObject {
  seq: string; 
  parent: Team | null;

  constructor(seq: string) {
    this.seq = seq
    this.parent = null
  }

  operate(): void {
      console.log(`Solider: ${this.seq}`)
  }

  add(): void {
    throw new Error("Solider cannot be adde")
  }

  remove(): void {
    if(!this.parent) {
      return
    }

    const removeIdex = this.parent.soldiers.findIndex(a => a.seq === this.seq)

    if(removeIdex === -1) {
      console.log("cannot find soilder in the parent")
    } else {
      this.parent.soldiers.splice(removeIdex, 1)
    }
  }
}

class Team implements ArmyObject {
  seq: string;
  parent: Team | null;
  soldiers: ArmyObject[];

  constructor(seq: string) {
    this.seq = seq
    this.soldiers = []
    this.parent = null
  }


  add(newSoldier: ArmyObject){
    const idx = this.soldiers.findIndex(a => a.seq === newSoldier.seq)

    if(idx === -1) {
      newSoldier.parent = this
      this.soldiers.push(newSoldier)
    } else {
      console.log("already exists")
    }
  }

  remove(){
    if(!this.parent) {
      return
    } else {
      const removeIdx = this.soldiers.findIndex(a => a.seq === this.seq)

      if(removeIdx === -1) {
        console.log("cannot find team in the current team")
      } else {
        this.soldiers.splice(removeIdx, 1)
      }
    }
  }

  operate(): void {
    this.soldiers.map(s => s.operate())
  }
}