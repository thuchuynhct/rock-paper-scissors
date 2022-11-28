import React from "react"
import "./Icon.css"

function Icon({ icon, onClick }: { icon: string, onClick?: React.MouseEventHandler }) {
    return (
        <div className='img' onClick={onClick}>
            <img src={icon} alt="Please Choose!" />
        </div>
    )
}

export default Icon