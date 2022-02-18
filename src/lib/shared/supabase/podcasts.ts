import supabaseClient from './client';

interface Podcast {
  id: number;
  title: string;
  cover_url: string;
  author: string;
  inserted_at: Date;
  updated_at: Date;
}

export const podcastsRead = async () => {
  const res = await supabaseClient.from<Podcast>('test').select();
  // const res = await supabaseClient.from<Podcast>('podcasts').select();
  console.log(res);
};

export const podcastsGet = async (id: number) => {
  const res = await supabaseClient.from<Podcast>('podcasts').select().eq('id', id).single();
  console.log(res);
};
