import { useEffect, useState } from 'preact/hooks'

function Iframe(props) {
  const [source, setSource] = useState(props.source)

  useEffect(() => {
    setSource(props.source)
  }, [props.source])

  return (
    <iframe
      className='flex-1'
      src={source}
      frameBorder={0}
      allowFullScreen={true}
      webkitallowfullscreen={true}
      mozallowfullscreen={true}
    />
  );
}

export default Iframe;
