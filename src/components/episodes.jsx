import { Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";

import { fetchShikiData } from '../services/anime';

function Episodes(props) {
  const titleId = props.titleId;

  const [episodes, setEpisodes] = useState(1);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (fetched && props.currentEpisode > episodes) {
      props.setCurrentEpisode(episodes)
    }
  }, [episodes])

  useEffect(() => {
    if (titleId == null || fetched)
      return

    const fetchData = async () => {
      const data = await fetchShikiData(titleId)
      if (data?.user_rate?.episodes != null) {
        props.setCurrentEpisode(data.user_rate.episodes + 1)
      }
      if (data.status == 'ongoing' && data.episodes_aired > 0) {
        setEpisodes(data.episodes_aired)
      } else {
        setEpisodes(data.episodes)
      }
      setFetched(true)
    }
    fetchData();

  }, [titleId])

  const onChange = event => {
    props.setCurrentEpisode(parseInt(event.target.value, 10))
  }

  const increment = () => {
    props.setCurrentEpisode(currentEpisode => { return currentEpisode + 1 })
  }

  const getEpisodesList = () => {
    return Array.from({ length: episodes }, (x, i) => i + 1)
  }

  const isLastEpisode = props.currentEpisode == episodes

  return <Fragment>
    <div className="flex grow flex-col">
      <label className='font-bold mb-1 text-[#c0caf5]' for='episodeSelect'>Select episode</label>
      <select className="select-main" name='episodeSelect' onChange={onChange} value={props.currentEpisode}>
        {getEpisodesList().map((item) => (
          <option key={item} value={item}>{item} episode</option>
        ))}
      </select>
    </div>
    <div className="flex place-self-end flex-col">
      <a class={`btn-main ${!isLastEpisode && 'cursor-pointer'}`} onClick={!isLastEpisode ? increment : undefined}>Next</a>
    </div>
  </Fragment>
}

export default Episodes;
