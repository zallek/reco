import BotifySDK from 'botify-sdk';


const newActivePages = {
  type: 'Visits',
  message: ({ nbNewActivePages }) => `Number of actives pages increased by ${nbNewActivePages} %`,
  compute: (aggregate, compareAggregate) => compareAggregate([
    new BotifySDK.Query().setFilters({
      field: 'visits.organic.all.nb',
      predicate: 'gt',
      value: 0,
    }),
  ]).then(([previous, current]) => {
    const nbNewActivePages = current.count > previous.count;
    return {
      active: nbNewActivePages > 0,
      nbNewActivePages,
    };
  }),
};

export default [
  newActivePages,

];
