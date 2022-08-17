const ANIMELIST_API_URL = 'https://anime.bytie.moe';
const SHIKIMORI_API_URL = 'https://shikimori.one/api';

export const fetchAnimeList = async (titleId) => {
  const res = await fetch(`${ANIMELIST_API_URL}/ext/search_by_id?shikimori_id=${titleId}`);
  const json = await res.json();
  const result = json.result.map((item) => {
    return {
      link: item.link,
      title: `${item.quality} | ${item.translation.title}`,
    };
  });
  return result;
};

export const fetchMpvUrl = async (url) => {
  const res = await fetch(`http://localhost:10000?${new URLSearchParams({ url })}`);
  const json = await res.json();
  return json;
};

export const fetchShikiData = async (titleId) => {
  const res = await fetch(`${SHIKIMORI_API_URL}/animes/${titleId}`);
  const json = await res.json();
  return json;
};
