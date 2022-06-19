<template>
  <div>
    <!-- 顶部区域 -->
    <van-nav-bar :title="commentItem.reply_count + '条回复'" fixed>
      <template #left>
        <van-icon name="cross" @click="$emit('closeReply')" />
      </template>
    </van-nav-bar>
    <!-- 顶部区域 -->
    <!-- 本条回复 -->
    <div class="presReply">
      <presComment :commentItem="commentItem"></presComment>
    </div>
    <!-- 本条回复 -->
    <van-cell-group>
      <van-cell title="全部回复" />
    </van-cell-group>
    <!-- 回复列表 -->
    <replyList :reqType="'c'" :id="commentItem.com_id"></replyList>
    <!-- 回复列表 -->
  </div>
</template>

<script>
import presComment from "@/component/commentList/commentItem";
//引入评论列表组件
import replyList from "@/component/commentList";

export default {
  name: "commentReply",
  props: {
    commentItem: {
      type: Object,
      require: true,
    },
  },
  components: {
    presComment,
    replyList,
  },
};
</script>

<style lang="less" scoped>
/deep/.presReply {
  padding-top: 92px;
  .replyBtn {
    display: none;
  }
}
</style>>

