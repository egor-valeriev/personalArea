
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../redux/actions/user"
import { Contact } from "../elements/Contact";
import { ContactMenu } from "../elements/ContactMenu";

const ContactsPage = (props) => {
    const user = props.user;
    return (
        <div className="page__container">
            <ContactMenu/>
            <h2>Список контактов:</h2>
            {
                user.contacts.map(contact => (
                    <Contact key={contact.id}
                        id={contact.id}
                        name={contact.name}
                        email={contact.email}
                        tel={contact.tel}/>
                ))
            }
        </div>
    )
}

function mapStateToProps(state) {

    return {
        user: state.user.user
    }
    
}
const mapDispatchToProps = dispatch => ({
...bindActionCreators(userActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage)