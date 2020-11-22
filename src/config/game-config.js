import NumbersGame from '@/components/game/plugins/numbers-game/NumbersGame';
import MasterMind from '@/components/game/plugins/master-mind/MasterMind';
import { getNumberPlayers } from '@/lib/get-number-players';
import Whiteboard from '@/components/game/plugins/whiteboard/Whiteboard';

const anItem = (id, roomId, image, type = '') =>
  ({ id, roomId, image, type, corrupted: false, invisible: false });
const anAudioItem = (id, roomId, image, thumbnail) =>
  ({ id, roomId, image, thumbnail, type: 'MP3', corrupted: false, invisible: false});

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
    'G7B1B5', //room5
    'DBFA', //room 9 - part 1
    'KNMI', //room 9 - part 2
    'XTRU', //room 9 - part 3
    'DBFAKNMIXTRU', //room 9 - all , just in case they try like this also
    'DCBAM', //room 8
    'MUERTEYODESTRUCTOR', //room 7- final 18 letter passcode
  ],
  items: [
    anItem(201, 2, 'pared-de-tres-letras.jpg'),
    anItem(202, 2, 'pared-botones.jpg'),
    anItem(203, 2, 'pared-con-pista.jpg'),
    anItem(205, 2, 'letras.jpg'),
    anItem(206, 2, 'teclado-normal.jpg'),

    anInvisibleItem(210, 2, '000-transmission.mp3', 'MP3'),
    anInvisibleItem(211, 2, '010-humanos-idiotas.mp3', 'MP3'),
    anInvisibleItem(212, 2, '020-elevator.mp3', 'MP3'),

    anItem(401, 4, 'room-4.jpg'),
    anItem(402, 4, 'ladrillo-2.jpg'),
    aPluginItem(403, 4, 'numbers-game.jpg', NumbersGame),
    aDifferentItem(404, 4, 'tooche-pista-3.jpg', 'tooche-pista-3b.jpg', byNumberDestinataries([2], [1,2])),

    anItem(501, 5, 'room-5.jpg'),
    anItem(502, 5, 'ladrillo-1.jpg'),
    aDifferentItem(503, 5, 'pista-tooche-1a.jpg', 'pista-tooche-1b.jpg', byNumberDestinataries([1], [1,3])),

    anItem(601, 6, 'room-6.jpg'),
    anItem(602, 6, 'room-6-constelations.jpg'),

    anItem(701,7, 'room7-entrance.mp4', 'VIDEO'),
    anItem(702,7, 'room7.jpg'),
    anItem(703, 7, 'self-destruct.jpg'),
    anItem(704, 7, 'room7-instrucciones-1.jpg'),
    anItem(705, 7, 'room7-instrucciones-2.jpg'),
    anItem(706, 7, 'monolith-ending.mp4', 'VIDEO'),

    anAudioItem(801, 8, '040-humanos-idiotas-room-8.mp3', 'voice-3.gif'),
    anItem(802, 8, 'room-8.jpg'),
    aDifferentItem(803, 8, 'animales-solucion-1.jpg', 'animales-1.jpg', byNumberDestinataries([1], [1])),
    aDifferentItem(804, 8, 'animales-solucion-2.jpg', 'animales-2.jpg', byNumberDestinataries([1], [1])),
    aDifferentItem(805, 8, 'panel-room8-solucion.jpg', 'panel-room8.jpg', byNumberDestinataries([2], [3])),
    aPluginItem(806, 8, 'whiteboard.jpg', Whiteboard),

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
    aDifferentItem(904, 9, 'tooche-pista-2.jpg', 'tooche-pista-2b.jpg', byNumberDestinataries([2], [2,3])),

  ]
}
