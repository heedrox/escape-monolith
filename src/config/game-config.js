import NumbersGame from '@/components/game/plugins/numbers-game/NumbersGame';
import MasterMind from '@/components/game/plugins/master-mind/MasterMind';
import { getNumberPlayers } from '@/lib/get-number-players';
import Whiteboard from '@/components/game/plugins/whiteboard/Whiteboard';
import PuzzleRoom8RotatingImages from '@/components/game/plugins/puzzle-room-8/PuzzleRoom8RotatingImages';
import { getPlayerNumber } from '@/lib/get-player-number';
import { isAdmin } from '@/lib/is-admin';
import playerCodes from './player-codes';

const anItem = (id, roomId, image, type = '') =>
  ({ id, roomId, image, type, corrupted: false, invisible: false });
const anAudioItem = (id, roomId, image, thumbnail) =>
  ({ id, roomId, image, thumbnail, type: 'MP3', corrupted: false, invisible: false });

const anInvisibleItem = (id, roomId, image, type = '') =>
  ({ id, roomId, image, type, corrupted: false, invisible: true });
const aCorruptedItem = (id, roomId, image, destinataries, type = '') =>
  ({ id, roomId, image, destinataries, type, corrupted: true });
const aDifferentItem = (id, roomId, imageA, imageB, destinataries) =>
  ({ id, roomId, imageA, imageB, destinataries, different: true });
const aDifferentItemMultiple = (id, roomId, images) =>
  ({ id, roomId, images, differentMultiple: true });
const anImageFor = (image, whoSees) => ({ image, whoSees });
const aPluginItem = (id, roomId, image, pluginVue) =>
  ({ id, roomId, image, pluginVue, plugin: true });
const byNumberDestinataries = (ifTwo, ifThree) => ({ ifTwo, ifThree });

const when2 = (resIf2, resIf3) => (getNumberPlayers() === 2 ? resIf2 : resIf3);

export default {
  defaultActiveRoom: 2,
  availableRooms: [2, 4, 5, 6, 7, 8, 9],
  players: playerCodes,
  codes: [
    '0000', //to test

    'MORID', //room2 - parte 1
    'HUMAN', //room2 - parte 2
    'OSHOY', //room2 - parte 3

    '4985', //room6 (stars)

    'G7B1B5', //room5 (touche)

    'DBFA', //room 9 - part 1
    'KNMI', //room 9 - part 2
    'XTRU', //room 9 - part 3
    'DBFAKNMIXTRU', //room 9 - all , just in case they try like this also

    'C', //room 8 puzzle easy
    'CANE', //room 8
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
    aDifferentItem(404, 4, 'tooche-pista-3.jpg', 'tooche-pista-3b.jpg', byNumberDestinataries([2], [1, 2])),

    anItem(501, 5, 'room-5.jpg'),
    anItem(502, 5, 'ladrillo-1.jpg'),
    aDifferentItem(503, 5, 'pista-tooche-1a.jpg', 'pista-tooche-1b.jpg', byNumberDestinataries([1], [1, 3])),
    anInvisibleItem(504, 5, '030-humanos-pistas.mp3', 'MP3'),

    anItem(601, 6, 'room-6.jpg'),
    anItem(602, 6, 'room-6-constelations.jpg'),

    anItem(701, 7, 'room7-entrance.mp4', 'VIDEO'),
    anItem(702, 7, 'room7.jpg'),
    anItem(703, 7, 'self-destruct.jpg'),
    anItem(704, 7, 'room7-instrucciones-1.jpg'),
    anItem(706, 7, 'monolith-ending.mp4', 'VIDEO'),

    anItem(802, 8, 'room-8.jpg'),
    aDifferentItemMultiple(803, 8,
      when2([
          anImageFor('1-puzle-easy-a.jpg', [1]),
          anImageFor('1-puzle-easy-b.jpg', [2]),
        ],
        [
          anImageFor('1-puzle-easy-a.jpg', [1]),
          anImageFor('1-puzle-easy-b.jpg', [2]),
          anImageFor('1-puzle-easy-c.jpg', [3]),
        ])
    ),
    when2(
      aDifferentItemMultiple(804, 8, [
        anImageFor('1-puzle-easy-c.jpg', [2])
      ]),
      anInvisibleItem(804, 8, '')
    ),
    //805 is only seen by player 1
    ((getPlayerNumber() === 1)||isAdmin()) ?
      aPluginItem(805, 8, '2-puzzle-images-thumb.jpg', PuzzleRoom8RotatingImages) :
      anInvisibleItem(805, 8, ''),
    //806 is only seen by player 2
    ((getPlayerNumber() === 2)||isAdmin()) ?
      anItem(806, 8, '2-puzzle-formula.jpg') :
      anInvisibleItem(806, 8, ''),
    //807 is seen by player 2 if two players, and seen by player number 3, if three players
    when2(((getPlayerNumber() === 2)||isAdmin()) ?
      anItem(807, 8, '2-puzzle-cuadros.jpg') :
      anInvisibleItem(807, 8, ''),
        ((getPlayerNumber() === 3)||isAdmin()) ?
      anItem(807, 8, '2-puzzle-cuadros.jpg') :
      anInvisibleItem(807, 8, '')
    ),
    aPluginItem(808, 8, 'whiteboard.jpg', Whiteboard),
    anInvisibleItem(809, 8, '040-humanos-idiotas-room-8.mp3', 'MP3'),


    anItem(901, 9, 'room-9.jpg'),
    aPluginItem(902, 9, 'alien-keypad.jpg', MasterMind),
    when2(
      aDifferentItemMultiple(903, 9, [
        anImageFor('aliens-2.jpg', [1]),
        anImageFor('aliens-1.jpg', [2])
      ]),
      aDifferentItemMultiple(903, 9, [
        anImageFor('aliens-2-3.jpg', [1]),
        anImageFor('aliens-1-3.jpg', [2]),
        anImageFor('aliens-1-2.jpg', [3])
      ])
    ),
    aDifferentItem(904, 9, 'tooche-pista-2.jpg', 'tooche-pista-2b.jpg', byNumberDestinataries([2], [2, 3])),

  ]
}
