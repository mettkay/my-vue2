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

## 收集依赖

1. dep 收集依赖  与 data 的属性一一对应
2. dep 与 watcher 是多对多

## nextTick原理

1. 当数据数据发生变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。
2. 如果同一个 watcher 被多次触发，只会被推入到队列中一次。
3. 然后，在下一个的事件循环“tick”中，Vue 执行队列里的所有回调。
