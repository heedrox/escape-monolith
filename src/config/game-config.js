const anItem = (id, roomId, image, type = '') =>
  ({ id, roomId, image, type, corrupted: false });
const aCorruptedItem = (id, roomId, image, destinataries, type = '') =>
  ({ id, roomId, image, destinataries, type, corrupted: true });

export default {
  defaultActiveRoom: 2,
  availableRooms: [2,4,5,6,7,8,9],
  players: {
    '481516': 1,
    'SAVETCSTW': 2,
    'KENSENTME': 3,
  },
  codes: [
    '0000', //to test
    'SPIG', //Qs and Os
    // '563403408', // poligonos cuadros
    '5703681924', // Tiburon
    'C4QN8', //cuadros archiduque
    '14396', //LEARN - Disney
    'EBGFA', //PIANO
    // 'OGALU', //runas
    '86204', //arana escarabajo ...
    '9454', //vela, ojo, constelacion, serpiente
    '9458', //vela, ojo, constelacion, serpiente
    'ELMOMO',
    // 'ELMOWOW',
    // 'OEMECWE',
  ],
  items: [
    anItem(101, 1, 'movie-tv.mp4', 'VIDEO'),
    aCorruptedItem(102, 1, 'cuadro-leopoldo-archiduque-pinturas.jpg', [1, 3]),
    anItem(104, 1, 'safe-box-in-1.jpg'),
    aCorruptedItem(105, 1, 'elmo-1.jpg', [1, 2]),

    anItem(201, 2, 'pared-de-tres-letras.jpg'),
    anItem(202, 2, 'pared-botones.jpg'),
    anItem(203, 2, 'pared-con-pista.jpg'),
    anItem(204, 2, 'pared-explicacion-planeta.jpg'),
    anItem(205, 2, 'letras.jpg'),

    anItem(301, 3, 'pasillo.jpg'),
    anItem(311, 3, 'pergamino-pasillo.jpg'),
    anItem(304, 3, 'tomb-room.jpg'),
    anItem(305, 3, 'closed-tomb.jpg'),
    anItem(310, 3, 'pergamino-in-tomb.jpg'),
    anItem(306, 3, 'lock-tomb-1.jpg'),
    anItem(307, 3, 'lock-tomb-2.jpg'),
    anItem(308, 3, 'open-tomb.jpg'),
    anItem(309, 3, 'the-end.mp4', 'VIDEO'),

    anItem(401, 4, 'frame-qo.jpg'),
    anItem(403, 4, 'frame-generic.jpg'),
    anItem(407, 4, 'frame-tiburon.jpg'),
    anItem(404, 4, 'piano.jpg', 'PIANO'),
    anItem(405, 4, 'door.jpg'),
    // anItem(408, 4, 'battery.jpg'),

    anItem(504, 5, '4-q-o-hint.jpg'),
    anItem(501, 5, '1-book-on-table.jpg'),
    anItem(507, 5, '7-safe-lock-tiburon.jpg'),
    anItem(502, 5, '2-door-to-dimension.jpg'),
    anItem(505, 5, '5-lock-door-dimension.jpg'),
    aCorruptedItem(508, 5, '8-elmo-2.jpg', [1, 2]),

    anItem(600, 6, 'room.jpg'),
    anItem(604, 6, 'more-room.jpg'),
    aCorruptedItem(602, 6, 'pergamino-cuadros.jpg', [2]),
    anItem(605, 6, 'pergamino-maldicion.jpg'),

    aCorruptedItem(704, 7, 'felpudo.jpg', [3]),
    anItem(705, 7, 'basement.jpg'),
    anItem(702, 7, 'videocamara-yesbatt.jpg'),
    anItem(703, 7, 'movie-maldicion.mp4', 'VIDEO'),
  ]
}
