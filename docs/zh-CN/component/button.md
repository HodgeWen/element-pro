---
title: Button 按钮
lang: zh-CN
---

# Button 按钮

常用的操作按钮。

## 基础用法

:::demo 使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

button/basic

:::

## 禁用状态

你可以使用 `disabled` 属性来定义按钮是否被禁用。

:::demo 使用 `disabled` 属性来控制按钮是否为禁用状态。 该属性接受一个 `Boolean` 类型的值。

button/disabled

:::

## 文字按钮

没有边框和背景色的按钮。

:::demo

button/text

:::

## 图标按钮

使用图标为按钮添加更多的含义。 你也可以单独使用图标不添加文字来节省显示区域占用。

:::demo 使用 `icon` 属性来为按钮添加图标。 你可以在 Element Pro icon 组件里找到 Element Pro 提供的内置图标。 通过向右方添加`<i>`标签来添加图标， 你也可以使用自定义图标。

button/icon

:::

## 按钮组

通过按钮组来组合一系列相似的操作。

:::demo 使用标签 `<el-button-group>` 来给按钮分组。

button/group

:::

## 加载中

点击按钮来加载数据，并向用户反馈加载状态。

:::demo 设置 `loading` 属性，当设置为 `true` 时即为加载中。

button/loading

:::

## 各种尺寸的尺寸按钮

除了默认的大小，按钮组件还提供了几种额外的尺寸可供选择，以便适配不同的场景。

:::demo 通过设置 `size`，属性来设置不同的按钮尺寸，可供选择的尺寸有：`medium`、`small`、`mini`。

button/size

:::

## 自定义颜色 <el-tag>测试版</el-tag>

您可以自定义按钮颜色。

我们将自动计算 hover 和 active 颜色。

:::demo

button/custom

:::

## Button 属性

| 属性              | 说明                           | 类型               | 可选值                                             | 默认值 |
| ----------------- | ------------------------------ | ------------------ | -------------------------------------------------- | ------ |
| size              | 尺寸                           | string             | medium / small / mini                              | —      |
| type              | 类型                           | string             | primary / success / warning / danger / info / text | —      |
| plain             | 是否为朴素按钮                 | boolean            | —                                                  | false  |
| round             | 是否为圆角按钮                 | boolean            | —                                                  | false  |
| circle            | 是否为圆形按钮                 | boolean            | —                                                  | false  |
| loading           | 是否为加载中状态               | boolean            | —                                                  | false  |
| disabled          | 是否为禁用状态                 | boolean            | —                                                  | false  |
| icon              | 图标组件                       | string / Component | —                                                  | —      |
| autofocus         | 是否默认聚焦                   | boolean            | —                                                  | false  |
| native-type       | 原生 type 属性                 | string             | button / submit / reset                            | button |
| auto-insert-space | 自动在两个中文字符之间插入空格 | boolean            |                                                    | —      |

## Button 插槽

| 插槽名 | 说明           |
| ------ | -------------- |
| —      | 自定义默认内容 |

## Button Group 属性

| 属性 | 说明                         | 类型   | 可选值                      | 默认值 |
| ---- | ---------------------------- | ------ | --------------------------- | ------ |
| size | 用于控制该按钮组内按钮的大小 | string | medium / small / mini       | —      |
| type | 用于控制该按钮组内按钮的类型 | string | primary / success / warning | —      |

## Button Group 插槽

| 插槽名 | 说明             | 子标签 |
| ------ | ---------------- | ------ |
| -      | 自定义按钮组内容 | Button |

<style lang="scss">
.example-showcase {
  .el-row {
    margin-bottom: 20px;
    align-items: baseline;

    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-button + .el-button {
    margin-left: 10px;
  }
  .el-button-group {
    .el-button + .el-button {
      margin-left: 0;
    }

    & + .el-button-group {
      margin-left: 10px;
    }
  }
}

</style>
