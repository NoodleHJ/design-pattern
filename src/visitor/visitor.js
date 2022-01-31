/**
 * More accurat exmample
 */

function Employee(salary, name) {
  this.salary = salary
  this.name = name
}

Employee.prototype = {
  getSalary: function(){
    return this.salary
  }
  setSalary: function(sal){
    this.salary = sal
  }
  accep: function(visitorFun){
    visitorFun(this)
  }
}

const jing = new Employee(1000, 'j')

function extraSalary(emp){
  emp.setSalary(emp.getSalary() * 2)
}

jing.accep(extraSalary)