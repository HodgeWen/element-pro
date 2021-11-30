---
title: 迁移
lang: zh-CN
---

# 迁移

## 从 Element UI 2.x 迁移到 Element Pro

本文档将帮助你从 Element 2.x 升级至 Element Pro.

## 不兼容更新

以下是不兼容更新的列表

本文档有待完善，目前请参考这里的 [不兼容更新列表](https://github.com/element-pro/element-pro/issues/162)。

## 用于迁移的构建版本

使用 ElementPro 与 Vue 3 迁移构建时可能遇到一些问题。 有些组件依赖于 Vue 3 内部 API。 尝试全局或将你项目中每个组件的 [compatConfig](https://v3.vuejs.org/guide/migration/migration-build.html#per-component-config) 调整为 `3`。
