import { mount } from '@vue/test-utils';
import Map from './Map.vue';

const ROOM_NUMBER = 1;

describe('Admin Map', () => {
  test('Unlocks room', () => {
    const wrapper = mount(Map);
    wrapper.vm.$firestoreRefs = { mapState: { update: () => { }}};

    wrapper.vm.adminUnlock(ROOM_NUMBER);

    expect(wrapper.vm.mapState.unlockedRooms.indexOf(ROOM_NUMBER)).toEqual(0);
  });

  test('Locks room again if unlocked', () => {
    const wrapper = mount(Map);
    wrapper.vm.mapState.unlockedRooms.push(ROOM_NUMBER);
    wrapper.vm.$firestoreRefs = { mapState: { update: () => { }}};

    wrapper.vm.adminUnlock(ROOM_NUMBER);

    expect(wrapper.vm.mapState.unlockedRooms.indexOf(ROOM_NUMBER)).toEqual(-1);
  });
});
