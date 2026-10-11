# WenXuan Zou · Academic Homepage

为 WenXuan Zou（中国海洋大学博士在读）制作的 GitHub Pages 学术主页。采用白底、灰色正文与蓝色链接，左侧是个人信息，右侧是介绍、研究方向、论文列表和 GitHub 作品预留区。使用少量蓝、绿和淡紫色点缀。支持中英文切换、手机端导航、论文概述、BibTeX 复制与下载。无需 Node 构建、远程主题或第三方字体。

## 本地预览

在这个目录运行：

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

打开 `http://127.0.0.1:8000`。无需安装 Ruby 即可预览主页。服务器用于预览时会看到本地保留的模板目录，GitHub Pages 发布时按 `_config.yml` 排除。

## GitHub Pages 发布

将本目录中的内容放入 `zwx000908-dev.github.io` 仓库根目录（不要额外嵌套 `zwx000908-dev.github.io-master` 文件夹）。在仓库 **Settings → Pages** 选择 **Deploy from a branch**，选择实际保存这些文件的分支和 **/ (root)**，保存。站点地址：`https://zwx000908-dev.github.io/`。

发布设置参考：[GitHub Pages 官方文档](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

这是下载的项目目录，当前没有 `.git` 信息；本次修改只保存在本地，没有提交或推送到 GitHub。

## 后续编辑

| 内容 | 文件 |
| --- | --- |
| 姓名、身份、介绍、论文展示 | `index.html` |
| 左侧头像 | `assets/images/bio-photo.png` |
| 中英文文案 | `index.html` 对应元素的 `data-en` / `data-zh` 属性；同步修改元素中的默认英文 |
| 配色、字体、布局与手机适配 | `assets/css/main.css` |
| 语言切换、导航、引用复制 | `assets/js/main.js` |
| 下载的论文引用 | `assets/publications.bib` |
| 网站标题、地址、发布排除规则 | `_config.yml` |
| 分享预览图 | `assets/images/social-preview.png` |

添加论文时，复制 `index.html` 中的一个 `.publication` 区块，更新年份、顺序、标题、作者、期刊信息、DOI、双语概述和按钮的 `data-citation`。同时更新 `main.js` 中的引用及 `publications.bib`。增加文献后请同步调整显示的总篇数。

每次打开页面默认以英文展示；仍可通过 EN / 中 按钮手动切换。顶部 About、Research、Publications、Projects 在窄屏下也直接显示，点击即可跳转到相应章节。浏览器限制剪贴板时会显示引用文本框，方便手动复制。关闭 JavaScript 时英文内容、论文链接、概述与引用下载仍可使用。

## 内容来源

- ACS Catalysis, 2026, **16** (5), 4925–4935: https://doi.org/10.1021/acscatal.5c08928
- Organic Letters, 2024, **26** (27), 5811–5816: https://doi.org/10.1021/acs.orglett.4c02000
- 题名、作者、卷期页码使用 ACS / Crossref 记录核实。简要研究介绍为原摘要的概括；主页的当前 OUC 身份来自本人提供的信息，论文原始署名单位保持原文记录。
- 学历阶段为博士在读；未填入未经提供的入学年份、导师、邮箱或个人照片。
- 左侧头像使用本人提供的 `assets/images/bio-photo.png`，通过 CSS 圆形显示；原图片保留完整。

原来的 `_posts`、`_pages` 与模板头像保留在本地，并在发布配置中排除；主页不再依赖 Minimal Mistakes。

## 添加 GitHub 作品

`index.html` 中的 `section#projects` 是作品展示区，目前显示明确的空状态。未填入虚构项目或无效链接。

项目准备好后，将 `.project-placeholder` 区块替换为以下结构。将示例中的名称、简介和链接换成真实内容；多个项目可以复制 `.project-entry` 区块。

```html
<article class="project-entry">
  <h3><a href="https://github.com/YOUR_USERNAME/YOUR_REPOSITORY"
         target="_blank" rel="noopener noreferrer">Your project name</a></h3>
  <p data-en="Your project description." data-zh="你的项目简介。">Your project description.</p>
  <a class="project-repository" href="https://github.com/YOUR_USERNAME/YOUR_REPOSITORY"
     target="_blank" rel="noopener noreferrer"
     data-en="View repository ↗" data-zh="查看仓库 ↗">View repository ↗</a>
</article>
```

项目名称可以保留原文，简介和按钮通过 `data-en` / `data-zh` 切换语言。展示区样式与顶部、侧栏的跳转入口已经配置好。
