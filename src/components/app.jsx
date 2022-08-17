import { useEffect, useState } from 'preact/hooks';

import Iframe from './iframe';
import TranslationList from './translationList';
import Episodes from './episodes';
import OpenInMpv from './openInMpv';

function App(props) {
  const titleId = props?.titleId
  const [currentEpisode, setCurrentEpisode] = useState(props?.currentEpisode ?? 1)
  const [iframeUrl, setIframeUrl] = useState('')

  const getCurrentIframeUrl = () => {
    let link = new URL(`https:${iframeUrl}`)
    link.searchParams.set("only_episode", "true")
    link.searchParams.set("episode", currentEpisode)
    return link.toString()
  }

  useEffect(() => {
    let url = new URL(window.location)
    url.searchParams.set('currentEpisode', currentEpisode)
    window.history.pushState({}, '', url)
  }, [currentEpisode])

  return <div id="root" className='font-mono h-screen bg-[#1a1b26] text-[#a9b1d6]'>
    {titleId != null ?
      <div className='flex flex-row justify-center items-center w-full h-full'>
        <div className='flex flex-col max-w-7xl m-4 w-full h-[calc(100%-2em)] max-h-[45em]'>
          <div className='flex flex-row flex-initial align-stretch w-full mb-4 gap-5 items-stretch'>
            <TranslationList titleId={titleId} setIframeUrl={setIframeUrl} />
            <Episodes titleId={titleId} currentEpisode={currentEpisode} setCurrentEpisode={setCurrentEpisode} />
            {iframeUrl == "" ? '' : <OpenInMpv source={getCurrentIframeUrl()} />}
          </div>
          {iframeUrl == "" ? '' : <Iframe source={getCurrentIframeUrl()} />}
        </div>
      </div> : "TitleId not found"}
  </div>;
}

export default App;
