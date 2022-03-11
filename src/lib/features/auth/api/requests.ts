import { user } from '$lib/entities/user';

export const login = () => {
  user.set({
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
    name: 'John',
  });
};

export const logout = () => {
  user.set(null);
};
