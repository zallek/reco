import BotifySDK from 'botify-sdk';
import Evolution from './Evolution';


const activePages = new Evolution({
  type: 'Visits',
  message: ({ diffFormatted }) => `Number of actives pages increased by ${diffFormatted}`,
  queries: [
    new BotifySDK.Query().setFilters({
      field: 'visits.organic.all.nb',
      predicate: 'gt',
      value: 0,
    }),
  ],
});


export default [
  activePages,
];
