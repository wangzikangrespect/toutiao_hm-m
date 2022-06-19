<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap" ref="articleContainer">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleContent.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleContent.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <!-- 用户头像 -->
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleContent.aut_photo"
          />
          <!-- 用户头像 -->

          <!-- 用户姓名 -->
          <div slot="title" class="user-name">
            {{ articleContent.aut_name }}
          </div>
          <!-- 用户姓名 -->

          <div slot="label" class="publish-date">
            {{ articleContent.pubdate }}
          </div>
          <!-- 关注按钮 -->
          <followBtn
            :isFollow="articleContent.is_followed"
            :userId="articleContent.aut_id"
            @cgIsFollow="
              articleContent.is_followed = !articleContent.is_followed
            "
            class="follow-btn"
          ></followBtn>
          <!-- 关注按钮 -->
        </van-cell>
        <!-- /用户信息 -->
        <!-- 文章内容 -->
        <div
          ref="articles-content"
          class="article-content markdown-body"
          v-html="articleContent.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论区域 -->
        <commentList
          class="articleComment"
          reqType="a"
          :id="articleId"
          @totalComment="totalComment = $event"
          @showPopu="replyShowFn"
        ></commentList>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="show = true"
            >写评论</van-button
          >
          <!-- 评论跳转 -->
          <van-icon
            name="comment-o"
            :badge="totalComment"
            color="#777"
            @click="scrollcomment"
          />
          <!-- 收藏按钮 -->
          <collectedBtn
            v-model="articleContent.is_collected"
            :articleId="articleId"
          ></collectedBtn>
          <!-- 点赞按钮 -->
          <likeArticleBtn
            v-model="articleContent.attitude"
            :id="articleId"
          ></likeArticleBtn>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 评论文章弹出层 -->
        <van-popup v-model="show" position="bottom" :style="{ height: '20%' }">
          <!-- aim为真时则为对回复文章，若为假则为回复文章 -->
          <CommentPost
            :aim="true"
            :target="articleId"
            @closePopu="show = false"
          ></CommentPost>
        </van-popup>
        <!-- 弹出层 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="this.errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticleAFn(articleId)"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 回复弹出层 -->
    <van-popup
      v-model="replyShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <commentReply
        v-if="replyShow"
        @closeReply="replyShow = false"
        :commentItem="presComment"
      ></commentReply>
    </van-popup>
    <!-- 回复弹出层 -->
  </div>
</template>

<script>
import { getArticleApi } from "@/api";
import { ImagePreview } from "vant";
import followBtn from "@/component/followBtn";
import collectedBtn from "@/component/collectedBtn";
import likeArticleBtn from "@/component/likeArtucleBtn";
import commentList from "@/component/commentList";
import CommentPost from "@/component/commentPost";
import commentReply from "@/component/commentReply";
export default {
  name: "ArticleIndex",
  components: {
    followBtn,
    collectedBtn,
    likeArticleBtn,
    commentList,
    CommentPost,
    commentReply,
  },
  provide: function () {
    return {
      artid: this.articleId,
    };
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      articleContent: "",
      loading: true,
      errStatus: "",
      aticleImgs: [],
      totalComment: 0,
      show: false,
      replyShow: false,
      presComment: {},
    };
  },
  created() {
    this.getArticleAFn(this.articleId);
  },
  methods: {
    async getArticleAFn(id) {
      //调用getArticleApi请求文章
      try {
        //成功则获取数据
        const {
          data: { data },
        } = await getArticleApi(id);
        this.articleContent = data;
        this.previewsImg();
      } catch (err) {
        //失败则判断状态并将状态反馈给data
        if (err.response && err.response.status === 404) {
          this.errStatus = err.response.status;
        }
      }

      //当结束后关闭loading
      this.loading = false;
    },
    previewsImg() {
      setTimeout(() => {
        const article = this.$refs["articles-content"];
        const imgs = article.querySelectorAll("img");
        imgs.forEach((value, index) => {
          this.aticleImgs.push(value.src);
          value.onclick = () => {
            ImagePreview({
              images: this.aticleImgs,
              startPosition: index,
              closeable: true,
            });
          };
        });
      }, 0);
    },
    scrollcomment() {
      const comment = document
        .querySelector(".articleComment")
        .scrollIntoView();
    },
    replyShowFn(comment) {
      this.replyShow = true;
      this.presComment = comment;
    },
  },
};
</script>

<style scoped lang="less">
// import 'github-markdown-css'

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>

