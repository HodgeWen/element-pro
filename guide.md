# vue3快速进阶指南

## 核心功能

### 新的选项 setup, emits

``` ts
import { defineComponent } from 'vue'
export defineComponent({
  // emit: ['change'],
  // 推荐使用这个方式定义事件, 可以获得类型补全
  emits: {
    change(value: string) {
      return typeof value === 'string'
    }
  },

  // 这个函数只执行一次, 一次你可以把他当成beforeCreate来用
  // 接收两个参数 props, ctx({ slots, attrs, emit })
  setup(props, { slots, attrs, emit, expose }) {
    // 这里面拿不到this!!!
    // slots是外部传入的插槽
    // emit用来触发事件, 执行父组件定义的事件处理函数
    // attrs是父组件传入的属性但是在props中又没有定义的属性
    // expose是指定导出的实例的成员(不指定的话就是默认值)

    return {
      // 这里放上你需要暴露给模板使用的状态和函数和其他非响应式的变量
    }
  }
})

```

### 单文件组件语法糖 \<script setup\>

[查看](https://v3.cn.vuejs.org/api/sfc-script-setup.html)

### 响应式

``` ts
import { reactive, shallowReactive, ref, shallowRef, computed, watch, watchEffect } from 'vue'

// 对象响应
const person = reactive({
  name: '张三',
  age: 20,
  sex: 'male',

  // partner对象里的属性也会递归地响应(用到才响应)
  partner: {
    name: '小红',
    age: 20,
    sex: 'female'
  }
})

// 对象浅响应
const person2 = shallowReactive({
  name: '李四',
  age: 21,
  sex: 'male',

  // partner对象里的属性不是响应式数据
  partner: {
    name: '小兰',
    age: 20,
    sex: 'female'
  }
})


// 简单类型响应
// 简单类型严格意义上来说是不可响应的, 但是可以转化成对象再次响应
// 简单类型下面两种方式是等价的
const number = ref(0) // 模板之外使用number.value访问
const number2 = shallowRef(0) // 模板之外使用number.value访问

// 可以把ref想象成
function myRef(value) {
  return reactive({
    value
  })
}

// 需要注意的是ref同样也会递归响应, 因此引用类型应当视情况使用shallowRef(你只想对这个值本身进行更改)
// 这样确保使用更少的内存来提升应用性能

// 任意类型浅响应
const person = shallowRef({
  name: '李四',
  age: 21,
  sex: 'male'
})

// 可以把shallowRef想象成
function myShallowRef(value) {
  return shallowReactive({
    value
  })
}

// 计算属性, 模板之外使用.value来访问
const name = computed(() => {
  return person.name
})

// watch, watch可以观察一个响应性对象, 或者一个返回响应性值的函数
const cancel = watch(name, (v) => console.log(v)) // name改变打印的值会改变
// cancel是一个取消观察的函数, 意味着你可以通过改函数实现特定条件下的观察
// 例如在后端数据返回前始终观察着data属性, 当后端值返回后data属性的值被赋值后取消观察

// watchEffect, 类似vue2中的updated生命周期, 如果你在这里面改变了其他响应式状态, 将会导致程序死循环
watchEffect(() => {
  // 通常可以用来调试
  console.log(name.value)
  // 执行其他操作是务必注意不要导致状态发生改变
})

```

### 生命周期

[查看](https://v3.cn.vuejs.org/api/composition-api.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

### 模板新特性

- 支持多个根节点

``` html
<template>
<!-- 现在可以这样写 -->
<div>1</div>
<div>2</div>
</template>
```

### 虚拟节点vnode

vnode是一个类似dom节点的用来描述页面元素的对象

``` tsx

// vnode怎么来的

// 1. 在模板中, 首先模板会被编译成一个渲染函数, 调用这个渲染函数后的返回值就是vnode
// 2. 你直接在render函数中返回元素, 则免去了编译过程, 调用render返回vnode

// 在哪里获取vnode
const vnodes = slots.default()
// 还可以在当前实例中获取, 但是不推荐

// 怎么渲染vnode(vue3支持, 否则你只能在render函数中渲染)
<template>
  <component :is="vnode" />
</template>

```