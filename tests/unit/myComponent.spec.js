import { createWrapper, testCases } from "./common.spec.js";
import components from "../components";

components.forEach(({ name, component, testData }) => {
  describe(name, () => {
    let wrapper;

    beforeEach(async () => {
      wrapper = createWrapper(component);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("测试根据关键字查询功能", async () => {
      await testCases.searchByKeyword(wrapper, testData.keyword, 1); // 执行查询操作
    });

    it("测试新增记录功能", async () => {
      const expectedCount = wrapper.findAll(".record").length + 1;
      await testCases.addRecord(
        // 执行新增记录操作
        wrapper,
        testData.record,
        expectedCount
      );
    });

    it("测试编辑记录功能", async () => {
      const recordIndex = 0;
      await testCases.editRecord(
        // 执行编辑记录操作
        wrapper,
        recordIndex,
        testData.updatedRecord
      );
    });

    it("测试删除记录功能", async () => {
      const expectedCount = wrapper.findAll(".record").length - 1;
      const recordIndex = 0;
      await testCases.deleteRecord(
        // 执行删除记录操作
        wrapper,
        recordIndex,
        expectedCount
      );
    });
  });
});
