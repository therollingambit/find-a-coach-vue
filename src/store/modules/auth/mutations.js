export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userid = payload.userId;
    state.tokenExpiration = payload.tokenExpiration;
  },
};
