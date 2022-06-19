<template>
  <div>
    <van-nav-bar
      class="title"
      fixed
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 编辑框 -->
    <van-cell-group class="Info-cell">
      <input type="file" hidden ref="updataPhoto" @change="updataPhoto" />
      <van-cell title="头像" is-link center @click="$refs.updataPhoto.click()">
        <van-image
          class="userImg"
          slot="default"
          fit="cover"
          round
          :src="userInfo.photo"
        />
      </van-cell>
      <van-cell
        title="昵称"
        is-link
        :value="userInfo.name"
        @click="editNameShow = !editNameShow"
      />
      <van-cell
        title="性别"
        is-link
        :value="userInfo.gender === 0 ? '男' : '女'"
        @click="editGenderShow = true"
      />
      <van-cell title="生日" is-link :value="userInfo.birthday" />
    </van-cell-group>
    <!-- 编辑框 -->

    <!-- 昵称编辑框 -->
    <van-popup
      v-model="editNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <editName
        v-if="editNameShow"
        @close="editNameShow = false"
        @editName="userInfo.name = $event"
        :name="userInfo.name"
      ></editName>
    </van-popup>
    <!-- 昵称编辑框 -->

    <!-- 性别编辑框 -->
    <van-popup
      v-model="editGenderShow"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <!-- 标题栏 -->
      <van-picker
        v-if="editGenderShow"
        title="标题"
        show-toolbar
        :columns="columns"
        :default-index="userInfo.gender"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
      <!-- 标题栏 -->
    </van-popup>
    <!-- 性别编辑框 -->

    <!-- 头像编辑栏 -->
    <van-popup
      v-model="editPhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
      class="editPhoto"
    >
      <editPhoto
        @close="editPhotoShow = false"
        :img="img"
        @updataPhoto="userInfo.photo = $event"
      ></editPhoto>
    </van-popup>
    <!-- 头像编辑栏 -->
  </div>
</template>

<script>
import { perInfoApi, editUserInfoApi } from "@/api";
import editName from "@/view/editUserInfo/editName.vue";
import editPhoto from "@/view/editUserInfo/editPhoto.vue";
export default {
  name: "userInfo",
  data() {
    return {
      userInfo: {},
      editNameShow: false, //编辑姓名框状态
      editGenderShow: false, //编辑性别框状态
      editPhotoShow: false, //头像编辑器
      columns: ["男", "女"],
      img: null,
    };
  },
  components: {
    editName,
    editPhoto,
  },
  created() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      const {
        data: { data },
      } = await perInfoApi();
      this.userInfo = data;
    },
    async onConfirm(value, index) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      //点击确认触发的事件
      try {
        await editUserInfoApi({
          gender: index,
        });
        this.userInfo.gender = index;
        this.$toast.success("性别修改成功");
        this.editGenderShow = false;
      } catch (err) {
        console.log(err);
        this.$toast.fail("操作失败，请稍后尝试");
      }
    },
    // onChange(picker, value, index) {
    //   this.userInfo.gender = index;
    // },
    onCancel() {
      //点击取消的事件
      this.editGenderShow = false;
    },
    updataPhoto() {
      //首先声明img的值
      const file = this.$refs.updataPhoto.files[0];
      //将img转化成blob的格式
      this.img = window.URL.createObjectURL(file);
      //再将弹框弹出
      this.editPhotoShow = true;
      //最后清空file中的值
      this.$refs.updataPhoto.value = "";
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.title .van-icon {
  color: white;
}
.Info-cell {
  padding-top: 96px;
  .userImg {
    width: 60px;
    height: 60px;
  }
}
.van-popup {
  background-color: #f5f7f9;
}
.editPhoto.van-popup {
  background-color: black;
}
</style>>
