const anItem = (id, roomId, image, type = '') =>
  ({ id, roomId, image, type, corrupted: false });
const aCorruptedItem = (id, roomId, image, destinataries, type = '') =>
  ({ id, roomId, image, destinataries, type, corrupted: true });
const aDifferentItem = (id, roomId, imageA, imageB, destinataries) =>
  ( { id, roomId, imageA, imageB, destinataries, different: true });
const byNumberDestinataries = (ifTwo, ifThree) => ({ ifTwo, ifThree });

export default {
  defaultActiveRoom: 2,
  availableRooms: [2, 4, 5, 6, 7, 8, 9],
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
    anItem(201, 2, 'pared-de-tres-letras.jpg'),
    anItem(202, 2, 'pared-botones.jpg'),
    anItem(203, 2, 'pared-con-pista.jpg'),
    anItem(204, 2, 'pared-explicacion-planeta.jpg'),
    anItem(205, 2, 'letras.jpg'),
    anItem(206, 2, 'teclado-normal.jpg'),

    aCorruptedItem(207, 2, 'letras.jpg', byNumberDestinataries([1], [1, 2])),
    aCorruptedItem(208, 2, 'teclado-normal.jpg', byNumberDestinataries([2], [3])),
    aCorruptedItem(209, 2, 'teclado-reves.jpg', byNumberDestinataries([2], [3])),
    anItem(210, 2, 'humanos-idiotas.mp3', 'MP3'),

    anItem(401, 4, 'room-4.jpg'),
    anItem(402, 4, 'ladrillo-2.jpg'),

    anItem(501, 5, 'room-5.jpg'),
    anItem(502, 5, 'ladrillo-1.jpg'),
    aDifferentItem(503, 5, 'pista-tooche-1a.jpg', 'pista-tooche-1b.jpg', byNumberDestinataries([1], [1,3])),
    anItem(304, 3, 'tomb-room.jpg'),
    anItem(305, 3, 'closed-tomb.jpg'),
    anItem(310, 3, 'pergamino-in-tomb.jpg'),
    anItem(306, 3, 'lock-tomb-1.jpg'),
    anItem(307, 3, 'lock-tomb-2.jpg'),
    anItem(308, 3, 'open-tomb.jpg'),
    anItem(309, 3, 'the-end.mp4', 'VIDEO'),


  //  anItem(703, 7, 'movie-maldicion.mp4', 'VIDEO'),
  ]
}
