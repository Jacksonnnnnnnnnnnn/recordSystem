# NCU 研究記錄系統

Sensor記錄交班系統

## 建立原因
先前的記錄均由負責之護理師在 LINE 上回報，資料未標準化，很費人工，開發交班系統以便整合資料。

## 開發過程
原設計圖：

<img src="https://user-images.githubusercontent.com/38338405/132233077-930329e0-4bb0-42ab-8ae8-2c1109f059ec.png" width="400" height="500">

最終網頁頁面：

<img src="https://user-images.githubusercontent.com/38338405/132234703-ddc7746a-00d7-4eb4-870e-a3bbc3fd8878.png" width="400" height="500">

平板上的頁面：

<img src="https://user-images.githubusercontent.com/38338405/132235423-3d96eda8-77c8-4280-9141-a2e706cca0b5.png" width="400" height="500">


簡介功能：

![image](https://user-images.githubusercontent.com/38338405/132234508-2d4e6f7b-fa22-4b42-b151-4922c2c3a462.png)

![image](https://user-images.githubusercontent.com/38338405/132235728-917823ee-cf8c-4502-b5b3-f0e02e0e41b8.png)


## 開發工具
前端 : NUXT.js

後端 : Express.js

資料庫 : MySQL

### 此記錄系統搭配 sensor app 使用：

<img src="https://user-images.githubusercontent.com/38338405/132235857-6854a21e-7d1f-4581-b12b-9d78fbf28c62.png" width="300" height="400">

系統架構圖：

每一個病床皆有 sensors 記錄病人的腦波情況，因 sensor 無法直接連線到研究記錄系統，因此透過每一床的手機裡的 sensor app，接受 sensor 的資訊，再傳到 Server，最後交班系統會抓取 Server 的資訊，並顯示在頁面上。

![image](https://user-images.githubusercontent.com/38338405/132233942-b4112a0b-dd63-4096-a258-359268dbd669.png)


> 

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
