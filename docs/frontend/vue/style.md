# 样式相关问题

1. ### css - Vue js - 使样式被子组件继承

当我想为当前组件设置一个私有(private)样式时，我将它定义在一个标签中。 为了使样式对子组件可见，我使用了深度选择器让它通过，如下所示:

```vue
<style scoped>
::v-deep .b {
    ...
}
</style>

<style scoped>
:deep(.b) {
    ...
}
</style>

//或者去掉scoped
```
