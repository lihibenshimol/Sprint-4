export function UserAvatarPreview({ users }) {
    return <>
        {users.map(user => {
            return <div className="member" key={user}>
                {user.substring(0, 2)}
                {/* <img src="" alt="" /> */}
            </div>
        })}
    </>
}