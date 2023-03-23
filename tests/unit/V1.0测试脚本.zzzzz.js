import { mount } from "@vue/test-utils";
import {message} from "ant-design-vue";
import { localAntdComponents } from "../mockAntdComponents";
import { matchMediaMock } from "../mocks";
import CompanyInfo from "@/views/company/index.vue";

describe("公司模块测试", () => {
  let wrapper;

  beforeEach(() => {
    matchMediaMock();
    wrapper = mount(CompanyInfo, {
      global: { $message: message },
      components: localAntdComponents,
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("通过关键字查询公司记录", async () => {
    // 设置搜索框中的输入内容
    wrapper.vm.searchValue = "AA";
    await wrapper.vm.$nextTick();
    // 验证表格中只显示包含'ABC'的记录
    expect(wrapper.findAll(".ant-table-row").length).toBe(1);
  });

  it("添加新的公司记录", async () => {
    // 点击新增按钮
    await wrapper.find(".ant-btn-primary").trigger("click");
    // 使用 $nextTick 等待 Vue 组件更新 DOM
    await wrapper.vm.$nextTick();
    // 填写表单
    const nameInput = wrapper.find('[name="name"]');
    if (nameInput.exists()) {
      await nameInput.setValue("A公司");
    }
    const addressInput = wrapper.find('[name="address"]');
    if (addressInput.exists()) {
      await addressInput.setValue("A地址");
    }
    const typeSelect = wrapper.find('[name="type"]');
    if (typeSelect.exists()) {
      await nameInput.setValue("0");
    }
    const datePicker = wrapper.find('[name="date"]');
    if (datePicker.exists()) {
      await datePicker.setValue("2011-01-01");
    }
    // 提交表单
    const handleOkButton = wrapper.findComponent({ ref: "AddModal" });
    if (handleOkButton.exists()) {
      await handleOkButton.vm.$emit("ok");
      // 使用 $nextTick 等待弹窗关闭并更新 DOM
      await wrapper.vm.$nextTick();

      // 验证表格中是否显示新增的记录
      const tableRows = wrapper.findAll(".ant-table-row");
      expect(tableRows.length).toBeGreaterThan(0);
      const lastRowText = tableRows[tableRows.length - 1].text();
      expect(lastRowText).toContain("New Company");
    }
  });

  it("编辑公司记录", async () => {
    // 点击第一条记录的编辑按钮
    const editBtn = await wrapper.findAll(".ant-table-row .ant-btn");
    if (editBtn.length > 0) {
      await editBtn.at(0).trigger("click");
    }
    // 使用 $nextTick 等待 Vue 组件更新 DOM
    await wrapper.vm.$nextTick();
    // 修改表单
    const nameInput = wrapper.find('[name="name"]');
    if (nameInput.exists()) {
      await nameInput.setValue("ABC");
    }
    const addressInput = wrapper.find('[name="address"]');
    if (addressInput.exists()) {
      await addressInput.setValue("ABC-1");
    }
    const typeSelect = wrapper.find('[name="type"]');
    if (typeSelect.exists()) {
      await nameInput.setValue("1");
    }
    const datePicker = wrapper.find('[name="date"]');
    if (datePicker.exists()) {
      await datePicker.setValue("2000-01-01");
    }
    // 提交表单
    const handleOkButton = wrapper.findComponent({ ref: "AddModal" });
    if (handleOkButton.exists()) {
      await handleOkButton.vm.$emit("ok");
      // 使用 $nextTick 等待弹窗关闭并更新 DOM
      await wrapper.vm.$nextTick();
      // 验证表格中是否显示编辑记录
      expect(wrapper.findAll(".ant-table-row").length).toBe(3);
      expect(wrapper.find(".ant-table-row:first-child").text()).toContain(
        "ABC"
      );
    }
  });

  it("删除公司记录", async () => {
    // 点击第二条记录的删除按钮
    const delBtn = await wrapper.findAll(".ant-table-row .ant-popover button");
    if (delBtn.length > 0) {
      await delBtn.at(1).trigger("click");
    }
    // 使用 $nextTick 等待 Vue 组件更新 DOM
    await wrapper.vm.$nextTick();
    // 确认删除
    const dangerBtn = await wrapper.find(".ant-btn-danger");
    if (dangerBtn.exists()) {
      await dangerBtn.trigger("click");
      // 等待 Vue 组件更新 DOM 完成后再进行断言验证
      await wrapper.vm.$nextTick();
      console.log(wrapper.findAll(".ant-table-row"));
      // 验证表格中是否成功删除记录
      expect(wrapper.findAll(".ant-table-row").length).toBe(2);
      expect(wrapper.find(".ant-table-row:last-child").text()).not.toContain(
        "BB"
      );
    }
  });
});

