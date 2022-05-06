
import { Icons } from "./Icons"

export const Contact = ({id, name, tel, email, vk}) => {

    return (
        <>
         <div className="contact__container">
            <section className="contact__item id">{id}</section>
            <section className="contact__item name">{name}</section>
            <section className="contact__item tel">{tel}</section>
            <section className="contact__item email">{email}</section>
            <section className="contact__item social">
                vk
            </section>
         
                <button className="edit__btn"><Icons fill={'icon icon__edit'} name={'edit'}/></button>
                <button className="delete__btn"><Icons fill={'icon icon__trashbox'} name={'trashbox'}/></button>

         
            
         </div>
        </>
    )
}