学习vue2源码

## 模板编译

1.流程：初始化数据 》 模板编译成ast语法树 》 变成render() 》 生成虚拟dom 》 变成真实dom 》挂载到el
2.模板编译 先找 render > template > el里面的元素
## 数据劫持

1.通过 object.defineProperty 遍历,递归 实现数据劫持
2.数组通过重写数组原型方法实现数据劫持
