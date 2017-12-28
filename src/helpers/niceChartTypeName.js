const niceChartTypeName = (type) => {
  switch(type) {
    case 'month': {
      return 'Last 30 days';
      break;
    }

    case '24h': {
      return 'Last 24 hours';
      break;
    }

    case '6months': {
      return 'Last 6 months';
      break;
    }

    case 'year': {
      return 'Last year';
      break;
    }

    case 'all': {
      return 'All time';
      break;
    }
    default:
      return 'Last 30 days';
      break;
  }
};

export default niceChartTypeName;
