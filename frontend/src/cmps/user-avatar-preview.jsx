export function UserAvatarPreview({ users }) {
    return <>
        {users.map(user => {
            return <div className="member" key={user._id}>
                {/* {user.substring(0, 2)} */}
                <img src={`${user.imgUrl}`} alt="" />
            </div>
        })}
    </>
}