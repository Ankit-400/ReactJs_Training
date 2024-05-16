import { useState } from "react"

export default function Player({ name: initialName, symbol, isActive, onChangeName }) {

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    const handleEditClick = function () {
        setIsEditing(editing => !editing);
        onChangeName(symbol, playerName);
    }

    const handleChange = function (e) {
        console.log(e.target);
        setPlayerName(e.target.value);
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {
                    isEditing
                        ? <input type="text" defaultValue={playerName} onChange={handleChange} required />
                        : <span className="player-name">{playerName}</span>
                }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li >
    )
}