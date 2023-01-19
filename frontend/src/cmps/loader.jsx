import LoaderSvg from '../assets/img/loader.svg'

export function Loader() {
    return <>
        <img className='trello-loader' src={LoaderSvg} alt="Loading..." />
    </>
}