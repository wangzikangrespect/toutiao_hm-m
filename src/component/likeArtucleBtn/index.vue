<template>
  <van-icon
    color="#777"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    @click="onlikeArt"
  />
</template>

<script>
import { likeArticleApi, cancelLikeArticleApi } from "@/api";
export default {
    name:'likeArticleBtn',
  props: {
    value: {
      type: [Number, String],
      require: true,
    },
    id: {
      type: [Number, String],
      require: true,
    },
  },
  methods: {
    async onlikeArt() {
      try {
        if (this.value === 1) {
          await cancelLikeArticleApi(this.id);
          this.$toast.success("取消点赞");
          this.$emit("input", -1);
        } else {
          await likeArticleApi({
            target: this.id,
          });
          this.$toast.success("点赞成功");
          this.$emit("input", 1);
        }
      } catch (err) {
        console.log(err);
        this.$toast.fail("操作失败，请稍后重试");
      }
    },
  },
};
</script>

<style>
</style>