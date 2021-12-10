---
title: 全局配置
lang: zh-CN
---

# Config Provider 全局配置

Config Provider 被用来提供全局的配置选项，让你的配置能够在全局都能够被访问到，Config Provider 使用了 [Vue 的 provide/inject 特性](https://v3.vuejs.org/guide/composition-api-provide-inject.html#reactivity)

## Config Provider 相关配置

通过 Config Provider 来配置多语言，让你的应用可以随时切换语言。

:::demo 使用两个属性来提供 i18n 相关配置

config-provider/usage

:::

## button 相关配置

:::demo

config-provider/button

:::

## Config Provider Attributes

| 参数   | 说明                                                         | 类型                                 | 可选值                                                                                | 默认值  |
| ------ | ------------------------------------------------------------ | ------------------------------------ | ------------------------------------------------------------------------------------- | ------- |
| locale | 翻译文本对象                                                 | Object\<Language\>                   | [languages](https://github.com/element-pro/element-pro/tree/dev/packages/locale/lang) | English |
| i18n   | 当该属性被提供时优先使用，返回 null 值时会回退至默认翻译器。 | Function\<(...args: []) =\> string\> | -                                                                                     | -       |
| button | 按钮相关的配置[详细配置见下表](#button-属性)                 | ButtonGlobalConfig                   | -                                                                                     | 见下表  |

## Button 属性

| 参数            | 描述                           | 类型    | 可选值 | 默认值 |
| --------------- | ------------------------------ | ------- | ------ | ------ |
| autoInsertSpace | 自动在两个中文字符之间插入空格 | boolean | -      | false  |

## ConfigProvider 插槽

| 插槽名 | 描述     |
| ------ | -------- |
| —      | 默认插槽 |
