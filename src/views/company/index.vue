<template>
  <div>
    <a-input-search
      v-model:value="searchValue"
      placeholder="请输入搜索内容"
      style="margin-bottom: 16px"
    />
    <a-button @click="showModal()" type="primary" style="margin-bottom: 16px"
      >新增</a-button
    >
    <a-table :columns="columns" :dataSource="filteredCompanies" rowKey="name">
      <template v-slot:bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <div style="display: flex">
            <a-button @click="onEdit(record)" type="link">编辑</a-button>
            <a-popconfirm
              title="确定要删除这条记录吗？"
              @confirm="onDelete(record)"
              ok-text="是"
              cancel-text="否"
            >
              <a-button type="link" danger>删除</a-button>
            </a-popconfirm>
          </div>
        </template>
        <template v-if="column.dataIndex === 'type'">
            {{ record.type === "0" ? '私企' : '国企' }}
        </template>
      </template>
    </a-table>
    <a-modal
      :title="titleText"
      v-model:visible.sync="visible"
      ok-text="提交"
      cancel-text="取消"
      @cancel="hideModal"
      @ok="onFinish"
    >
      <a-form ref="formRef" :model="currenItem" :rules="rules" @finish="onFinish">
        <a-form-item label="公司名称" name="name">
          <a-input v-model:value="currenItem.name" placeholder="请输入公司名称"/>
        </a-form-item>
        <a-form-item label="公司地址" name="address">
          <a-input v-model:value="currenItem.address" placeholder="请输入公司地址"/>
        </a-form-item>
        <a-form-item label="公司类型" name="type">
          <a-select
            ref="select"
            v-model:value="currenItem.type"
            style="width: 100%"
            placeholder="请选择公司类型"
          >
          <a-select-option value="0">私企</a-select-option>
          <a-select-option value="1">国企</a-select-option>
        </a-select>
        </a-form-item>
        <a-form-item label="注册时间" name="date">
          <a-date-picker v-model:value="currenItem.date" placeholder="请选择注册时间" style="width: 100%"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, computed, onMounted } from "vue";
import { message } from "ant-design-vue";
// import request from "@/utils/request";
import dayjs from 'dayjs';
const dateFormat = 'YYYY-MM-DD';
export default defineComponent({
  name: "CompanyInfo",
  components: {},
  setup() {
    const formRef = ref(null)
    const titleText = ref("新增");

    const columns = [
      { dataIndex: "name", title: "名称" },
      { dataIndex: "address", title: "地址" },
      { dataIndex: "type", title: "类型" },
      { dataIndex: "date", title: "注册时间" },
      { dataIndex: "action", width: "20%" }
    ];

    const companies = reactive([
      { name: "AA.", address: "AAAAA", type: "0", "date": "2001-01-01"},
      { name: "BB", address: "BBBBB", type: "1", "date": "1994-01-01"},
      { name: "CC", address: "CCCCC", type: "0", "date": "1995-01-01"}
    ]);
    const currenItem = reactive({ name: "", address: "", type: null, date: null });
    const editing = ref(false);
    const visible = ref(false);
    const searchValue = ref("");

    const formatDate = (date) => {
      const myDate = new Date(date);
      const year = myDate.getFullYear();
      const month = (myDate.getMonth() + 1).toString().padStart(2, '0');
      const day = myDate.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${day}-${month}`;
      return formattedDate
    }

    const fetchCompanies = async () => {
      try {
        // const response = await request.get("/api/companies");
        // companies.splice(0, companies.length, ...response.data);
      } catch (error) {
        message.error("获取列表失败");
      }
    };

    const addCompany = () => {
      try {
        companies.push({ ...currenItem });
        message.success("新增成功");
      } catch (error) {
        message.error("新增失败");
      }
    };

    const updateCompany = () => {
      try {
        Object.assign(
          companies.find((c) => c.id === currenItem.id), 
          { ...currenItem, 
            date: formatDate(currenItem.date)
          }
        );
        message.success("更新成功");
      } catch (error) {
        message.error("更新失败");
      }
    };

    const onFinish = async () => {
      await formRef.value.validate();
      if (!editing.value) {
        addCompany();
      } else {
        updateCompany();
      }
      hideModal();
    };

    const onDelete = async (company) => {
      try {
        // await request.delete(`/api/companies/${company.id}`);
        companies.splice(companies.indexOf(company), 1);
        message.success("删除成功");
      } catch (error) {
        message.error("删除成功");
      }
    };

    const showModal = () => {
      visible.value = true;
    };

    const onCreate = () => {
      titleText.value = "新增";
      showModal();
    };

    const onEdit = (company) => {
      editing.value = true;
      Object.assign(currenItem, {
        ...company,
        date: dayjs(company.date, dateFormat)
      });
      titleText.value = "编辑";
      showModal();
    };

    const hideModal = () => {
      editing.value = false;
      visible.value = false;
      currenItem.name = "";
      currenItem.address = "";
      currenItem.type = null;
      currenItem.data = null;
    };


    const filteredCompanies = computed(() => {
      return companies.filter((company) => {
        return (
          company.name
            .toLowerCase()
            .includes(searchValue.value.toLowerCase()) ||
          company.address
            .toLowerCase()
            .includes(searchValue.value.toLowerCase())
        );
      });
    });

    const rules = {
        name:[
          {required: true, message: '请输入公司名称', trigger: 'blur'}
        ],
        address:[
          {required: true, message: '请输入公司地址', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择公司类型', trigger: 'change'}
        ]
      
    }

    onMounted(() => {
      fetchCompanies();
    });

    return {
      columns,
      companies,
      currenItem,
      editing,
      visible,
      searchValue,
      filteredCompanies,
      titleText,
      rules,
      formRef,
      fetchCompanies,
      onFinish,
      onDelete,
      onCreate,
      onEdit,
      showModal,
      hideModal,
      formatDate
    };
  }
});
</script>
