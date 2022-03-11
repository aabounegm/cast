import { get } from 'svelte/store';
import { user } from '$lib/entities/user';
import { login, logout } from '../api/requests';

describe('Authorization', () => {
  it('logs In', () => {
    login();
    expect(get(user)).toBeTruthy();
    logout();
  });

  it('logs user out and clears the data', () => {
    login();
    logout();
    expect(get(user)).toBeFalsy();
  });
});
