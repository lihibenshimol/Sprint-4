export function UserAvatarPreview({ users, onSetType }) {

    return (
        <div className="details">
            <h5>Members</h5>
            <article className="members-container">
                {users.map(user => {
                    return <div className="member" key={user._id}>
                        <img src={`${user.imgUrl}`} alt="" />
                    </div>
                })}
                <div className="member add-btn fa add"
                    onClick={(e) => onSetType(e, 'members')}></div>
            </article>
        </div>
    )
}