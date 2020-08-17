const { getSolutionPath } = require('taskbook-test-utils');
const MiniMessenger = require(getSolutionPath('components/MiniMessenger'))
  .default;

describe('5-module-8-task', () => {
  describe('MiniMessenger', () => {
    it('MiniMessenger добавлен, но требует ручной проверки', async () => {
      expect(MiniMessenger).toBeDefined();
    });
  });
});
