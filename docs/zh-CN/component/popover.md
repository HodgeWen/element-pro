---
title: Popover 气泡卡片
lang: zh-CN
---

# Popover 气泡卡片

## 基础用法

Popover 的属性与 Tooltip 很类似，它们都是基于 `Vue-popper` 开发的， 因此对于重复属性，请参考 Tooltip 的文档，在此文档中不做详尽解释。

:::demo `trigger`属性用于设置何时触发 Popover，支持四种触发方式：`hover`，`click`，`focus` 和 `manual`。 对于触发 Popover 的元素，有两种写法：使用 `#reference` 的具名插槽，或使用自定义指令`v-popover`指向 Popover 的索引`ref`。

popover/basic-usage

:::

## 嵌套信息

可以在 Popover 中嵌套其它组件， 以下为嵌套表格的例子。

:::demo 利用插槽取代 `content` 属性

popover/nested-information

:::

## 嵌套操作

当然，你还可以嵌套操作， 这相比 Dialog 更为轻量。

:::demo

popover/nested-operation

:::

## 属性

| 属性                      | 说明                                                                                                    | 类型            | 可选值                                                                                                    | 默认值                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| trigger                   | 触发方式                                                                                                | string          | click/focus/hover/manual                                                                                  | click                                                   |
| title                     | 标题                                                                                                    | string          | —                                                                                                         | —                                                       |
| content                   | 显示的内容，也可以通过 `slot` 传入 DOM                                                                  | string          | —                                                                                                         | —                                                       |
| width                     | 宽度                                                                                                    | string / number | —                                                                                                         | 最小宽度 150px                                          |
| placement                 | 出现位置                                                                                                | string          | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom                                                  |
| disabled                  | Popover 是否可用                                                                                        | boolean         | —                                                                                                         | false                                                   |
| visible / v-model:visible | Popover 是否显示                                                                                        | Boolean         | —                                                                                                         | false                                                   |
| offset                    | 出现位置的偏移量                                                                                        | number          | —                                                                                                         | 0                                                       |
| transition                | 定义渐变动画                                                                                            | string          | —                                                                                                         | el-fade-in-linear                                       |
| show-arrow                | 是否显示 Tooltip 箭头， 更多参数可见[Vue-popper](https://github.com/element-component/vue-popper)       | boolean         | —                                                                                                         | true                                                    |
| popper-options            | [popper.js](https://popper.js.org/docs/v2/) 的参数                                                      | object          | 请参考 [popper.js](https://popper.js.org/docs/v2/)                                                        | `{ boundariesElement: 'body', gpuAcceleration: false }` |
| popper-class              | 为 popper 添加类名                                                                                      | string          | —                                                                                                         | —                                                       |
| show-after                | 延迟出现，单位毫秒                                                                                      | number          | —                                                                                                         | 0                                                       |
| hide-after                | 延迟关闭，单位毫秒                                                                                      | number          | —                                                                                                         | 200                                                     |
| auto-close                | Tooltip 出现后自动隐藏延时，单位毫秒，为 0 则不会自动隐藏                                               | number          | —                                                                                                         | 0                                                       |
| tabindex                  | Popover 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | number          | —                                                                                                         | —                                                       |

## 插槽

| 插槽名    | 说明                          |
| --------- | ----------------------------- |
| —         | Popover 内嵌 HTML 文本        |
| reference | 触发 Popover 显示的 HTML 元素 |

## 事件

| 事件名      | 说明                   | 回调参数 |
| ----------- | ---------------------- | -------- |
| show        | 显示时触发             | —        |
| after-enter | 显示动画播放完毕后触发 | —        |
| hide        | 隐藏时触发             | —        |
| after-leave | 隐藏动画播放完毕后触发 | —        |
