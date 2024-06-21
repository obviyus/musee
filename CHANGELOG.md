# 1.0.0 (2024-06-21)


### Bug Fixes

* **astro:** fix stat check ([766b2dd](https://github.com/obviyus/musee/commit/766b2dd27368da07d780b740ded4ec7e634c6c51))
* **case:** fix extension case for images ([fec05e4](https://github.com/obviyus/musee/commit/fec05e4b2f23c5e140a3f2cfb7492b7dd8c3116e))
* **cdn:** re-add CDN links ([49a5b5d](https://github.com/obviyus/musee/commit/49a5b5d9c337c2d50fb5c9340942fcfb74c32859))
* **CDN:** remove statically CDN ([8d2b35b](https://github.com/obviyus/musee/commit/8d2b35bbd7d7a050b55c3c664485db56f77eea92))
* **component:** remove deprecated prop ([e2aa836](https://github.com/obviyus/musee/commit/e2aa83680fbf56ac1c997a0e9bf93a102900db65))
* **config:** remove faulty xo rule ([ae0f04e](https://github.com/obviyus/musee/commit/ae0f04e1ee996c1197c1b310a8f8730d0bce0600))
* **css:** remove generated CSS ([355631e](https://github.com/obviyus/musee/commit/355631ee6fd49073c65d5e7361a59cb5d2cdaba4))
* **git:** remove functions from VCS ([4ca4b9a](https://github.com/obviyus/musee/commit/4ca4b9ad7aae3284595d791112fe9921cb5f87cb))
* **hash:** use consistent hashing based on filename ([4403554](https://github.com/obviyus/musee/commit/44035547cea464cc27eaad6e3c828e5c26c8aeae))
* **image:** fix image building logic ([7dff62e](https://github.com/obviyus/musee/commit/7dff62efcf9b827e819b5e10d6d22ad16a1cf9ad))
* **image:** reduce quality of thumbnails ([8b20a52](https://github.com/obviyus/musee/commit/8b20a52f2103755c2a811f5586ba5a4d511fac48))
* **image:** rename extension ([54073d8](https://github.com/obviyus/musee/commit/54073d8911e6d7f957c2aa486fcb6076e128348f))
* **images:** change image directory ([73030cb](https://github.com/obviyus/musee/commit/73030cbc5ff55a73c04ab9918c0eb8bb5aabf977))
* **images:** fix image headers ([0a2749a](https://github.com/obviyus/musee/commit/0a2749a40f28b24087ccd261c69d17939d1b76d8))
* **images:** restore lost EXIF ([d72874c](https://github.com/obviyus/musee/commit/d72874c7d03c28da4676c797174f92430b64157c))
* **image:** use correct absolute image path ([e7da04d](https://github.com/obviyus/musee/commit/e7da04de2b4db6ecc411e680475e0a38fa62e156))
* **image:** use sharp for processing images ([abfb94d](https://github.com/obviyus/musee/commit/abfb94d2710af62390a96b30a72e14b1ab47f8bd))
* **img:** change EXIF date ([30ae5f8](https://github.com/obviyus/musee/commit/30ae5f841926cbc67ec467d3d827d0f721ce20e5))
* **img:** include 'alt' attribute with images ([e6210c0](https://github.com/obviyus/musee/commit/e6210c03cc6c4ad9c2e104b9d5096ebf44191b04))
* **img:** remove auto-generated files ([e50dc1d](https://github.com/obviyus/musee/commit/e50dc1da2c524807f06df6f11099b5e87b4951bb))
* **img:** temporary fix for images stretching on Safari ([4e7c16b](https://github.com/obviyus/musee/commit/4e7c16b8f0165d58903cb753fabfb9d2e2bc2a89))
* **importer:** handle `.JPG` files ([df22f5b](https://github.com/obviyus/musee/commit/df22f5bc24a4a7a737e8fa37762a4f6009691e44))
* **imports:** use JS file ([5723d41](https://github.com/obviyus/musee/commit/5723d41b5a80e43ee090932f0c9df96f55f1e399))
* **imports:** use relative imports ([37986db](https://github.com/obviyus/musee/commit/37986dbd0da7470a5d34a8611a1cf95e30fb1c8a))
* **index:** use absolute imports ([c52de26](https://github.com/obviyus/musee/commit/c52de2667824f0a29be38c83e04ea53f95277994))
* **layout:** link to original image on BaseImage ([185c8bd](https://github.com/obviyus/musee/commit/185c8bdc4fe06a9b10bef6800a0fca2256872c3e))
* **lazy:** fix lazy loading to reduce initial payload ([235123f](https://github.com/obviyus/musee/commit/235123fcd5fe60153408aaae3c510a4df3f9ece3))
* **lazy:** specify dimensions for lazy loading ([0e63343](https://github.com/obviyus/musee/commit/0e633437544edea29ee1613e941c609f68ab7710))
* **link:** pre-fetch links on hover ([bacf953](https://github.com/obviyus/musee/commit/bacf9534499fdf187db1367777160b5ba3b6f3e2))
* **link:** remove prefetching ([6c92a0d](https://github.com/obviyus/musee/commit/6c92a0d73221fe7026057db339deb827001314f1))
* **masonry:** use slug as index ([a8f6f95](https://github.com/obviyus/musee/commit/a8f6f9518cca36d1497c24bdbe2b3208012933f3))
* **meta:** remove parent description from image page ([181625e](https://github.com/obviyus/musee/commit/181625e8ae7047f212165559fe1e8eb1730bff8a))
* **meta:** use absolute path for image ([8f4bdeb](https://github.com/obviyus/musee/commit/8f4bdebe7e9a5af13ff529a5546f62d5294d9db1))
* **misc:** typed import + remove log ([da6b379](https://github.com/obviyus/musee/commit/da6b379d121ac5c6c42b7ec7fffda0511ca51d83))
* **module:** revert `astro` version to fix module errors ([5e5f912](https://github.com/obviyus/musee/commit/5e5f91255e3c594465867c4d04527916ea76fc9a))
* **node:** return to node 16 and remove semrel ([d719351](https://github.com/obviyus/musee/commit/d71935155d52c02b82d51f0f8dc4d1f3592cc880))
* **package:** set name and description ([862a2a3](https://github.com/obviyus/musee/commit/862a2a301fa231e029bb1fd2566126068646e211))
* **prefetch:** remove prefetching ([1b9359b](https://github.com/obviyus/musee/commit/1b9359b03be7c89da11056c3656032895bbbb286))
* **transition:** fix ever-increasing load delay ([ef3fa6e](https://github.com/obviyus/musee/commit/ef3fa6e8e146584b316d78d0e3d7a223b20ac8aa))
* **types:** harder types for functions ([11dda0c](https://github.com/obviyus/musee/commit/11dda0cc830e2380bf78ae62669a867ce362b60b))


### Features

* **build:** support jampack ([64eceea](https://github.com/obviyus/musee/commit/64eceea4bce3a9ce782a8eb73b2e74863aa76df8))
* **cdn:** convert to webp for card ([6aa0965](https://github.com/obviyus/musee/commit/6aa09654122a90eedda11001c07528207b012d8c))
* **cdn:** use statically.io for image delivery ([2cd0ee1](https://github.com/obviyus/musee/commit/2cd0ee17f0a4a758fb6c5b267c1ec9b7a14d8733))
* **dummy:** dummy commit to test CI ([642cf4d](https://github.com/obviyus/musee/commit/642cf4db168d35d167b2bdcea04352429d963c2a))
* **dummy:** dummy commit to test CI ([ddd11d0](https://github.com/obviyus/musee/commit/ddd11d044be3a51e1e033babb6b299d93ade62b4))
* **exif:** sort images by EXIF date ([c9b88b1](https://github.com/obviyus/musee/commit/c9b88b1b8cc183f4fde47ca5c79d289820952586))
* **favicon:** replace SVG favicon ([918473c](https://github.com/obviyus/musee/commit/918473c95b2b71e3d2ead108303580610fcd617a))
* **framer:** use `framer-motion` animations ([d93ff80](https://github.com/obviyus/musee/commit/d93ff80834d4076dbe2987a25317ca438a89d986))
* **image:** eager load first 5 images ([26751e5](https://github.com/obviyus/musee/commit/26751e5ae1dad080a0942dc897ab14e8bede21dc))
* **image:** generate WebP for thumbnails ([d09b7ae](https://github.com/obviyus/musee/commit/d09b7ae61f4220358d00c0ab23ecbcf2c1d5a3c6))
* **images:** add images ([bf1ee9d](https://github.com/obviyus/musee/commit/bf1ee9dae4797805e68014baa6250f454f031483))
* **images:** generate compressed variant ([4634309](https://github.com/obviyus/musee/commit/4634309d1eaa1472f17149e35681f3fa79a8b5b3))
* **image:** show larger images ([9f80df7](https://github.com/obviyus/musee/commit/9f80df76e1abec962ce7bac50462a81ed7578a33))
* **image:** upload new image ([d5a8710](https://github.com/obviyus/musee/commit/d5a8710509062b4c21c2e5ef2379d67cdfad8f35))
* **image:** use `sharp` for image processing ([fa9b43b](https://github.com/obviyus/musee/commit/fa9b43bbbba68eb24c9aca5205a3110982468989))
* **img:** attempt squoosh ([aecb5bb](https://github.com/obviyus/musee/commit/aecb5bb82d3984415b1530d9e1942473a7baa0a8))
* **img:** do not lazy load first 4 images ([c2cd219](https://github.com/obviyus/musee/commit/c2cd219463458ad87601ab0be3f8cecf28e69774))
* **img:** reduce thumbnail width ([7adeee3](https://github.com/obviyus/musee/commit/7adeee3ffaa542f453877a38c2e656488a5df5c8))
* **meta:** fix open graph tags ([7a99f40](https://github.com/obviyus/musee/commit/7a99f408ae7996a0a69f06f4ce3763cf8d96a4b5))
* **meta:** improve usage of meta-tags ([e219363](https://github.com/obviyus/musee/commit/e21936399a34f8ff39bf6e4c1ebe83d44271cbb2))
* **preview:** update preview thumbnail logic ([64e10be](https://github.com/obviyus/musee/commit/64e10be7b43aebb517e0f7723bdcea74d6c831c6))
* **slug:** create slugs for each image ([b7faa41](https://github.com/obviyus/musee/commit/b7faa414460a6a7a59e8417776104d080dc2da38))
* **v2:** init ([4b0bf43](https://github.com/obviyus/musee/commit/4b0bf43dd30b741938474ec2af8def59cf27d1aa))
* **v3:** migrate to Astro V3 ([3fb9fcc](https://github.com/obviyus/musee/commit/3fb9fcc07b5914873339cc843b013db5ebc97a04))
* **webp:** encode images in webp ([fcb8f9b](https://github.com/obviyus/musee/commit/fcb8f9b60b4ce2423a8b8b9a4942e76696c67ab5))
* **webp:** use webp for thumbnails ([8b7efc9](https://github.com/obviyus/musee/commit/8b7efc935c88e6fa159dfe41e66354e7aa65eb78))

# 1.0.0 (2024-05-12)


### Bug Fixes

* **astro:** fix stat check ([766b2dd](https://github.com/obviyus/musee/commit/766b2dd27368da07d780b740ded4ec7e634c6c51))
* **case:** fix extension case for images ([fec05e4](https://github.com/obviyus/musee/commit/fec05e4b2f23c5e140a3f2cfb7492b7dd8c3116e))
* **cdn:** re-add CDN links ([49a5b5d](https://github.com/obviyus/musee/commit/49a5b5d9c337c2d50fb5c9340942fcfb74c32859))
* **CDN:** remove statically CDN ([8d2b35b](https://github.com/obviyus/musee/commit/8d2b35bbd7d7a050b55c3c664485db56f77eea92))
* **component:** remove deprecated prop ([e2aa836](https://github.com/obviyus/musee/commit/e2aa83680fbf56ac1c997a0e9bf93a102900db65))
* **config:** remove faulty xo rule ([ae0f04e](https://github.com/obviyus/musee/commit/ae0f04e1ee996c1197c1b310a8f8730d0bce0600))
* **css:** remove generated CSS ([355631e](https://github.com/obviyus/musee/commit/355631ee6fd49073c65d5e7361a59cb5d2cdaba4))
* **git:** remove functions from VCS ([4ca4b9a](https://github.com/obviyus/musee/commit/4ca4b9ad7aae3284595d791112fe9921cb5f87cb))
* **hash:** use consistent hashing based on filename ([4403554](https://github.com/obviyus/musee/commit/44035547cea464cc27eaad6e3c828e5c26c8aeae))
* **image:** fix image building logic ([7dff62e](https://github.com/obviyus/musee/commit/7dff62efcf9b827e819b5e10d6d22ad16a1cf9ad))
* **image:** reduce quality of thumbnails ([8b20a52](https://github.com/obviyus/musee/commit/8b20a52f2103755c2a811f5586ba5a4d511fac48))
* **image:** rename extension ([54073d8](https://github.com/obviyus/musee/commit/54073d8911e6d7f957c2aa486fcb6076e128348f))
* **images:** change image directory ([73030cb](https://github.com/obviyus/musee/commit/73030cbc5ff55a73c04ab9918c0eb8bb5aabf977))
* **images:** fix image headers ([0a2749a](https://github.com/obviyus/musee/commit/0a2749a40f28b24087ccd261c69d17939d1b76d8))
* **images:** restore lost EXIF ([d72874c](https://github.com/obviyus/musee/commit/d72874c7d03c28da4676c797174f92430b64157c))
* **image:** use correct absolute image path ([e7da04d](https://github.com/obviyus/musee/commit/e7da04de2b4db6ecc411e680475e0a38fa62e156))
* **image:** use sharp for processing images ([abfb94d](https://github.com/obviyus/musee/commit/abfb94d2710af62390a96b30a72e14b1ab47f8bd))
* **img:** change EXIF date ([30ae5f8](https://github.com/obviyus/musee/commit/30ae5f841926cbc67ec467d3d827d0f721ce20e5))
* **img:** include 'alt' attribute with images ([e6210c0](https://github.com/obviyus/musee/commit/e6210c03cc6c4ad9c2e104b9d5096ebf44191b04))
* **img:** remove auto-generated files ([e50dc1d](https://github.com/obviyus/musee/commit/e50dc1da2c524807f06df6f11099b5e87b4951bb))
* **img:** temporary fix for images stretching on Safari ([4e7c16b](https://github.com/obviyus/musee/commit/4e7c16b8f0165d58903cb753fabfb9d2e2bc2a89))
* **importer:** handle `.JPG` files ([df22f5b](https://github.com/obviyus/musee/commit/df22f5bc24a4a7a737e8fa37762a4f6009691e44))
* **imports:** use JS file ([5723d41](https://github.com/obviyus/musee/commit/5723d41b5a80e43ee090932f0c9df96f55f1e399))
* **imports:** use relative imports ([37986db](https://github.com/obviyus/musee/commit/37986dbd0da7470a5d34a8611a1cf95e30fb1c8a))
* **index:** use absolute imports ([c52de26](https://github.com/obviyus/musee/commit/c52de2667824f0a29be38c83e04ea53f95277994))
* **layout:** link to original image on BaseImage ([185c8bd](https://github.com/obviyus/musee/commit/185c8bdc4fe06a9b10bef6800a0fca2256872c3e))
* **lazy:** fix lazy loading to reduce initial payload ([235123f](https://github.com/obviyus/musee/commit/235123fcd5fe60153408aaae3c510a4df3f9ece3))
* **lazy:** specify dimensions for lazy loading ([0e63343](https://github.com/obviyus/musee/commit/0e633437544edea29ee1613e941c609f68ab7710))
* **link:** pre-fetch links on hover ([bacf953](https://github.com/obviyus/musee/commit/bacf9534499fdf187db1367777160b5ba3b6f3e2))
* **link:** remove prefetching ([6c92a0d](https://github.com/obviyus/musee/commit/6c92a0d73221fe7026057db339deb827001314f1))
* **masonry:** use slug as index ([a8f6f95](https://github.com/obviyus/musee/commit/a8f6f9518cca36d1497c24bdbe2b3208012933f3))
* **meta:** remove parent description from image page ([181625e](https://github.com/obviyus/musee/commit/181625e8ae7047f212165559fe1e8eb1730bff8a))
* **meta:** use absolute path for image ([8f4bdeb](https://github.com/obviyus/musee/commit/8f4bdebe7e9a5af13ff529a5546f62d5294d9db1))
* **misc:** typed import + remove log ([da6b379](https://github.com/obviyus/musee/commit/da6b379d121ac5c6c42b7ec7fffda0511ca51d83))
* **module:** revert `astro` version to fix module errors ([5e5f912](https://github.com/obviyus/musee/commit/5e5f91255e3c594465867c4d04527916ea76fc9a))
* **node:** return to node 16 and remove semrel ([d719351](https://github.com/obviyus/musee/commit/d71935155d52c02b82d51f0f8dc4d1f3592cc880))
* **package:** set name and description ([862a2a3](https://github.com/obviyus/musee/commit/862a2a301fa231e029bb1fd2566126068646e211))
* **prefetch:** remove prefetching ([1b9359b](https://github.com/obviyus/musee/commit/1b9359b03be7c89da11056c3656032895bbbb286))
* **transition:** fix ever-increasing load delay ([ef3fa6e](https://github.com/obviyus/musee/commit/ef3fa6e8e146584b316d78d0e3d7a223b20ac8aa))
* **types:** harder types for functions ([11dda0c](https://github.com/obviyus/musee/commit/11dda0cc830e2380bf78ae62669a867ce362b60b))


### Features

* **build:** support jampack ([64eceea](https://github.com/obviyus/musee/commit/64eceea4bce3a9ce782a8eb73b2e74863aa76df8))
* **cdn:** convert to webp for card ([6aa0965](https://github.com/obviyus/musee/commit/6aa09654122a90eedda11001c07528207b012d8c))
* **cdn:** use statically.io for image delivery ([2cd0ee1](https://github.com/obviyus/musee/commit/2cd0ee17f0a4a758fb6c5b267c1ec9b7a14d8733))
* **dummy:** dummy commit to test CI ([642cf4d](https://github.com/obviyus/musee/commit/642cf4db168d35d167b2bdcea04352429d963c2a))
* **dummy:** dummy commit to test CI ([ddd11d0](https://github.com/obviyus/musee/commit/ddd11d044be3a51e1e033babb6b299d93ade62b4))
* **exif:** sort images by EXIF date ([c9b88b1](https://github.com/obviyus/musee/commit/c9b88b1b8cc183f4fde47ca5c79d289820952586))
* **favicon:** replace SVG favicon ([918473c](https://github.com/obviyus/musee/commit/918473c95b2b71e3d2ead108303580610fcd617a))
* **framer:** use `framer-motion` animations ([d93ff80](https://github.com/obviyus/musee/commit/d93ff80834d4076dbe2987a25317ca438a89d986))
* **image:** eager load first 5 images ([26751e5](https://github.com/obviyus/musee/commit/26751e5ae1dad080a0942dc897ab14e8bede21dc))
* **image:** generate WebP for thumbnails ([d09b7ae](https://github.com/obviyus/musee/commit/d09b7ae61f4220358d00c0ab23ecbcf2c1d5a3c6))
* **images:** add images ([bf1ee9d](https://github.com/obviyus/musee/commit/bf1ee9dae4797805e68014baa6250f454f031483))
* **images:** generate compressed variant ([4634309](https://github.com/obviyus/musee/commit/4634309d1eaa1472f17149e35681f3fa79a8b5b3))
* **image:** show larger images ([9f80df7](https://github.com/obviyus/musee/commit/9f80df76e1abec962ce7bac50462a81ed7578a33))
* **image:** upload new image ([d5a8710](https://github.com/obviyus/musee/commit/d5a8710509062b4c21c2e5ef2379d67cdfad8f35))
* **image:** use `sharp` for image processing ([fa9b43b](https://github.com/obviyus/musee/commit/fa9b43bbbba68eb24c9aca5205a3110982468989))
* **img:** attempt squoosh ([aecb5bb](https://github.com/obviyus/musee/commit/aecb5bb82d3984415b1530d9e1942473a7baa0a8))
* **img:** do not lazy load first 4 images ([c2cd219](https://github.com/obviyus/musee/commit/c2cd219463458ad87601ab0be3f8cecf28e69774))
* **img:** reduce thumbnail width ([7adeee3](https://github.com/obviyus/musee/commit/7adeee3ffaa542f453877a38c2e656488a5df5c8))
* **meta:** fix open graph tags ([7a99f40](https://github.com/obviyus/musee/commit/7a99f408ae7996a0a69f06f4ce3763cf8d96a4b5))
* **meta:** improve usage of meta-tags ([e219363](https://github.com/obviyus/musee/commit/e21936399a34f8ff39bf6e4c1ebe83d44271cbb2))
* **preview:** update preview thumbnail logic ([64e10be](https://github.com/obviyus/musee/commit/64e10be7b43aebb517e0f7723bdcea74d6c831c6))
* **slug:** create slugs for each image ([b7faa41](https://github.com/obviyus/musee/commit/b7faa414460a6a7a59e8417776104d080dc2da38))
* **v2:** init ([4b0bf43](https://github.com/obviyus/musee/commit/4b0bf43dd30b741938474ec2af8def59cf27d1aa))
* **v3:** migrate to Astro V3 ([3fb9fcc](https://github.com/obviyus/musee/commit/3fb9fcc07b5914873339cc843b013db5ebc97a04))
* **webp:** encode images in webp ([fcb8f9b](https://github.com/obviyus/musee/commit/fcb8f9b60b4ce2423a8b8b9a4942e76696c67ab5))
* **webp:** use webp for thumbnails ([8b7efc9](https://github.com/obviyus/musee/commit/8b7efc935c88e6fa159dfe41e66354e7aa65eb78))

## [1.14.2](https://github.com/obviyus/musee/compare/v1.14.1...v1.14.2) (2024-01-02)


### Bug Fixes

* **hash:** use consistent hashing based on filename ([1cd93e4](https://github.com/obviyus/musee/commit/1cd93e44e50c60c108d51dd554b8b6d7cc099df1))

## [1.14.1](https://github.com/obviyus/musee/compare/v1.14.0...v1.14.1) (2023-08-31)


### Bug Fixes

* **lazy:** fix lazy loading to reduce initial payload ([b4210fb](https://github.com/obviyus/musee/commit/b4210fb66956329752fc804e9cc54fc8c9219ad4))
* **misc:** typed import + remove log ([3b5f911](https://github.com/obviyus/musee/commit/3b5f911edbd052c939c849e6bdb2ebbbf0b9f33a))

# [1.14.0](https://github.com/obviyus/musee/compare/v1.13.3...v1.14.0) (2023-08-31)


### Features

* **v3:** migrate to Astro V3 ([6531cd9](https://github.com/obviyus/musee/commit/6531cd9b7225645f84ded06560794c73f4611e67))

## [1.13.3](https://github.com/obviyus/musee/compare/v1.13.2...v1.13.3) (2023-07-14)


### Bug Fixes

* **masonry:** use slug as index ([d178ee9](https://github.com/obviyus/musee/commit/d178ee90aa169f6120f4c09f6a997f9d40df709d))
* **types:** harder types for functions ([909d0d7](https://github.com/obviyus/musee/commit/909d0d7fd8978825fa893838f7a4f130cb615e48))

## [1.13.2](https://github.com/obviyus/musee/compare/v1.13.1...v1.13.2) (2023-05-12)


### Bug Fixes

* **image:** rename extension ([faac874](https://github.com/obviyus/musee/commit/faac874fa72a321efd374f92bd3238cc634623d0))

## [1.13.1](https://github.com/obviyus/musee/compare/v1.13.0...v1.13.1) (2023-05-07)


### Bug Fixes

* **layout:** link to original image on BaseImage ([7d3c7a1](https://github.com/obviyus/musee/commit/7d3c7a11f3fad7da030d0228ccdf13b154b84d7e))

# [1.13.0](https://github.com/obviyus/musee/compare/v1.12.0...v1.13.0) (2023-03-20)


### Features

* **dummy:** dummy commit to test CI ([d2ab7a1](https://github.com/obviyus/musee/commit/d2ab7a151c6f9abe846a5d97b7d76191c5adacd5))

# [1.12.0](https://github.com/obviyus/musee/compare/v1.11.1...v1.12.0) (2023-03-01)


### Features

* **dummy:** dummy commit to test CI ([2714292](https://github.com/obviyus/musee/commit/27142922118c8fe7c116636fdc799ffab1a8a895))

## [1.11.1](https://github.com/obviyus/musee/compare/v1.11.0...v1.11.1) (2023-02-26)


### Bug Fixes

* **image:** use sharp for processing images ([f688bd7](https://github.com/obviyus/musee/commit/f688bd7422c3e472ca61a0d6ac83f2055e6802b2))

# [1.11.0](https://github.com/obviyus/musee/compare/v1.10.0...v1.11.0) (2023-02-26)


### Bug Fixes

* **node:** return to node 16 and remove semrel ([692b167](https://github.com/obviyus/musee/commit/692b167c38ebdf1b4dd0a8527d36372b47aae714))


### Features

* **favicon:** replace SVG favicon ([00e2406](https://github.com/obviyus/musee/commit/00e2406f859c5920512ab1a5043a576f9d85816d))
* **img:** attempt squoosh ([28759b7](https://github.com/obviyus/musee/commit/28759b70c3e0d11cf088d733ebf08c48054281e4))

# [1.10.0](https://github.com/obviyus/musee/compare/v1.9.3...v1.10.0) (2023-02-26)


### Bug Fixes

* **image:** fix image building logic ([7b67715](https://github.com/obviyus/musee/commit/7b67715b74d3e8601842c387e547d1914a365ed7))


### Features

* **preview:** update preview thumbnail logic ([1e4b5fc](https://github.com/obviyus/musee/commit/1e4b5fca2dfe9c3043a01090885b942fe82abf94))

# [1.6.0](https://github.com/obviyus/musee/compare/v1.5.5...v1.6.0) (2022-10-23)


### Bug Fixes

* **CDN:** remove statically CDN ([a4936ef](https://github.com/obviyus/musee/commit/a4936ef68ad7bdaed507bd1dc7b4253b24e61cf8))


### Features

* **image:** upload new image ([ab52e25](https://github.com/obviyus/musee/commit/ab52e25903f9bbbdd83fd17ccb1162d81d69b522))

## [1.5.5](https://github.com/obviyus/musee/compare/v1.5.4...v1.5.5) (2022-09-21)


### Bug Fixes

* **component:** remove deprecated prop ([d5a3421](https://github.com/obviyus/musee/commit/d5a3421b320e33f5695b7e09cc5b0fc3c97e953d))
* **img:** remove auto-generated files ([d0b610d](https://github.com/obviyus/musee/commit/d0b610dac051bad1b236ba275e5ebcb4942f3bea))
* **importer:** handle `.JPG` files ([b316dba](https://github.com/obviyus/musee/commit/b316dbae89dfd7df3d7410c0e9cfdadd7679a9eb))

## [1.5.4](https://github.com/obviyus/musee/compare/v1.5.3...v1.5.4) (2022-09-11)


### Bug Fixes

* **git:** remove functions from VCS ([427859e](https://github.com/obviyus/musee/commit/427859eee6c688424a812b8ab2da4f807b97c03d))

## [1.5.3](https://github.com/obviyus/musee/compare/v1.5.2...v1.5.3) (2022-07-31)


### Bug Fixes

* **img:** temporary fix for images stretching on Safari ([03b2aa4](https://github.com/obviyus/musee/commit/03b2aa48f9f24dd8bcc874e9f4ff9cc8b81be8f6))

## [1.5.2](https://github.com/obviyus/musee/compare/v1.5.1...v1.5.2) (2022-07-31)


### Bug Fixes

* **meta:** remove parent description from image page ([0ed6d09](https://github.com/obviyus/musee/commit/0ed6d097d96edd1af08cd6bed843f30c0dd9ebd8))

## [1.5.1](https://github.com/obviyus/musee/compare/v1.5.0...v1.5.1) (2022-07-23)


### Bug Fixes

* **transition:** fix ever-increasing load delay ([a0e486c](https://github.com/obviyus/musee/commit/a0e486ce0d183e839abb492edc095bdc6957cab9))

# [1.5.0](https://github.com/obviyus/musee/compare/v1.4.0...v1.5.0) (2022-07-23)


### Bug Fixes

* **cdn:** re-add CDN links ([5b963cd](https://github.com/obviyus/musee/commit/5b963cdb708884aeab8af0f51cb7296c5c1a6aae))


### Features

* **framer:** use `framer-motion` animations ([b6e1947](https://github.com/obviyus/musee/commit/b6e194728ff3876413a257d330b9c5e1557b3f3a))

# [1.4.0](https://github.com/obviyus/musee/compare/v1.3.0...v1.4.0) (2022-07-22)


### Features

* **cdn:** convert to webp for card ([52030b4](https://github.com/obviyus/musee/commit/52030b4aba2ce25194908ff6ed0ce85474d45c31))
* **cdn:** use statically.io for image delivery ([7cdb05b](https://github.com/obviyus/musee/commit/7cdb05b4b9d5853ade5051486a7dcbccc3db1c88))

# [1.3.0](https://github.com/obviyus/musee/compare/v1.2.0...v1.3.0) (2022-07-22)


### Features

* **image:** eager load first 5 images ([8fedc0e](https://github.com/obviyus/musee/commit/8fedc0e8e9b08f1c4283a9a28a1d1a90942f50fc))
* **webp:** use webp for thumbnails ([a556ff1](https://github.com/obviyus/musee/commit/a556ff1aba72ff53a0c6e0403bb91534f95a088b))

# [1.2.0](https://github.com/obviyus/musee/compare/v1.1.2...v1.2.0) (2022-07-22)


### Features

* **image:** show larger images ([2bd52f9](https://github.com/obviyus/musee/commit/2bd52f91de7f602bcd54c395415dae5dcb63c7d1))

## [1.1.2](https://github.com/obviyus/musee/compare/v1.1.1...v1.1.2) (2022-07-22)


### Bug Fixes

* **link:** pre-fetch links on hover ([c3552cd](https://github.com/obviyus/musee/commit/c3552cd604295d75edf403cf719e6646227b16d5))

## [1.1.1](https://github.com/obviyus/musee/compare/v1.1.0...v1.1.1) (2022-07-22)


### Bug Fixes

* **link:** remove prefetching ([6318a0f](https://github.com/obviyus/musee/commit/6318a0ff9c033ac51c33ba687a7552facd190b43))

# [1.1.0](https://github.com/obviyus/galerie/compare/v1.0.0...v1.1.0) (2022-07-22)


### Features

* **image:** generate WebP for thumbnails ([e330cf7](https://github.com/obviyus/galerie/commit/e330cf79ad22298c62697220e0b9b39dea17a2ce))

# 1.0.0 (2022-07-22)


### Bug Fixes

* **css:** remove generated CSS ([355631e](https://github.com/obviyus/galerie/commit/355631ee6fd49073c65d5e7361a59cb5d2cdaba4))
* **images:** change image directory ([c9f3ee0](https://github.com/obviyus/galerie/commit/c9f3ee0ce1df2e7089d3eb64b50c1fa614df9ca7))
* **images:** fix image headers ([0b34c2b](https://github.com/obviyus/galerie/commit/0b34c2bf30caf1b889e1c420f8d1f9cd9c73bca2))
* **images:** restore lost EXIF ([832d568](https://github.com/obviyus/galerie/commit/832d568e40937c3f0bf91907ead87f6867451db6))
* **image:** use correct absolute image path ([c51fc0c](https://github.com/obviyus/galerie/commit/c51fc0cae539bd8f18ee1ed1ca5547c377fa9942))
* **imports:** use JS file ([68d443d](https://github.com/obviyus/galerie/commit/68d443d1d129dac2c0dea4803e2bddd7a5da3398))
* **imports:** use relative imports ([1e904b1](https://github.com/obviyus/galerie/commit/1e904b197ff25146124a111cdcb68c7f8276e30b))
* **index:** use absolute imports ([c52de26](https://github.com/obviyus/galerie/commit/c52de2667824f0a29be38c83e04ea53f95277994))
* **meta:** use absolute path for image ([dc97f7c](https://github.com/obviyus/galerie/commit/dc97f7c8044a801ee6b6976d3a137b7a688e3048))
* **package:** set name and description ([9e527ae](https://github.com/obviyus/galerie/commit/9e527aeab9d33ffa04e18c18ee71017ca73e28ca))


### Features

* **exif:** sort images by EXIF date ([c9b88b1](https://github.com/obviyus/galerie/commit/c9b88b1b8cc183f4fde47ca5c79d289820952586))
* **images:** add images ([df1dbbc](https://github.com/obviyus/galerie/commit/df1dbbc0ef698d6cda183ffd7a5df1b68abd1c39))
* **images:** generate compressed variant ([6b9344a](https://github.com/obviyus/galerie/commit/6b9344a3a11f4f34b9972dd9da4b0a7af1ee68c0))
* **meta:** improve usage of meta-tags ([50584cb](https://github.com/obviyus/galerie/commit/50584cb13ea27c849a9172eb993e911f4905b9d9))
