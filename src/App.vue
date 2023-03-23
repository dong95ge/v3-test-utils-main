<!-- AppLayout.vue -->
<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <h1>{{ title }}</h1>
    </a-layout-header>
    <a-layout>
      <app-menu :menuList="menuList" :width="menuWidth" />
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
    </a-layout>
    <a-layout-footer class="footer">{{ copyRight }}</a-layout-footer>
  </a-layout>
</template>

<script>
import AppMenu from "@/components/Menu.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppLayout",
  components: {
    AppMenu,
  },
  data() {
    return {
      menuWidth: 200,
      menuList: [
        { key: "1", title: "公司管理", iconType: "setting", path: "/company", },
        { key: "2", title: "员工管理", iconType: "setting", path: "/user", },

      ],
      title: "Vue 3 VUE TEST UTILS",
      copyRight: "©2023 Created by BAI LLC",
    };
  },
});
</script>

<style scoped>
.layout {
  height: 100vh;
}
.header {
  background-color: #fff;
  padding: 0 16px;
}
.content {
  margin: 16px;
}
.footer {
  text-align: center;
}
</style>
