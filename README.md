<p align="center">
    <img src="images/logo.svg" alt="Logo" width="200px">
</p>

<h2 align="center">Musée</h2>

<p align="center">
  <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/obviyus/musee">
  <img alt="Website" src="https://img.shields.io/website?down_message=offline&label=website&up_message=online&url=https%3A%2F%2Fgallery.obviy.us%2F">
  <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/obviyus/musee">
</p>

<p align="center">Fast, responsive , self-hosted image gallery. Ships minimal JS to the client.</p>

[Musée](https://www.collinsdictionary.com/dictionary/french-english/mus%C3%A9e) (pronounced myu-zay) was written primarily to experiment around with https://remix.run/. Until now I had been using the *excellent* [`waschinski/photo-stream`](https://github.com/waschinski/photo-stream) gallery for hosting my images but felt limited with having to use Ruby. The eventual goal of Musée is to ship **ZERO** client side JS to the client while maintaining the masonry layout.

Unfortunately, a responsive masonry layout is [not possible](https://stackoverflow.com/a/45200955/11940280) withtout the use of client-side JS to determine the window size to calculating number of columns. At least until [CSS Grid Masonry](https://drafts.csswg.org/css-grid-3/#masonry-layout) becomes available.


## ✨ Features
- [x] Generate WebP image thumbnails
- [x] Compress original images
- [x] Strip image metadata before deployment
- [x] Typescript support
- [x] Server Side Rendered
- [x] Uses TailwindCSS
- [x] OpenGraph meta tags
- [ ] Captions for images
- [ ] Device metadata for images
- [ ] Image geo-tag map generation

## 🏗 Development
1. Install dependencies.
```bash
$ yarn install
```
Setup `config.ts` with metadata information for your website.

2. Start development server
```bash
$ yarn run dev
```

## 🚀 Deployment
Deployment (for now) is done to Cloudflare Pages. Documentation is available here: https://developers.cloudflare.com/pages/framework-guides/remix/

## Contributing
I'm relatively inexperienced with React so any and all contirbutions are welcome.

This repository uses the automated [`semantic-release`](https://github.com/semantic-release/semantic-release) suite of tools to generate version numbers. All commit messages **must** conform to the [Angular Commit Message conventions](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format).