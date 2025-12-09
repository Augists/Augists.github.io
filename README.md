# Augists Blog

基于 Astro + Ryze 的个人博客，内容和文章都从原 Hexo 站点迁移而来，保持原有文章、标签和页面。

## 开发

```bash
npm install
npm run dev
npm run dev -- --host 0.0.0.0
# 构建
npm run build
```

## 内容结构

- 文章：`src/content/posts`（保留原有目录层级、frontmatter 与标签）
- About：`src/content/pages/about.md`
- 友链：`src/config/site.ts` 的 `friendLinks` 数组
- 静态资源：`public/`（包含 `CNAME`、订阅页、画廊等）

## 特性

- Markdown + 内容集合，支持标签、归档、RSS、站点地图
- 内置 KaTeX，支持行内 / 行间公式
- Hexo `{% note %}` 标记自动转换为样式化提示块
- 暗/亮主题、阅读进度、阅读时长等体验优化
