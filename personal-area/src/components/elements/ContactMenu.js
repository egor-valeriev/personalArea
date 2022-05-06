import { useState } from "react"

export const ContactMenu = () => {
    const [isShowAdd, setShowAdd] = useState(false);
    const showMenuAdd = () => {
        setShowAdd(true);
    }
    const hideMenuAdd = () => {
        setShowAdd(false);
    }

    return (
        <nav className="menu__nav">
            <button>Filter</button>
            <input type={'text'}
                   className={'menu__nav-input-search'} />
            
            {isShowAdd ?
                <div className={`menu__add-contact`}>
                    <button onClick={hideMenuAdd}>-</button>
                </div> : 
                <button onClick={showMenuAdd}>+</button>}
                
            
        </nav>
    )
}