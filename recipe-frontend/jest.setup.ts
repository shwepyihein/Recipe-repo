// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'intersection-observer';
import 'jest-canvas-mock';

global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// class IntersectionObserver {
//   observe() {}
//   unobserve() {}
// }

// Object.defineProperty(window, 'IntersectionObserver', {
//   writable: true,
//   configurable: true,
//   value: IntersectionObserver,
// });
