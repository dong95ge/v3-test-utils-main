import { mount } from "@vue/test-utils"; 
import { message } from "ant-design-vue"; 
import { localAntdComponents } from "../mockAntdComponents"; 
import { matchMediaMock } from "../mocks"; 


export const createWrapper = (MyComponent) => {
  matchMediaMock(); // 使用mock对象匹配媒体查询的结果
  return mount(MyComponent, {
    global: { $message: message }, 
    components: localAntdComponents, 
  });
};

export const testCases = {
  searchByKeyword: async (wrapper, keyword, number) => {
    wrapper.vm.searchValue = keyword; // 设置搜索关键字
    await wrapper.vm.$nextTick(); 
    expect(wrapper.findAll(".ant-table-row").length).toBe(number); // 验证是否正确搜索出指定数量的表格行
  },
  addRecord: async (wrapper, record, number) => {
    await wrapper.find(".ant-btn-primary").trigger("click"); // 触发添加记录的按钮点击事件
    await wrapper.vm.$nextTick(); 
    await updateRecordFields(wrapper, record); // 处理输入记录的数据
    if (wrapper.find(".ant-modal-footer button").exists()) {// 检查是否存在提交操作的按钮
      await wrapper.find(".ant-modal-footer button").trigger("click"); // 触发提交操作的按钮点击事件
      await wrapper.vm.$nextTick(); 
      expect(wrapper.findAll(".ant-table-row").length).toBe(number); // 验证是否成功添加指定数量的表格行
    }
  },
  editRecord: async (wrapper, recordIndex, updatedRecord) => {
    const editButton = wrapper.findAll(".ant-btn-link")[recordIndex]; // 获取要编辑的记录的编辑按钮
    await editButton.trigger("click"); // 触发编辑按钮的点击事件
    await wrapper.vm.$nextTick(); 
    await updateRecordFields(wrapper, updatedRecord); // 处理更新后的数据
    if (wrapper.find(".ant-modal-footer button").exists()) {// 检查是否存在提交操作的按钮
      await wrapper.find(".ant-modal-footer button").trigger("click"); // 触发提交操作的按钮点击事件
      await wrapper.vm.$nextTick(); 
      expect(
        wrapper
          .findAll(".ant-table-row .ant-table-cell")
          [recordIndex * 4 + 1].html()
      ).toContain(updatedRecord.name); // 验证更新后的名称是否正确显示在表格中
    }
  },
  deleteRecord: async (wrapper, recordIndex, number) => {
    const deleteButton = wrapper.findAll(".ant-btn-dangerous")[recordIndex]; // 获取要删除的记录的删除按钮
    await deleteButton.trigger("click"); // 触发删除按钮的点击事件
    await wrapper.vm.$nextTick(); 
    if (wrapper.find(".ant-popover-confirm-btns .ant-btn-primary").exists()) {// 检查是否存在删除操作的提示框
      await wrapper
        .find(".ant-popover-confirm-btns .ant-btn-primary")
        .trigger("click"); // 触发删除操作的确认按钮点击事件
      await wrapper.vm.$nextTick(); 
      expect(wrapper.findAll(".ant-table-row").length).toBe(number); // 验证是否成功删除指定数量的表格行
    }
  },
};

// 根据属性的名称，在 DOM 中查找对应的输入框元素, 赋值
const updateRecordFields = async (wrapper, record) => {
  for (const field in record) {
    const input = wrapper.find(`[name="${field}"]`);
    if (input.exists()) {
      await input.setValue(record[field]);
    }
  }
};

describe("至少含有一条测试用例", () => {
  it("pass", () => {
    expect(true).toBe(true);
  });
});
