import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function FilterByUser({ member, setGroupsToDisplay }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const [userCards, setUserCards] = useState([])
    const [resultsPopup, setResultsPopup] = useState(false)
    const navigate = useNavigate()

    function getUserCards(userId) {
        let filteredCards = []
        let newGroups = []
        board.groups.forEach(group => {
            let newG = {...group, cards: []}
            group.cards.map(card => {
                if (card.members.filter(member => member._id === userId).length > 0) {
                    newG.cards.push(card)
                }
            })
            // group.cards.forEach(card => {
            //     if (card.members.filter(member => member._id === userId).length > 0)
            //     filteredCards.push(card)
            // })
            newGroups.push(newG)
        })

        console.log('newGroups = ', newGroups)
        // setUserCards(filteredCards)
        // setResultsPopup(!resultsPopup)
        setGroupsToDisplay(newGroups)
    }

    // function goToCard(cardId) {
    //     let group = board.groups.find(group => group.cards.find(card => card.id === cardId));
    //     let groupId = group ? group.id : undefined;
    //     navigate(`/board/${board._id}/g/${groupId}/c/${cardId}`)
    // }



    return (
        <>
            <div className="member" onClick={() => getUserCards(member._id)}>
                <img src={`${member.imgUrl}`} alt="member" className='member-img' />
                <span>{member.fullname}</span>
            </div>

            {/* {resultsPopup && <div className="assigned-cards">
                <span className="title">Cards assigned to {member.fullname}</span>
                <ul> {userCards?.map(card => <li key={card.id} onClick={() => goToCard(card.id)} style={{ color: 'black' }}>
                    {card.title}
                </li>
                )}
                </ul>
            </div>
            } */}
        </>
    )
}