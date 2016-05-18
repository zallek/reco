import numeral from 'numeral';


const DEFAULT_THRESHOLD = 0.05;
const DEFAULT_GET_VALUE = res => res[0].data.count;
const POSITIVE_TRENDS = {
  down: -1,
  up: 1,
};


class Evolution {

  constructor({
    type,
    queries,
    getValue = DEFAULT_GET_VALUE,
    threshold = DEFAULT_THRESHOLD,
    positiveTrend = POSITIVE_TRENDS.up,
    message,
  }) {
    this.type = type;
    this.queries = queries;
    this.message = message;
    this.getValue = getValue;
    this.threshold = threshold;
    this.positiveTrend = positiveTrend;

    this.compute = this.compute.bind(this);
  }

  fetch(aggregate, fromAnalysis, toAnalysis) {
    return Promise.all([
      aggregate(fromAnalysis, this.queries),
      aggregate(toAnalysis, this.queries),
    ])
    .then(this.compute)
    .then(res => ({
      ...res,
      type: this.type,
      message: this.message(res),
    }));
  }

  compute([compare, current]) {
    const currentValue = this.getValue(current);
    const compareValue = this.getValue(compare);
    const diff = (currentValue - compareValue) / compareValue;
    return {
      status: this.positiveTrend * diff > this.threshold ? 1
            : this.positiveTrend * diff < -this.threshold ? -1
            : 0,
      weight: Math.abs(diff),
      currentValue,
      compareValue,
      diff,
      diffFormatted: numeral(diff).format('0.00%'),
    };
  }
}

export default Evolution;
