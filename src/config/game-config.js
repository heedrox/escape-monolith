import NumbersGame from '@/components/game/plugins/numbers-game/NumbersGame';
import MasterMind from '@/components/game/plugins/master-mind/MasterMind';
import { getNumberPlayers } from '@/lib/get-number-players';

const anItem = (id, roomId, image, type = '') =>
  ({ id, roomId, image, type, corrupted: false, invisible: false });
const anInvisibleItem = (id, roomId, image, type = '') =>
  ({ id, roomId, image, type, corrupted: false, invisible: true });
const aCorruptedItem = (id, roomId, image, destinataries, type = '') =>
  ({ id, roomId, image, destinataries, type, corrupted: true });
const aDifferentItem = (id, roomId, imageA, imageB, destinataries) =>
  ( { id, roomId, imageA, imageB, destinataries, different: true });
const aDifferentItemMultiple = (id, roomId, images) =>
  ( { id, roomId, images, differentMultiple: true });
const anImageFor = (image, whoSees) => ({image, whoSees});
const aPluginItem = (id, roomId, image, pluginVue) =>
  ( { id, roomId, image, pluginVue, plugin: true });
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
    'MORID', //room2 - parte 1
    'HUMAN', //room2 - parte 2
    'OSHOY', //room2 - parte 3
    // '563403408', // poligonos cuadros
    '4985', //room6
    'C7B1xx', //room5
    'DBFA', //room 9 - part 1
    'KNMI', //room 9 - part 2
    'XTRU', //room 9 - part 3
    'DBFAKNMIXTRU', //room 9 - all , just in case they try like this also
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
    anInvisibleItem(210, 2, '000-transmission.mp3', 'MP3'),
    anItem(211, 2, '010-humanos-idiotas.mp3', 'MP3'),
    anInvisibleItem(212, 2, '020-elevator.mp3', 'MP3'),

    anItem(401, 4, 'room-4.jpg'),
    anItem(402, 4, 'ladrillo-2.jpg'),
    aPluginItem(403, 4, 'numbers-game.jpg', NumbersGame),


    anItem(501, 5, 'room-5.jpg'),
    anItem(502, 5, 'ladrillo-1.jpg'),
    aDifferentItem(503, 5, 'pista-tooche-1a.jpg', 'pista-tooche-1b.jpg', byNumberDestinataries([1], [1,3])),

    anItem(601, 6, 'room-6.jpg'),
    anItem(602, 6, 'room-6-constelations.jpg'),

    anItem(901, 9, 'room-9.jpg'),
    aPluginItem(902, 9, 'alien-keypad.jpg', MasterMind),
    (getNumberPlayers() === 2) ?
      aDifferentItemMultiple(903, 9, [
        anImageFor('aliens-2.jpg', [1]),
        anImageFor('aliens-1.jpg', [2])
        ]) :
      aDifferentItemMultiple(903, 9, [
        anImageFor('aliens-2-3.jpg', [1]),
        anImageFor('aliens-1-3.jpg', [2]),
        anImageFor('aliens-1-2.jpg', [3])
        ]),
    aDifferentItem(904, 9, 'pista-tooche-2.jpg', 'pista-tooche-2b.jpg', byNumberDestinataries([2], [2,3])),
    anItem(305, 3, 'closed-tomb.jpg'),
    anItem(310, 3, 'pergamino-in-tomb.jpg'),
    anItem(306, 3, 'lock-tomb-1.jpg'),
    anItem(307, 3, 'lock-tomb-2.jpg'),
    anItem(308, 3, 'open-tomb.jpg'),
    anItem(309, 3, 'the-end.mp4', 'VIDEO'),


  //  anItem(703, 7, 'movie-maldicion.mp4', 'VIDEO'),
  ]
}
