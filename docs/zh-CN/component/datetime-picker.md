---
title: DateTimePicker 日期时间选择器
lang: zh-CN
---

# DateTimePicker 日期时间选择器

在同一个选择器里选择日期和时间

:::tip

日期时间选择器来自日期选择器和时间选择器的组合。 关于属性的更详细解释，请参阅日期选择器和时间选择器。

:::

<style lang="scss" scoped>

.example-showcase  {
  padding: 0;
  display: flex;
}

.example-showcase .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color-base);
  flex: 1;
  &:last-child {
    border-right: none;
  }
}

.example-showcase .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}


</style>

## 日期和时间点

:::demo 设置 `type` 为 `datetimerange` 即可选择日期和时间范围。 快捷方式的使用方法与 Date Picker 相同。

datetime-picker/date-and-time

:::

## 日期和时间范围

:::demo 设置 `type` 为 `datetimerange` 即可选择日期和时间范围

datetime-picker/date-and-time-range

:::

## 开始日期和结束日期的默认值

:::demo 当在日期面板中选择日期范围时，类型为 `datetimerange` 的选择器会使用 `00:00:00` 作为开始和结束日期的默认时刻值。 我们可以使用 `default-time` 属性来控制它。 `default-time` 接受最多包涵两个日期对象的数组。 第一项控制开始日期的时间值，第二项控制结束日期的时间值。

datetime-picker/default-time

:::

## 属性

| 属性                  | 说明                                                                                                        | 类型                                              | 可选值                                                                                                                                                    | 默认值              |
| --------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| model-value / v-model | 选中项绑定值                                                                                                | date(DateTimePicker) / array(DateTimeRangePicker) | —                                                                                                                                                         | —                   |
| readonly              | 只读                                                                                                        | boolean                                           | —                                                                                                                                                         | false               |
| disabled              | 禁用                                                                                                        | boolean                                           | —                                                                                                                                                         | false               |
| editable              | 文本框可输入                                                                                                | boolean                                           | —                                                                                                                                                         | true                |
| clearable             | 是否显示清除按钮                                                                                            | boolean                                           | —                                                                                                                                                         | true                |
| size                  | 输入框尺寸                                                                                                  | string                                            | large/medium/small/mini                                                                                                                                   | large               |
| placeholder           | 非范围选择时的占位内容                                                                                      | string                                            | —                                                                                                                                                         | —                   |
| start-placeholder     | 范围选择时开始日期的占位内容                                                                                | string                                            | —                                                                                                                                                         | —                   |
| end-placeholder       | 范围选择时结束日期的占位内容                                                                                | string                                            | —                                                                                                                                                         | —                   |
| time-arrow-control    | whether to pick time using arrow buttons                                                                    | boolean                                           | —                                                                                                                                                         | false               |
| type                  | 显示类型                                                                                                    | string                                            | year/month/date/datetime/ week/datetimerange/daterange                                                                                                    | date                |
| format                | 显示在输入框中的格式                                                                                        | string                                            | see [date formats](/zh-CN/component/date-picker#date-formats)                                                                                             | YYYY-MM-DD HH:mm:ss |
| popper-class          | DateTimePicker 下拉框的类名                                                                                 | string                                            | —                                                                                                                                                         | —                   |
| range-separator       | 选择范围时的分隔符                                                                                          | string                                            | -                                                                                                                                                         | '-'                 |
| default-value         | 可选，选择器打开时默认显示的时间                                                                            | Date                                              | 可被`new Date()`解析的所有值                                                                                                                              | —                   |
| default-time          | 选中日期后的默认具体时刻                                                                                    | 若为非时间范围: Date / 若为时间范围: Date[]       | 非范围选择时：Date 对象；范围选择时：数组，长度为 2，每项值为 Date 对象，第一项指定开始日期的时刻，第二项指定结束日期的时刻。 不指定会使用时刻 `00:00:00` | —                   |
| name                  | 原生属性                                                                                                    | string                                            | —                                                                                                                                                         | —                   |
| unlink-panels         | 在范围选择器里取消两个日期面板之间的联动                                                                    | boolean                                           | —                                                                                                                                                         | false               |
| prefix-icon           | 自定义前缀图标                                                                                              | string                                            | —                                                                                                                                                         | Date                |
| clear-icon            | 自定义清除图标                                                                                              | string                                            | —                                                                                                                                                         | CircleClose         |
| shortcuts             | 设置快捷选项，需要传入数组对象                                                                              | object[{ text: string, value: date / function }]  | —                                                                                                                                                         | —                   |
| disabledDate          | 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数 ，应该返回一个 Boolean 值 应该返回一个布尔值 | function                                          | —                                                                                                                                                         | —                   |
| cellClassName         | 设置日期的 className                                                                                        | Function(Date)                                    | —                                                                                                                                                         | —                   |

## 事件

| 事件名          | 说明                                                                                                     | 回调参数     |
| --------------- | -------------------------------------------------------------------------------------------------------- | ------------ |
| change          | 用户确认选定的值时触发                                                                                   | value        |
| blur            | 在组件 Input 失去焦点时触发                                                                              | instance     |
| focus           | 在组件 Input 获得焦点时触发                                                                              | instance     |
| calendar-change | 如果用户没有选择日期，那默认展示当前日的月份。 选中日历日期后会执行的回调，只有当 `datetimerange` 才生效 | [Date, Date] |

## 方法

| 方法名 | 说明              | 参数 |
| ------ | ----------------- | ---- |
| focus  | 使 input 获取焦点 | —    |
