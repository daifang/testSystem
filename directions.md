# 说明文档
- ## *Markdown文件*
- ### src目录:存放所有组件和页面文件
    - ## components: 组件文件
        - ### Input.js : 输入框
        - ### Button.js : 按钮
    - ## css : css样式
    - ## pages : 各个页面文件
        - ### Change.js ：  修改信息
        - ### ClasseIs.js : 章节页
        - ### Detail.js : 个人信息页
        - ### Final.js : 期末考试查询
        - ### Login.js : 登录页
        - ### Mine.js : 首页
        - ### Msg.js : 消息页，这个功能还没上
        - ### Result.js : 成绩查询
        - ### ResultDetail.js : 错题(从TestDetail跳转)
        - ### ResultDetail1.js : 错题(从TestDetail1跳转)
        - ### TestDetail.js : 成绩页(从Result跳转，查询成绩)
        - ### TestDetail1.js : 成绩页(从Test跳转，考完试)
        - ###  Section.js : 看完视频，点击按钮考试页
        - ### Sets.js : 设置
        - ### Test.js : 考试页（最烂的一页）
    - ## App.js : 哈希地址的配置
    - ## index.js : 页面输出文件，不用改
    - ## serviceWorker.js/setupTests.js : 配置文件
    - # setupProxy.js : 跨域配置文件
- # public : 存放图片视频类静态文件
- # 常用命令
    - ## npm start  启动服务
    - ## yarn 安装node_modules依赖包
    - ## npm run build 打包，打包完成记得修改下js，css引入路径
