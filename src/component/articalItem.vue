<template>
  <div>
    <van-cell class="articleItem">
      <!-- 标题内容 -->
      <div slot="title">
        <span>{{ content.title }}</span>
      </div>
      <!-- 标题内容 -->
      <!-- 左边图片内容 -->
      <div slot="default" v-if="content.cover.type === 1">
        <van-image :src="content.cover.images[0]" fit="contain" />
        <span class="font_family icon-guanbi"></span>
      </div>
      <!-- 左边图片内容 -->
      <!-- 右下方文章信息 -->
      <div slot="label" class="left-info-span">
        <div v-if="content.cover.type === 3" class="img-three-flex">
          <van-image
            v-for="(path, index) in content.cover.images"
            :key="index"
            :src="path"
            fit="cover"
            class="img-cover"
          />
        </div>
        <span>{{ content.aut_name }}</span>
        <span>{{ content.comm_count }}条评论</span>
        <span>{{ content.pubdate | relativeTime }}</span>
        <span
          class="font_family icon-guanbi left-right"
          v-if="content.cover.type !== 1"
        ></span>
      </div>
      <!-- 右下方文章信息 -->
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
    },
  },
};
</script>

<style scope lang="less">
.van-cell {
  padding: unset;
  line-height: unset;
}
.articleItem {
  border-bottom: 1px solid #edeff3;
  padding: 29px 23px 30px;

  .van-cell__title,
  .van-cell__value {
    flex: unset;
  }
  .van-cell__title {
    flex: 1;
    font-size: 32px;
  }
  .van-cell__value {
    width: 232px;
    .van-image {
      width: 232px;
      height: 146px;
    }
  }
}
.left-info-span {
  padding-top: 43px;
}
.left-right {
  float: right;
}
.img-three-flex {
  display: flex;
  .img-cover {
    width: 232px;
    height: 146px;
    &:not(:last-child) {
      padding-right: 4px;
    }
  }
}
</style>
</style>