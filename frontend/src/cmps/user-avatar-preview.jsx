export function UserAvatarPreview({ users }) {
    console.log('users: ',users)
    
    return <>
        {users.map(user => {
            return <div className="member" key={user._id}>
                {/* {user.imgUrl && */}
                {/* {user.substring(0, 2)} */}


                <img src={`${user.imgUrl}`} alt="" />
            </div>
        })}
    </>
}