export function DropDown(){
    return (
        <section onClick={(ev) => ev.stopPropagation()} className="dropdown">
            <h2>FROM DROP DOWN</h2>
        </section>
    )
}