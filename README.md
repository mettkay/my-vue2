# 学习 vue2 源码

## 模板编译

1. 流程：初始化数据 》 模板编译成 ast 语法树 》 变成 render() 》 生成虚拟 dom 》 变成真实 dom 》挂载到 el
2. 模板编译 先找 render > template > el 里面的元素

## 数据劫持

1. 通过 object.defineProperty 遍历,递归 实现数据劫持
2. 数组通过重写数组原型方法实现数据劫持

## 生命周期

1. 与 vue.mixin() 注入的全局属性合并  options:{data:[] , created:[]}
2. 通过 callHook 在不同时机触发
