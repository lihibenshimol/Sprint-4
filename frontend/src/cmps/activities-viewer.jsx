import { RxActivityLog } from 'react-icons/rx';

export function ActivitiesViewer({ card, activities }) {

    console.log('activities = ', activities)
  
    return (
        <div className="card-activities">
            <section className="activities-header">
                <span>  <RxActivityLog /> </span>
                Activity
            </section>
        

            <div className='activities-details'>
                {activities && 
                activities.map(activity => <section key={activity._id}>
                    <h1>{activity.txt}</h1>
                </section>)
                }
            </div>
        </div>

    )
}








