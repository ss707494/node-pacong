# slider-index 
**react组件**
类似手机联系人滑动索引

## Getting Started

```shell
npm install slider-index --save-dev
```

## Basic Usage

```jsx harmony
<Slider touchMoveCallback={(e, index) => { location.hash = index;} }
                    index="H"
                    centerStyle="center"
                    rightListStyle="rList"
            />
```

## Options

1. touchMoveCallback: e => { }, 滑动时回调函数
1. index: 'A', 初始化时默认选中元素
2. centerStyle:'', 中间弹窗样式名称
3. rightListStyle: '', 列表样式名称
4. rightListItemStyle: '', 列表元素样式名称
5. fontSizeInRight: '20', 列表中字体大小 单位px
6. fontSizeInCenter: '50', 列表中放大字体大小 单位px

## Run Demo

```shell
npm i 
npm start
```
open [http://localhost:8080](http://localhost:8080)

