export const setTopCoins = (state, payload) => {
  payload.forEach(coin => {
    coin.img = coin.symbol + ".png";
  })

  state.topCoins = payload;
}
