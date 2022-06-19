<template>
  <div class="article-comments" ref="comment">
    <!-- 评论列表 -->
    <van-list
      :immediate-check="reqType === 'a'"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 评论列表内容-->
      <commentItems
        v-for="(value, index) in Commentlist"
        :key="index"
        :commentItem="value"
        @islike="isLikeFn(index)"
        @showPopu="$emit('showPopu', $event)"
      ></commentItems>
      <!-- 评论列表内容 -->
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <div class="publish-wrap">
      <van-button class="postComment" round type="default" size="small" @click="show=true">回复评论</van-button>
    </div>
    <!-- /发布评论 -->

    <!-- popup回复评论 -->
            <van-popup v-model="show" position="bottom" :style="{ height: '20%' }">
          <!-- aim为真时则为对回复文章，若为假则为回复评论 -->
          <commentPost
            :aim="true"
            :target="id"
            :id="artid"

            @closePopu="show = false"
          ></commentPost>
        </van-popup>

    <!-- popup回复评论 -->

  </div>
</template>

<script>
import { getCommentApi } from "@/api";
import commentPost from "@/component/commentPost"
import commentItems from "@/component/commentList/commentItem";
export default {
  name: "ArticleComment",
  inject:['artid'],
  components: {
    commentItems,
    commentPost
  },
  props: {
    reqType: {
      type: [Number, String],
      require: true,
    },
    id: {
      type: [Number, String],
      require: true,
    },
  },
  data() {
    return {
      Commentlist: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      page: null, //加载评论的偏移量
      show:false //回复评论输入框Popu状态
    };
  },
  created() {
    this.onLoad();
  },

  methods: {
    async onLoad() {
      //加载首先获取的评论数据
      try {
        const {
          data: { data },
        } = await getCommentApi({
          type: this.reqType,
          source: this.id,
          offset: this.page,
          limit: 10,
        });
        //将总评论数传给父组件
        this.$emit("totalComment", data.total_count);
        //然后将发送给Commentlist,让其渲染
        this.Commentlist.push(...data.results);
        //并将该值传递给vuex中state中的commentList
        this.$store.commit("asCommentList", this.Commentlist);
        //将page的值改为last_id的值
        this.page = data.last_id;
        //加载完毕后loading设置为false
        this.loading = false;
        //然后检查数据是否以加载完毕，若完毕设置finished为true
        if (data.results.length < 10) {
          this.finished = true;
        }
      } catch (err) {
        console.log(err);
        this.$toast.fail("请求失败");
      }
    },
    isLikeFn(index) {
      this.Commentlist[index].is_liking = !this.Commentlist[index].is_liking;
      if (this.Commentlist[index].is_liking) {
        this.Commentlist[index].like_count++;
      } else {
        this.Commentlist[index].like_count--;
      }
    },
  },
  watch: {
    Commentlist: {
      deep: true,
      handler(newval) {
        this.$store.commit("asCommentList", newval);
      },
    },
  },
};
</script>

<style scoped lang="less">
.publish-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 88px;
  border: 1px solid #ebedf0;
  .postComment {
    width: 60%;
  }
}

.van-list {
  margin-bottom: 45px;
}
</style>