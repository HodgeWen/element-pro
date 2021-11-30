# 开发 FAQ

这里是常见的开发问题

## 安装依赖

```bash
pnpm i
```

## 链接本地依赖

```bash
# 先构建包
pnpm build
cd dist/element-pro
# 将包链接到全局的node_modules中
pnpm link --global
# 对于es模块
pnpm link --global element-pro

# 进入你的项目目录并链接依赖
cd your-project
pnpm link --global element-pro
```

> 更多详情请访问 [pnpm link](https://pnpm.io/cli/link).
