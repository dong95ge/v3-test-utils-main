// 导入待测组件、配置单测数据
import CompanyInfo from "@/views/company/index.vue";
import UserInfo from "@/views/user/index.vue";

export default [
  {
    name: "公司模块测试",
    component: CompanyInfo,
    testData: {
      keyword: "AA",
      record: {
        name: "XX",
        address: "XX-1",
        type: "0",
        date: "2021-01-01",
      },
      updatedRecord: {
        name: "YY",
        address: "YY-1",
        type: "1",
        date: "2022-02-02",
      },
    },
  },
  {
    name: "用户模块测试",
    component: UserInfo,
    testData: {
      keyword: "BB",
      record: {
        name: "XXX",
        address: "XXX-1",
        type: "0",
        date: "2021-01-01",
      },
      updatedRecord: {
        name: "YYY",
        address: "YYY-1",
        type: "1",
        date: "2021-02-02",
      },
    },
  },
];
