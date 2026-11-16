# RouteTrace 行迹

RouteTrace 行迹 Android 安装包下载页仓库。请从 [Releases](https://github.com/route-com/route/releases) 下载安装包；安装包只作为 Release 附件发布，不提交到 Git。

## 下载与每日测试构建

打开 [Releases](https://github.com/route-com/route/releases)，选择需要的版本并下载 APK。稳定安装包以 `RouteTrace-Android.apk` 发布；请优先选择最新正式 Release。

“每日 APK 构建”工作流会按源码内容指纹检查是否需要新包；无变化时跳过，有变化时分配高于已发布记录的正式版本与 `versionCode`，并更新稳定下载附件和版本化 APK。版本调整只发生在临时构建副本，不写回源码仓库。定时运行可能延迟，附件是否可用以 Actions 运行结果和 Releases 页面为准。
