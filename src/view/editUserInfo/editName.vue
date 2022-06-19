<template>
  <div class="bgackground">
    <!-- 头部标签 -->
    <van-nav-bar
      title="标题"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="editName"
    />
    <!-- 头部标签 -->

    <!-- 输入框 -->
    <div class="inputBox">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入留言"
        show-word-limit
      />
    </div>
    <!-- 输入框 -->
  </div>
</template>


<script>
import { editUserInfoApi } from "@/api";
export default {
  name: "editNameIndex",
  props: {
    name: {
      type: [String, Number],
      require: true,
    },
  },
  data() {
    return {
      message: this.name,
    };
  },
  methods: {
    async editName() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        await editUserInfoApi({ name: this.message });
        this.$emit("editName", this.message);
        this.$toast.success("昵称修改成功");
        this.$emit("close");
      } catch (err) {
        console.log(err);
        this.$toast.fail("操作失败，请稍后重试");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.inputBox {
  padding: 20px;
}
</style>>
