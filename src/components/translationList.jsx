import { useEffect, useState } from "preact/hooks";

import { fetchAnimeList } from '../services/anime';

function TranslationList(props) {
  const titleId = props?.titleId;
  const [items, setItems] = useState([])
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (titleId == null || fetched)
      return

    const fetchMedia = async () => {
      const data = await fetchAnimeList(titleId);
      setItems(data)
      setFetched(true)
      props.setIframeUrl(data[0].link)
    };
    fetchMedia();
  }, [props.titleId])

  const onChange = event => {
    props.setIframeUrl(event.target.value)
  }

  return <div className="flex grow flex-col">
    <label className='font-bold mb-1 text-[#c0caf5]' for='translationSelect'>Select translation</label>
    <select className='select-main' name='translationSelect' onChange={onChange}>
      {items.map((item, key) => (
        <option key={key} value={item.link}>{item.title}</option>
      ))}
    </select>
  </div>
}

export default TranslationList;
