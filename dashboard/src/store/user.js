import { reactive } from 'vue';

const userInitialState = {
  currentUser: {}
};

let state = reactive(userInitialState);

export default state;

export function resetUserStore () {
  state = reactive(userInitialState);
}

export function cleanCurrentUser () {
  state.currentUser = {};
}

export function setCurrentUser (user) {
  state.currentUser = user;
}

export function setApiKey (apikey) {
  const currentUser = { ...state.currentUser, apikey };
  state.currentUser = currentUser;
}
