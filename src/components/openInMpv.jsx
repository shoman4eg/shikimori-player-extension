import { Component, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { fetchMpvUrl } from '../services/anime';

function OpenInMpv(props) {
  const [fetched, setFetched] = useState(false)
  const [result, setResult] = useState("")

  useEffect(() => {
    fetchMpvUrl(props.source)
    .then(response => {
      setResult(response.url)
      setFetched(true)
    })
  }, [props.source])

  return (
    <Fragment>
      {fetched ? <div className="flex place-self-end flex-col">
        <a className="btn-main" href={result}>Open in mpv</a>
      </div> : ""}
    </Fragment>
  )
}

export default OpenInMpv;
