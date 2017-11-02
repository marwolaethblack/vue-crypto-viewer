export const setTopCoins = (state, payload) => {
  payload.forEach(coin => {
    coin.img = coin.symbol + ".png";
  })

  state.topCoins = payload;
}

export const selectCoin = (state , payload) => {
  state.selectedCoin = payload;
}

export const loadItem = (state , payload) => {
  state.loading.push(payload);
}

export const loadItemFinished = (state, payload) => {
  const i = state.loading.indexOf(payload);
  if(i != -1) {
    state.loading.splice(i,1);
  }
}

export const setCoinHistory = (state, payload) => {
  state.coinHistory = payload;
}

export const setCurrency = (state, payload) => {
  state.currency = payload;
}

export const setChartType = (state, payload) => {
  state.chartType = payload;
}
