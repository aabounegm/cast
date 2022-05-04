import { cookieName } from '../cookie-name';
import { populateListeningHistory } from '../populate-listening-history';
import { listeningHistory } from '../store';

jest.mock('$app/env', () => ({ browser: false }), { virtual: true });
jest.mock('../store', () => ({
  listeningHistory: {
    set: jest.fn().mockName('listeningHistory.set() from features/listening-history'),
  },
}));

it('deserializes the history from a cookie and writes it to the store', () => {
  const sampleIDs = [1, 2, 3, 4, 5, 6];
  populateListeningHistory({
    headers: new Headers({ Cookie: `${cookieName}=${JSON.stringify(sampleIDs)}` }),
  } as Request);

  expect(listeningHistory.set).toHaveBeenCalledWith(sampleIDs);
});
