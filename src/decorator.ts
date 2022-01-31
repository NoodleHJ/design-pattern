/**
 * 在不改变原函数的情况下 添加新的功能
 * 
 * eg1:
 * var _onload = window.onload || function(){}
 * 
 * window.onload = function{
 *  _onload()
 *  alert(2)
 * }
 * 
 * eg2: re
 * 
 * document._getElementById = document.getElementById; 
 * 
 * document.geElementById = function(){
 *  alert(2)
 *  return document._getElementById.apply(document, arguments)
 * }
 * 
 * 应用场景 AOP
 */

interface Coffee {
  cost(): Number;
}

class GeneralCoffee implements Coffee {
  cost(): Number {
    return 10;
  }
}

class CoffeeExtraDecorator implements Coffee {
  private _coffee: Coffee;

  constructor(coffee: GeneralCoffee) {
    this._coffee = coffee;
  }

  cost(): Number {
    return this._coffee.cost();
  }
}