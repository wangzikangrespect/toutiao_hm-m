<template>
  <div>
    <van-cell
      center
      class="searchBar"
      v-for="(value, index) in suggestionList"
      :key="index"
      :title="value"
      icon="search"
      @click="$emit('search', value)"
    >
      <div slot="title" v-html="highLight(value)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionApi } from "@/api";
import { debounce } from "lodash";
export default {
  name: "searchSuggestIndex",

  props: {
    searchText: {
      type: String,
    },
  },
  data() {
    return {
      //渲染数据
      suggestionList: [],
      getsuggestionList: null,
    };
  },
  methods: {
    async getSearchSuggestionFn(value) {
      try {
        const {
          data: {
            data: { options },
          },
        } = await getSearchSuggestionApi({ q: value });
        if (options[0]) {
          this.suggestionList = options;
        } else {
          this.suggestionList = [];
        }
      } catch (err) {
        this.$toast("获取数据失败");
      }
    },
    highLight(text) {
      const res = `<span class="red">${this.searchText}</span>`;
      // 构造函数RegExp返回的是一个正则规则。
      // 第一个参数表示正则校验内容
      // 第二个参数表示校验规则
      const reg = new RegExp(this.searchText, "gi");
      return text.replace(reg, res);
    },
  },
  watch: {
    searchText: {
      immediate: true,
      handler: debounce(function (newval) {
        this.getSearchSuggestionFn(newval);
      }, 500),
    },
  },
};
</script>

<style lang='less' scoped>
/deep/ .red {
  color: red !important;
}
</style>