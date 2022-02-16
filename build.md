# 构建工具

## gulp

我们通常用 gulp 帮我们执行一些任务

### 任务

一个 gulp 任务就是一个异步函数
在现有的 es 体系下, task 就是一个返回了 Promise 的函数

任务分为公开任务和私有任务

- 公开任务 在 gulpfile 中被导出的任务
- 私有任务 未被导出的任务

```ts
// gulpfile.ts
// task1为公开任务
export const task1 = () => {
  return Promise.resolve('ok')
}
```

### 任务的组合

试想一下, 你需要提供一个类似 gulp 的工具, 该如何让它帮你处理你的任务呢?

```ts
// 按照我们的思想来逆推
const run = (...tasks) => {
  tasks.forEach(task => task())
}
```

// 第一步我们实现了 gulp 的核心功能, 执行函数
// 但是,在某些情况下我需要知道我的任务何时完成, 做以便后续的其他任务

```ts
// 有下面的场景
const bootstrap = async () => {
  // 假设这一步分别是编译ts到js和编译scss到css
  await run(task1, task2)
  // 假设这一步是将上一步编译后的文件拷贝到目标目录
  await run(task3)
}
bootstrap()

// 很简单我们可以这样实现
// 这个函数其实在gulp中有一个术语叫并行执行即 parallel 方法
const run = (...tasks) => {
  return Promise.all(tasks.map(task => task()))
}
```

// 上面实现了并行执行, 然而也会存在顺序执行的场景
```ts
// 有下面的场景, 第二个任务需要接收前一个参数的返回值
const taskToInput = () => {
  return Promise.resolve('hello gulp')
}

const taskToUpper = (content: string) => {
  return Promise.resolve(content.toUpperCase())
}

run(taskToInput, taskToUpper)

// 实现他
// 这个函数在gulp的术语叫顺序执行即 series 方法
const run = (...tasks) => {
  return tasks.reduce(
    async (acc, cur) => (acc ? cur(await acc) : cur()),
    null
  )
}
```

### 处理文件

想象一下, 你的工作流最终的目的是什么, 是生成文件, gulp给我们提供了几个
api: src, dest, symlink

``` ts
// 读取一个目录里面的所有js文件并放入dist文件夹
src('src/*.js').pipe(dest('output/'))

```