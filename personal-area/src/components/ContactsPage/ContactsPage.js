import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../redux/actions/user"

const ContactsPage = (props) => {
    console.log(props);
    return (
        <div className="page__container">
            <h1>{`Добро пожаловать, ${props.user.name}!`}</h1>
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