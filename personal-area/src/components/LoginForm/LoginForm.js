import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getData } from "../helpers/api";
import { host } from "../helpers/constant";
import * as userActions from "../../redux/actions/user"
import { bindActionCreators } from "redux";
import {  useNavigate } from "react-router-dom";

const LoginForm = (props) => {
    const saveUser = props.setUser;
    const [userList, setUserList] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [isUser, setUser] = useState(false);
    let Navigate = useNavigate();
    const errText = '* Поле обязательно для заполнения'
    const [isWrong, setWrong] = useState({
        login: false,
        password: false
    })

    const [isClean, setClean] = useState({
        login: false,
        password: false
    });
    
    useEffect(() => {
        if (!isLoading) {
            setLoading(true);
            getData(`${host}/users`).then((data) => {
                setLoading(false)
                setUserList(data)
            })
        }
    }, [])

    const checkUserLogin = () => {
        if (userList.find(item => item.login === userData.login)) {
            setWrong({...isWrong, login: false})
            if (userList.find(item => item.password === userData.password)){
                setWrong({...isWrong, password: false});
                setUser(true);
            } else setWrong({...isWrong, password: true});
            
            
        } else {
            setWrong({...isWrong, login: false});
            setUser(false);
        }
    }

    const [userData, setUserData] = useState({
        login: '',
        password: ''
    })

    const checkLogin = () => {
        if (userData.login.length === 0) {
            console.log(userData.login.length);
            setClean({...isClean, login : true})
        } else setClean({...isClean, login : false})
    }
    const checkPassword = () => {
        console.log(userData.password.length);
        if (userData.password.length === 0) {
            setClean({...isClean, password : true})
            console.log(isClean);
        } else setClean({...isClean, password : false})
    }
    const checkValidateInputs = (name) => {
        switch (name) {
            case 'password':
                checkPassword();
                break;       
            case 'login':
                checkLogin();
                break;
            default:
        }
    }
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setWrong({login: false, password: false})
        setUserData({...userData, [name] : value });
    }
    const handleClick = (e) => {
        e.preventDefault();
        checkUserLogin();
        if (isUser) {
               saveUser(userList.find(item => item.login === userData.login ? item : null));
               Navigate('/welcome')
        } else setWrong({login: true, password: true})
    }

    return (
        <form className="login__form">
            <h1>Авторизация</h1>
                <h2>Логин</h2>
                <input type={'text'} 
                        placeholder={'Введите логин'} 
                        className={isClean.login || isWrong.login ? 'login__form-input login wrong' : 'login__form-input login ' } 
                        name={'login'}
                        onMouseLeave={(e) => checkValidateInputs(e.target.name)}
                        onBlur={(e) => checkValidateInputs(e.target.name)}
                        onChange={handleInput}
                        value={userData.login}
                    />
                    {isClean.login ? <p className="log__form-label login">{errText}</p> : null}
                <h2>Пароль</h2>
                <input type={'password'} 
                        placeholder={'Введите пароль'} 
                        className={isClean.password || isWrong.password ? 'login__form-input password wrong' : 'login__form-input password'  } 
                        name={'password'}
                        onMouseLeave={(e) => checkValidateInputs(e.target.name)}
                        onBlur={(e) => checkValidateInputs(e.target.name)}
                        onChange={handleInput}
                        value={userData.password}
                    />
                     {isClean.password ? <p className="log__form-label password">{errText}</p> : null}
                <div className={'login__form-button-container'}>
                <button className="btn log_btn"
                        onMouseUp={checkUserLogin}
                        
                        onClick={handleClick}
                    >
                        Войти
                </button>
                {isWrong.login || isWrong.password ? <p className="log__form-label submit">* Логин или пароль неправильные</p> : null}
                </div>
        </form>
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


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)