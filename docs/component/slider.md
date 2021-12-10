---
title: Slider 滑块
lang: zh-CN
---

# Slider 滑块

通过拖动滑块在一个固定区间内进行选择

<style lang="scss">
.slider-demo-block {
  display: flex;
  align-items: center;
  .el-slider {
    flex: 1;
    margin-left: 12px;
  }
  .demonstration {
    font-size: 14px;
    color: var(--el-text-color-secondary);
    line-height: 44px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
     & + .el-slider {
        flex: 0 0 70%;
    }
  }
}
</style>

## 基础用法

在拖动滑块时，显示当前值

:::demo 通过设置绑定值自定义滑块的初始值

slider/basic-usage

:::

## 离散值

选项可以是离散的

:::demo 改变`step`的值可以改变步长， 通过设置 `show-stops` 属性可以显示间断点

slider/discrete-values

:::

## 带有输入框的滑块

通过输入框设置精确数值

:::demo 设置 `show-input` 属性会在右侧显示一个输入框

slider/slider-with-input-box

:::

## 范围选择

支持选择某一数值范围

:::demo 设置 `range` 即可开启范围选择，此时绑定值是一个数组，其元素分别为最小边界值和最大边界值

slider/range-selection

:::

## 竖向模式

:::demo 设置 `vertical` 属性可使 Slider 变成竖向模式， 此时必须设置高度 `height` 属性

slider/vertical-mode

:::

## 展示标记

:::demo 设置 `marks` 属性可以展示标记

slider/show-marks

:::

## 属性

| 属性                  | 描述                                                                                      | 类型            | 可选值                        | 默认值 |
| --------------------- | ----------------------------------------------------------------------------------------- | --------------- | ----------------------------- | ------ |
| model-value / v-model | 选中项绑定值                                                                              | number          | —                             | 0      |
| min                   | 最小值                                                                                    | number          | —                             | 0      |
| max                   | 最大值                                                                                    | number          | —                             | 100    |
| disabled              | 是否禁用                                                                                  | boolean         | —                             | false  |
| step                  | 步长                                                                                      | number          | —                             | 1      |
| show-input            | 是否显示输入框，仅在非范围选择时有效                                                      | boolean         | —                             | false  |
| show-input-controls   | 在显示输入框的情况下，是否显示输入框的控制按钮                                            | boolean         | —                             | true   |
| input-size            | 输入框的尺寸                                                                              | string          | large / medium / small / mini | small  |
| show-stops            | 是否显示间断点                                                                            | boolean         | —                             | false  |
| show-tooltip          | 是否显示 tooltip                                                                          | boolean         | —                             | true   |
| format-tooltip        | 格式化 tooltip message                                                                    | function(value) | —                             | —      |
| range                 | 是否为范围选择                                                                            | boolean         | —                             | false  |
| vertical              | 是否竖向模式                                                                              | boolean         | —                             | false  |
| height                | Slider 高度，当竖向模式时必填                                                             | string          | —                             | —      |
| label                 | 屏幕阅读器标签                                                                            | string          | —                             | —      |
| debounce              | 输入时的去抖延迟，毫秒，仅在 `show-input` 等于 true 时有效                                | number          | —                             | 300    |
| tooltip-class         | tooltip 的自定义类名                                                                      | string          | —                             | —      |
| marks                 | 标记， key 的类型必须为 `number` 且取值在闭区间 `[min, max]` 内，每个标记可以单独设置样式 | object          | —                             | —      |

## 事件

| 事件名 | 说明                                               | 参数            |
| ------ | -------------------------------------------------- | --------------- |
| change | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发） | val，新状态的值 |
| input  | 数据改变时触发（使用鼠标拖曳时，活动过程实时触发） | val，改变后的值 |
