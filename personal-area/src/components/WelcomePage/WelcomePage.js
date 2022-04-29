import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as userActions from "../../redux/actions/user";
import * as authActions from "../../redux/actions/auth"

const WelcomePage = (props) => {
    const Navigate = useNavigate();
    console.log(props);
    return (
        <div className="page__container">
            <h1>{`Добро пожаловать, ${props.user.name}!`}</h1>
            <Link to={'/contacts'} className="btn show-contacts">Посмотреть список контактов</Link>
        </div>
    )
}


const mapStateToProps = ({user, auth}) => ({
    user: user.user,
    auth: auth.auth
})


const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(userActions, dispatch),
    ...bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage)