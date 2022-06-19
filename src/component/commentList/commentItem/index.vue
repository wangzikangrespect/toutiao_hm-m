<template>
  <van-cell-group>
    <van-cell>
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px"
        :src="commentItem.aut_photo"
      />
      <span style="color: #466b9d" slot="title">hello</span>
      <div slot="label">
        <p style="color: #363636">{{ commentItem.content }}</p>
        <p>
          <span style="margin-right: 10px">{{
            commentItem.pubdata | relativeTime
          }}</span>
          <van-button
            class="replyBtn"
            size="mini"
            type="default"
            @click="$emit('showPopu', commentItem)"
            >{{commentItem.reply_count}}回复</van-button
          >
        </p>
      </div>
      <div
        slot="right-icon"
        :class="{ islike: commentItem.is_liking }"
        class="like"
      >
        <van-icon
          :name="commentItem.is_liking ? 'like' : 'like-o'"
          @click="onLike"
        />
        <span>{{ commentItem.is_liking ? commentItem.like_count : "赞" }}</span>
      </div>
    </van-cell>
  </van-cell-group>
</template>

<script>
import { likecomtApi, cancelLikecomtApi } from "@/api";
export default {
  name: "commentItems",
  props: {
    commentItem: {
      type: Object,
      require: true,
    },
  },
  methods: {
    async onLike() {
      try {
        //触发事件如果已经点赞则触发取消点赞，否则点赞
        if (this.commentItem.is_liking) {
          await cancelLikecomtApi(this.commentItem.com_id);
        } else {
          await likecomtApi({ target: this.commentItem.com_id });
        }
        this.$emit("islike");
        this.$toast.success("操作成功");
      } catch (err) {
        console.log(err);
        this.$toast.fail("操作失败请稍后重试");
      }
    },
  },
};
</script>

<style scoped lang="less">
.like {
  span {
    margin-left: 20px;
  }
}
.islike {
  color: #f85959;
}
</style>