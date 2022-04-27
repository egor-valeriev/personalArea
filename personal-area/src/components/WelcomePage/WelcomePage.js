import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as userActions from "../../redux/actions/user"

const WelcomePage = (props) => {
    const Navigate = useNavigate();
    console.log(props);
    return (
        <div className="page__container">
            <h1>{`Добро пожаловать, ${props.user.name}!`}</h1>
            <h2>Тут будет список контактов</h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage)