## 面向问题
vue开发chrome扩展的脚手架，[*介绍详情可见*](https://juejin.cn/column/7148604325990776869)

## 使用
安装
```
npm i vue-chrome-cli -g
```
当前支持命令
```
vue-chrome-cli init
```
## 待完成
### 选择生成
实现新建脚手架时选择background等等功能；实现思路
1. 先下载再删除对应false的选项 
2. manifest.json需要动态生成
可以支持如下
1. background
2. popup
3. options
4. content_script
5. override_page
6. network

### 图标生成
用户输入icon名，自动在阿里巴巴矢量图标库中下载对应大小的一组icon