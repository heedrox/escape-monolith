import { getGameCode } from './get-game-code';

describe("GetGameCode", () => {
  it('gets game code by default', () => {
    const code = getGameCode();
    expect(code).toBe('default-code');
  });

  it('gets game code if URL is correct', () => {
    givenLocation("http://maldicion/codigo/KENSENTME");
    const code = getGameCode();
    expect(code).toBe('codigo');
  });

  it('gets game code if URL is correct with last slash', () => {
    givenLocation("http://maldicion/codigo/KENSENTME/");
    const code = getGameCode();
    expect(code).toBe('codigo');
  });

  it('gets game code if URL is correct with more subdata', () => {
    givenLocation("http://maldicion/codigo/KENSENTME/pepep/#123");
    const code = getGameCode();
    expect(code).toBe('codigo');
  });
});

function givenLocation(url) {
  delete global.window.location;
  global.window = Object.create(window);
  Object.defineProperty(window, 'location', {
    value: {
      href: url
    },
    writable: true
  });
}
