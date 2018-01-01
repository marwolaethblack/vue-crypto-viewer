import moment from 'moment';


//Parses volume data from request
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
      //Volumefrom is the volume in the cryptocurrency e.g. volumefrom would be 2622BTC
      //Volumeto is the volume in the fiat currency e.g volumeto would be 245 546 212 USD
      const {volumeto, volumefrom} = priceData;
      const date = moment.unix(priceData.time).format(format);
      data.push([date, volumeto]);
    });
    
    data.unshift(['Date', 'Volume']);

    return data;
}

export default parseData;
