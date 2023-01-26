import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function FilterByUser({ card, board, member }) {
    const [userCards, setUserCards] = useState([])
    const [resultsPopup, setResultsPopup] = useState(false)
    const navigate = useNavigate()

    function getUserCards(userId) {
        let filteredCards = []
        board.groups.forEach(group => {
            group.cards.forEach(card => {
                if (card.members.filter(member => member._id === userId).length > 0)
                    filteredCards.push(card)
            })
        })
        setUserCards(filteredCards)
        setResultsPopup(!resultsPopup)
    }

    function goToCard(cardId) {
        let group = board.groups.find(group => group.cards.find(card => card.id === cardId));
        let groupId = group ? group.id : undefined;
        navigate(`/board/${board._id}/g/${groupId}/c/${cardId}`)
    }



    return (
        <>
            <div className="member" onClick={() => getUserCards(member._id)}>
                <img src={`${member.imgUrl}`} alt="member" className='member-img' />
                <span>{member.fullname}</span>
            </div>

            {resultsPopup && <span> {userCards?.map(card => <button key={card.id} onClick={() => goToCard(card.id)} style={{ color: 'black' }}>
                {card.title}
            </button>
            )}
            </span>
            }
        </>
    )
}