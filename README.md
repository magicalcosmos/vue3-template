# Vue3-template

> vue3 template with vite4 + Axios + Element + Pinia

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8003, can connect personal machine for test
npm run local

# development: serve with hot reload at localhost:3003, common development backend
npm run r:dev

# future: serve with hot reload at localhost:3003, common future backend
npm run r:fudev

# build for production with minification
npm run deploy
# or
make

# run all tests
npm test
#or
npx jest

# check file syntax and format style
npm lint
```

## Code Submission Specifications


``` bash

# install dependencies
npm install -g commitizen
commitizen init cz-conventional-changelog --save-dev --save-exact --force
```
Simply use git cz or just cz instead of git commit when committing. You can also use git-cz, which is an alias for cz.

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Code Specifications

1. 所有Provide, Inject 变量加Key
2. Inject: 变量末尾加InjVar, 函数末尾加InjFun
3. Provide: 变量末尾加ProVar, 函数末尾加ProFun

当前面页

1. 事件使用'handle'
2. 私有使用'_'
