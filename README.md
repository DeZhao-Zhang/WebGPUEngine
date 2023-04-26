# WebGPUEngine

本项目的最终目的是为了提供一个基于WebGPU，快速搭建GIS数据可视化平台的库。

## 项目之初
- 以WebGPU学习为主，并逐渐提炼出通用的函数库
- 推广图像图形渲染相关知识(请大家多多关注 [**Wiki**](https://github.com/DeZhao-Zhang/WebGPUEngine/wiki) 和 [**CSDN专栏**](https://blog.csdn.net/u010206379/category_12298937.html?spm=1001.2014.3001.5482))

## 项目获取
1. 完整克隆(包含第三方项目)
```angular2html
git clone --recurse-submodules https://github.com/DeZhao-Zhang/WebGPUEngine.git
```

2. 按需克隆
```angular2html
git clone https://github.com/DeZhao-Zhang/WebGPUEngine.git
```


## 第三方项目使用指南

- [webgpu-samples](https://github.com/DeZhao-Zhang/WebGPUEngine#%E4%BD%BF%E7%94%A8webgpu-samples) & [原址](https://github.com/webgpu/webgpu-samples)
- [orillusion-webgpu-samples](https://github.com/DeZhao-Zhang/WebGPUEngine#%E4%BD%BF%E7%94%A8orillusion-webgpu-samples) & [原址](https://github.com/webgpu/webgpu-samples)

```angular2html
// 获取关联项目
git submodule init
git submodule update
```

### 使用`webgpu-samples`
默认访问链接 http://localhost:3000
```angular2html
cd third-project/webgpu-samples
npm install
npm start
```

### 使用`orillusion-webgpu-samples`
默认访问链接 http://localhost:3000
```angular2html
cd third-project/orillusion-webgpu-samples
npm install
npm run dev
```