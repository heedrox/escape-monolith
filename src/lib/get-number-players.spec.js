import { getNumberPlayers } from './get-number-players';

describe("GetNumberPlayers", () => {
  it('is 2 by default', () => {
    const numberPlayers = getNumberPlayers();
    expect(numberPlayers).toBe(2);
  });

  it('is 2 when is set', () => {
    givenLocation("http://maldicion/codigo/2/KENSENTME");
    const numberPlayers = getNumberPlayers();
    expect(numberPlayers).toBe(2);
  });
  it('is 3 when is set', () => {
    givenLocation("http://maldicion/codigo/3/KENSENTME");
    const numberPlayers = getNumberPlayers();
    expect(numberPlayers).toBe(3);
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
