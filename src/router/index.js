import { createRouter, createWebHistory } from 'vue-router'
import CompanyInfo from '@/views/company/index'
import UserInfo from "@/views/user/index";

const routes = [
  {
    path: "/",
    name: "home",
    component: CompanyInfo,
  },
  {
    path: "/company",
    name: "companyInfo",
    component: CompanyInfo,
  },
  {
    path: "/user",
    name: "userInfo",
    component: UserInfo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
