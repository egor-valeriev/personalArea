import { Icons } from "./Icons"

export const Contact = (props) => {

    return (
        <>
         <div className="contact__container">
            <section className="contact__item id">2</section>
            <section className="contact__item name">Egor Pavlov</section>
            <section className="contact__item tel">+79160887963</section>
            <section className="contact__item email">egor.valeriev@gmail.com</section>
            <section className="contact__item social">social</section>
            <button className="delete__btn"><Icons fill={'icon__trashbox'} name={'trashbox'}/></button>
            
         </div>
        </>
    )
}