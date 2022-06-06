<template>
  <div>
    <router-view />
    <van-tabbar route class="tabBar">
      <van-tabbar-item replace to="/home">
        <i slot="icon" class="font_family icon-shouye"></i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/question">
        <i slot="icon" class="font_family icon-wenda"></i>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/video">
        <i slot="icon" class="font_family icon-shipin"></i>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/user">
              <i slot="icon" class="font_family icon-wode"></i>
        <span>我的</span>

      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
};
</script>

<style scope lang="less">
.tabBar{
    height: 103px;
    i{
        font-size: 40px;
    }
    span{
        font-size: 20px;
    }
}
</style>