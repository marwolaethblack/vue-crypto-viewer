const niceChartTypeName = (type) => {
  switch(type) {
    case 'month': {
      return 'Past 30 days';
      break;
    }

    case '24h': {
      return 'Past 24 hours';
      break;
    }
    
    case 'week': {
      return 'Past 7 days';
      break;
    }
    
    case '2weeks': {
      return 'Past 14 days';
      break;
    }

    case '6months': {
      return 'Past 6 months';
      break;
    }

    case 'year': {
      return 'Past year';
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
