<template>
  <div>
    <div class="photoBox">
      <img :src="img" class="photo" />
    </div>
    <div class="bottom">
      <span class="cancel" @click="$emit('close')">取消</span>
      <span class="confirm" @click="updataPhoto">确定</span>
    </div>
  </div>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { updateMyPhotoApi } from "@/api";

export default {
  data() {
    return {
      cropper: null,
    };
  },
  props: {
    img: {
      type: [String, Object],
    },
  },
  mounted() {
    const img = document.querySelector(".photo");
    this.cropper = new Cropper(img, {
      aspectRatio: 1 / 1,
      viewMode: 1,
      dragMode: "move",
      cropBoxMovable: false,
      background: false,
    });
  },
  methods: {
    updataPhoto() {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        const fd = new FormData();
        fd.append("photo", blob);
        try {
          const {data}= await updateMyPhotoApi(fd);
          //通知父组件更新头像
          console.log(data)
          this.$emit("updataPhoto", data.data.photo);
          //关闭Popu弹出层
          this.$emit("close");
          this.$toast.success("头像更新成功");
        } catch (err) {
          console.log(err);
          this.$toast.fail("操作失败请重试");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.bottom {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 96px;
  width: 100%;
  padding: 0 30px;
  font-size: 30px;
  color: #3296fa;
}
.photo {
  display: block;

  max-width: 100%;
}
</style>>

