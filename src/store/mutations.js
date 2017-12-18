export const loadItem = (state , payload) => {
  state.loading.push(payload);
}

export const loadItemFinished = (state, payload) => {
  const i = state.loading.indexOf(payload);
  if(i != -1) {
    state.loading.splice(i,1);
  }
}


export const setAllCoins = (state, payload) => {
  state.allCoins = payload;
}
