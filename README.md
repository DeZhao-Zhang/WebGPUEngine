# WebGPUEngine

本项目的最终目的是为了提供一个基于WebGPU，快速搭建GIS数据可视化平台的库。


## Install and Run

Type the following in any terminal:

```bash
# Clone the repo
git clone https://github.com/DeZhao-Zhang/WebGPUEngine.git

# Go inside the folder
cd WebGPUEngine

# Start installing dependencies
npm install #or yarn

# Run project at localhost:3000
npm run dev #or yarn run dev
```

## Project Layout

```bash
├─ 📂 node_modules/   # Dependencies
│  ├─ 📁 @webgpu      # WebGPU types for TS
│  └─ 📁 ...          # Other dependencies (TypeScript, Vite, etc.)
├─ 📂 src/            # Source files
│  ├─ 📁 shaders      # Folder for shader files
│  └─ 📄 *.ts         # TS files for each demo
├─ 📂 samples/        # Sample html
│  └─ 📄 *.html       # HTML entry for each demo
├─ 📄 .gitignore      # Ignore certain files in git repo
├─ 📄 index.html      # Entry page
├─ 📄 LICENSE         # MIT
├─ 📄 logo.png        # Orillusion logo image
├─ 📄 package.json    # Node package file
├─ 📄 tsconfig.json   # TS configuration file
├─ 📄 vite.config.js  # vite configuration file
└─ 📄 readme.md       # Read Me!
```

## How to enable WebGPU
1. We have embedded a WebGPU Origin-Trail token in `vite.config.js`, you can use WebGPU at `localhost:3000` via Chrome v94-105
2. For Edge Canary, please open `edge://flags/#enable-unsafe-webgpu`, and enable the flag
3. For FireFox Nightly, please open `about:config`, and change `dom.webgpu.enabled` to `true`


[**WebGPU Engine Demo**](https://dezhao-zhang.github.io/WebGPUEngine/)

## 项目之初
- 以WebGPU学习为主，并逐渐提炼出通用的函数库
- 推广图像图形渲染相关知识(请大家多多关注 [**Wiki**](https://github.com/DeZhao-Zhang/WebGPUEngine/wiki) 和 [**CSDN专栏**](https://blog.csdn.net/u010206379/category_12298937.html?spm=1001.2014.3001.5482))
- 借鉴于[Orillusion-webgpu-samples](https://github.com/Orillusion/orillusion-webgpu-samples.git)
