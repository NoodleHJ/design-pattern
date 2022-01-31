/**
 * reduce memory to creat a lot of objects
 * 1. 区分内部变量和外部变量
 * => 对于需要创建大量对象而言， 可以只创建一个带有内部对象的变量
 * => 用一个database来存储外部变量
 * => 当使用的时候，可以将外部变量mount到内部变量之上
 */

