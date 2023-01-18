
export function UserAvatarPreview({ users }) {
    console.log('user from little preview: ', users)

    return <>
        {users.map(user => {
            return <div className="member" key={user}>
                {user.substring(0, 2)}
                {/* <img src="" alt="" /> */}
            </div>
        })}
    </>
}