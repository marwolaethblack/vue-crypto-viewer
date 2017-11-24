import moment from 'moment';


//Parses price data from request
//Returns array of arrays
const parseData = (coinHistory, currency) => {
    const data = [];
    let format = 'Do MMM';
    //Get the time period of prices by subtracting the date of the last price to the date of the first price
    const type = coinHistory.TimeTo - coinHistory.TimeFrom;

    switch(type) {
      //24hr
      case 86400: {
        format = 'HH:MM UTC Z';
        break;
      }
      //30days
      case 2592000: {
        format = 'Do MMM';
        break;
      }

      default: {
        format = 'Do MMM YYYY';
        break;
      }
    }

    coinHistory.Data.forEach(priceData => {
      const {high, low, open, close} = priceData;
      const date = moment.unix(priceData.time).format(format);
      data.push([date, low, open, close, high, `${date}\nOpen: ${open.toLocaleString()} ${currency}\nHigh: ${high.toLocaleString()} ${currency}\nLow: ${low.toLocaleString()} ${currency}\nClose: ${close.toLocaleString()} ${currency}`]);
    });

    return data;
}

export default parseData;
