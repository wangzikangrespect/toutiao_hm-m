<template>
  <van-button
    v-if="!isFollow"
    @click="onFollow"
    :loading="onloading"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    >关注</van-button
  >
  <van-button
    v-else
    @click="onFollow"
    :loading="onloading"
    round
    size="small"
    >已关注</van-button
  >
</template>

<script>
import { getFollowApi, deleteFollowApi } from "@/api";
export default {
  data() {
    return {
      onloading: false,
    };
  },
  methods: {
    //关注按钮
    async onFollow() {
      this.onloding = true;
      try {
        if (this.isFollow) {
          await deleteFollowApi(this.userId);
        } else {
          await getFollowApi({
            target: this.userId,
          });
        }
        this.$emit('cgIsFollow')
      } catch (err) {
        this.$toast("操作失败请稍后重试");
      }
      this.onloding = false;
    },
  },
  props: {
    isFollow: {
      require: true,
      type: Boolean,
    },
    userId: {
      type: [String, Number],
      require:true
    },
  },
};
</script>

<style>
</style>