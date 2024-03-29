---
title: Beautify Hexo
date: 2020-05-30 14:47:51
tags: HEXO
description: My Method & Tips for Hexo Beautifying

---

# Beautify Hexo

These are my method to make my blog better looked.
Still working on it.

## method

### Click Number

1. File path `\themes\next\layout\_partials\footer.njk`
2. Add
```html
<script async src="https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```
before `copyright`
3. In class `powered-by` add
```html
<i class="fa fa-user-md"></i><span id="busuanzi_container_site_uv">
  Click Number:<span id="busuanzi_value_site_uv"></span>
</span>
```

> **pv** for repeat counting
> **uv** for distinct counting

### No Powered-by

1. File path `\themes\next\layout\_partials\footer.njk`
2. Comment html code in `powered-by` by `<!--  -->`

### Tag Icon

1. File path `themes/next/layout/_macro/post.njk`
2. Find `rel="tag"`
3. Replace `#` with `<i class="fa fa-tag"></i>`

## Tips

### Nothing in Tags page

1. add `type: tags` in `/source/tags/index.md` after `title`

### Hexo New "Post" Init

1. File path `/scaffolds/post.md`
2. Add for initializing every times

### Delete A Post in Hexo

I surfed on the Internet, only to find that their method didn't work for me.

#### My Problem

1. Delete `mac-software`
2. Repost it on May 31st
3. Still taged as May 29th if set in the same file path

#### Common Solution

1. Find file path `source/_post/article.md`
2. Remove it
3. Run `hexo clean && hexo g && hexo d`

#### My Solution

If only need to change date posted, just modify the `date` at the top

> All posts generated by Hexo will be as `YY/MM/DD/post`

I didn't find a absolutely prefect way for removing a post

### Link Inside

It should be `./link`

But in Hexo, it will be `../link`

### URL Setting

1. Find file path `blog/_config.yml`
2. Search `permalink`
3. From `permalink: :year/:month/:day/:title/` to `permalink: :title/`

### 404 in Tags or Categories

#### Reason

Change a part of tags or categories after generating

#### Solution

1. File path `.deploy_git//.git/config`
2. Find `ignorecase`
3. From `true` to `false`
4. Clean and generate
```bash
hexo clean
hexo d -g
```

### Several Tags in One Article

```bash
tags: [HELLO, HEXO]
```

### Several Lines in Description

```bash
description: "Hello first line<br>Hello second line"
```
