import { GroupPreview } from "./group-preview";


export function GroupList({ groups }) {


    return (
        <>
        <div className="group-list flex">

        {groups.map(group => <section className="group-wrapper flex" key={group.id}>
                <GroupPreview group={group} />
        </section>)}
        </div>
        </>
    )
}