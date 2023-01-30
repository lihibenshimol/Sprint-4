import LoaderSvg from '../assets/img/loader.svg'

export function Loader() {
    return <>
        <section className='loader'>
            <img className='trello-loader' src={LoaderSvg} alt="Loading..." />
        </section>
    </>
}