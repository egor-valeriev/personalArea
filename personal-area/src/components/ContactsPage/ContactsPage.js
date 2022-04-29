import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../redux/actions/user"
import { Contact } from "../elements/Contact";

const ContactsPage = (props) => {
    console.log(props);
    return (
        <div className="page__container">
            <Contact/>
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