<template>
  <van-icon
    color="#777"
    :name="value ? 'star' : 'star-o'"
    @click="onCollected"
  />
</template>

<script>
import { colArticleApi, cancelColArticleApi } from "@/api";
export default {
  name: "collectedBtn",
  props: {
    value: {
      type: Boolean,
      require: true,
    },
    articleId: {
      type: [Number, String],
      require: true,
    },
  },
  methods: {
    async onCollected() {
      try {
        if (this.value) {
          await cancelColArticleApi(this.articleId);
          this.$toast.success("已取消关注");
        } else {
          await colArticleApi({ target: this.articleId });
          this.$toast.success("已关注");
        }
        this.$emit("input", !this.value);
      } catch (err) {
        console.log(err);
        this.$toast.fail("操作失败");
      }
    },
  },
};
</script>

<style>
</style>