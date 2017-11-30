# metro-bundler

[![CircleCI Build Status](https://circleci.com/gh/facebook/metro-bundler.svg?style=shield)](https://circleci.com/gh/facebook/metro-bundler)
[![npm version](https://badge.fury.io/js/metro-bundler.svg)](http://badge.fury.io/js/metro-bundler)

🚇 The JavaScript bundler for React Native.

- **🚅 Fast**: We aim for sub-second reload cycles, fast startup and quick bundling speeds.
- **⚖️ Scalable**: Works with thousands of modules in a single application.
- **⚛️ Integrated**: Supports every React Native project out of the box.

This project was previously part of the [react-native](https://github.com/facebook/react-native) repository. In this smaller repository it is easier for the team working on Metro Bundler to respond to both issues and pull requests. See [react-native#13976](https://github.com/facebook/react-native/issues/13976) for the initial announcement.





## Custom

添加自定义的模块id,对基础包和业务包进行拆分功能.



在项目根目录添加config.json进行打包配置

```json
{
  "common": false,
  "version": "0.1.0",
  "desc": "bundle config",
  "outputPath": "modules.json",
  "entryModuleId": "TAOFILM12398"
}
```

**common**  是否为基础包

​	**必须**

> :标志本次打包是否为打基础包
>
> 如果为打基础包,则会生成modules.json和对应的基础包,打包命令和方式和官方一致

**version** 版本号

​	**非必须**

**desc** 描述

​	**非必须**

**outputPath** 基础包映射配置文件

​	**非必须**

​	默认值:	*modules.json*

**entryModuleId**	业务包入口模块的Id

​	**必须**

​	需要与原生协商一致,加载模块时需要传递的模块Id

​	

