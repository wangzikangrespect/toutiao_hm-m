<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="postComt" :disabled="!message.length">发布</van-button>
  </div>
</template>

<script>
import { postCommentsApi } from "@/api";
export default {
  name: "CommentPost",
  components: {},
  props: {
    id: {
      type: [Number, String],
      require: true,
    },
    aim: {
      type: Boolean,
      require: true,
    },
    target: {
      type: [Number, String],
      require: true,
    },
  },
  data() {
    return {
      message: "",
      commentInfo: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async postComt() {
      try {
        if (this.aim) {
          const {
            data: { data },
          } = await postCommentsApi({
            target: this.target,
            content: this.message,
          });
          console.log(data.new_obj);
          this.commentInfo = data.new_obj;
        } else {
          const {
            data: { data },
          } = await postCommentsApi({
            target: this.target,
            content: this.message,
            art_id: this.id,
          });
          console.log(data.new_obj);
          this.commentInfo = data.new_obj;
        }
        //将值利用vuex发送给commentList
        this.$store.commit("addCommentList", this.commentInfo);
        //关闭弹窗，并清空内容
        this.message = "";
        this.$emit("closePopu");
        this.$toast.success("评论发送成功");
      } catch (err) {
        console.log(err);
        this.$toast.fail("操作失败请稍后重试");
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>