<template>
  <a-layout-sider :width="width" style="background-color: #fff">
    <a-menu :default-selected-keys="[defaultSelectedKeys]" mode="inline">
      <a-menu-item v-for="menuItem in menuList" :key="menuItem.key">
        <router-link :to="menuItem.path">
          <a-icon :type="menuItem.iconType" />
          <span>{{ menuItem.title }}</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "AppMenu",
  props: {
    width: {
      type: Number,
      default: 200,
    },
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { router }) {
    // 通过计算属性根据当前路由路径来确定默认选中菜单项的key
    const defaultSelectedKeys = computed(() => {
      const currentPath = router?.currentRoute.value
        ? router.currentRoute.value.path
        : null;
      const matchedMenu = props.menuList.find(
        (item) => item.path === currentPath
      );
      return matchedMenu ? matchedMenu.key : null;
    });

    return {
      defaultSelectedKeys,
    };
  },
});
</script>
