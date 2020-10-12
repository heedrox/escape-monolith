import { getGameCode } from './get-game-code';

describe("GetGameCode", () => {
  it('gets game code by default', () => {
    const code = getGameCode();
    expect(code).toBe('default-code');
  })
});
