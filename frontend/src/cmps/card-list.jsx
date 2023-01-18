import { useState } from "react";
import { boardService } from "../services/board.service.local";
import { CardPreview } from "./card-preview";


export function CardList({ cards, addCard, group }) {

    return (
        <>
            <CardPreview cards={cards} />
            
        </>
    )
}