import { render } from 'preact';
import App from './components/app';
import './style/index.css'

const queryParams = new URLSearchParams(window.location.search)

const titleId = queryParams.get("titleId")
let currentEpisode = parseInt(queryParams.get("currentEpisode") ?? 1)

render(<App titleId={titleId} currentEpisode={currentEpisode} />, document.body);
