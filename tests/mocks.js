// 在模拟的 window.matchMedia 对象中，
// 将 addListener 和 removeListener 方法都实现为 Jest mock 函数。
// 这样，当我们在测试中调用 window.matchMedia().addListener() 
// 或 window.matchMedia().removeListener() 时，
// 实际上是在调用 Jest mock 函数，而不是原生的 addListener 和 removeListener 方法
import { jest } from "@jest/globals";
const matchMediaMock = () => {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(matchMediaMock),
});

export { matchMediaMock };
