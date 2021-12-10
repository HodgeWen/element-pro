---
title: Tooltip 文字提示
lang: zh-CN
---

# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

## 基础用法

在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

:::demo 使用 `content` 属性来决定 `hover` 时的提示信息。 由 `placement` 属性决定展示效果： `placement`属性值为：`[方向]-[对齐位置]`；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。 如 `placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

tooltip/basic

:::

## 主题

Tooltip 组件提供了两个不同的主题：`dark` 和 `light`。

:::demo 通过设置 `effect` 属性来改变主题，默认为 `dark`。

tooltip/theme

:::

## 更多内容的文字提示

展示多行文本或者是设置文本内容的格式

:::demo 用具名插槽（slot） `content`，替代 `tooltip` 中的`content`属性。

tooltip/rich-content

:::

## 高级扩展

除了这些基本设置外，还有一些属性可以让使用者更好的定制自己的效果：

`transition` 属性可以定制显隐的动画效果，默认为 `fade-in-linear`。

如果需要关闭 `tooltip` 功能，`disabled` 属性可以满足这个需求， 你只需要将其设置为 `true`。

事实上，Tooltip 是一个基于 [Vue-popper](https://github.com/element-component/vue-popper) 的扩展，您可以使用 Vue-popper 中允许的任何属性。

:::demo

tooltip/advanced-usage

:::

:::tip

Tooltip 内不支持 `router-link` 组件，请使用 `vm.$router.push` 代替。

Tooltip 内不支持 disabled form 元素，参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/Events/mouseenter)， 请在 disabled form 元素外层添加一层包裹元素。

:::

## 属性

| 属性                  | 说明                                                                                                    | 类型    | 可选值                                                                                                    | 默认值                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| append-to-body        | Dialog 自身是否插入至 body 元素上。 嵌套的 Dialog 必须指定该属性并赋值为 true                           | boolean | —                                                                                                         | true                                                    |
| effect                | 文字提示的主题颜色                                                                                      | string  | dark/light                                                                                                | dark                                                    |
| content               | 显示的内容，也可以通过 `slot#content` 传入 DOM                                                          | String  | —                                                                                                         | —                                                       |
| placement             | Tooltip 的出现位置                                                                                      | string  | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom                                                  |
| model-value / v-model | 状态是否可见                                                                                            | boolean | —                                                                                                         | false                                                   |
| disabled              | Tooltip 是否可用                                                                                        | boolean | —                                                                                                         | false                                                   |
| offset                | 出现位置的偏移量                                                                                        | number  | —                                                                                                         | 0                                                       |
| transition            | 定义渐变动画                                                                                            | string  | —                                                                                                         | el-fade-in-linear                                       |
| visible-arrow         | 是否显示 Tooltip 箭头， 更多参数可见 [Vue-popper](https://github.com/element-component/vue-popper)      | boolean | —                                                                                                         | true                                                    |
| popper-options        | [popper.js](https://popper.js.org/documentation.html) 的参数                                            | Object  | 参考 [popper.js](https://popper.js.org/documentation.html) 文档                                           | `{ boundariesElement: 'body', gpuAcceleration: false }` |
| show-after            | 延迟出现，单位毫秒                                                                                      | number  | —                                                                                                         | 0                                                       |
| hide-after            | 延迟关闭，单位毫秒                                                                                      | number  | —                                                                                                         | 0                                                       |
| auto-close            | Tooltip 出现后自动隐藏延时，单位毫秒，为 0 则不会自动隐藏                                               | number  | —                                                                                                         | 0                                                       |
| manual                | 手动控制模式， 设置为 true 后，mouseenter 和 mouseleave 事件将不会生效                                  | boolean | —                                                                                                         | false                                                   |
| popper-class          | 为 Tooltip 的 popper 添加类名                                                                           | string  | —                                                                                                         | —                                                       |
| enterable             | 鼠标是否可进入到 tooltip 中                                                                             | Boolean | —                                                                                                         | true                                                    |
| tabindex              | Tooltip 组件的 [tabindex](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/tabindex) | number  | —                                                                                                         | 0                                                       |

## 插槽

| 插槽名 | 说明     |
| ------ | -------- |
| —      | 默认插槽 |
