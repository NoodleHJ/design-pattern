/**
 * 
 */

interface ATMState {
  name: string
  withdraw(cash: number): void
}


class ATMMachine implements ATMState {
  private _hasCash: ATMHasCashState
  private _noCash: ATMNoCashState
  private _currentState: ATMState


  name: string
  cash: number
  constructor(name: string, cash: number) {
    this.name = name
    this.cash = cash
    this._hasCash = new ATMHasCashState('has', this)
    this._noCash = new ATMNoCashState('no', this)
    this._currentState = (cash > 0) ? this._hasCash : this._noCash
  }
  withdraw(cash: number): void {
    this._currentState.withdraw(cash)
  }

  public set state(val: ATMState) {
    this._currentState = val
  }
  public hasCashState() {
    return this._hasCash;
  }

  public noCashState() {
    return this._noCash;
  }
}

class ATMHasCashState implements ATMState {
  name: string
  private _machine: ATMMachine

  constructor(name: string, machine: ATMMachine) {
    this.name = name
    this._machine = machine
  }

  withdraw(cash: number): void {
    if (this._machine.cash < cash) {
      this._machine.state = this._machine.noCashState()
      return
    } else if (this._machine.cash === cash) {
      this._machine.state = this._machine.noCashState()
    };
    console.log(`${this._machine.cash} - ${cash}`);
    this._machine.cash -= cash;
  }
}


class ATMNoCashState implements ATMState {
  name: string
  private _machine: ATMMachine

  constructor(name: string, machine: ATMMachine) {
    this.name = name
    this._machine = machine
  }

  withdraw(cash: number): void {
    throw new Error('ATMMachine has no cash');
  }

}