import { useEffect, useState } from "react";
import { getData, postData } from "../helpers/api";
import { host } from "../helpers/constant";

export const RegPage = () => {

    const [userData, setUserData] = useState({
        name: '',
        login: '',
        email: '',
        password: '',
        secPassword: ''
    });
    const [isWrong, setWrong] = useState({
        name: false,
        login: false,
        email: false,
        password: false,
        secPassword: false
    });

    const [isClean, setClean] = useState({
        name: false,
        login: false,
        email: false,
        password: false,
        secPassword: false
    })
    const [userList, setUserList] = useState([])
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        if (!isLoading) {
            setLoading(true);
            getData(`${host}/users`).then((data) => {
                setLoading(false)
                setUserList(data)
            })
           
        }
    }, [])

    const wrongClass = 'wrong'
    const [emailWrongText, setEmailWrongText] = useState('* Данный Email уже занят')
    const [isValideForm, setValide] = useState(false)
    const errText = '* Поле обязательно для заполнения!'
    

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name] : value });
    }
    // Block Validate
    const checkValidateForm = () => {
        const wrongValues = Object.values(isWrong);
        const cleanValues = Object.values(isClean);
        setValide(!cleanValues.find(value => value === true) && !wrongValues.find(value => value === true) ? true : false)
        
    }

    const checkValidateInputs = (name) => {
        switch (name) {
            case 'secPassword':
                checkSecPassword();
                
                break;

            case 'password':
                checkPassword();

                break;

            case 'email':
                checkEmail();

                break;

            case 'name':
                checkName();
            
                break;
            
            case 'login':
                checkAvalibleLogin();

                break;
            default:
        }
    }

    const checkAvalibleLogin = () => {
        if ((userList.find(item => item.login === userData.login)) !== undefined) {
                setClean({...isClean, login : false });
                setWrong({...isWrong, login : true });
        } else { 
            if (userData.login.length === 0) {
                setClean({...isClean, login : true});
                setWrong({...isWrong, login : false });
             } else {
                setWrong({...isWrong, login : false }); 
                setClean({...isClean, login : false });
             }     
            }
    }

    const checkName = () => {
        if (userData.name.length === 0) {
            setClean({...isClean, name : true})
        } else setClean({...isClean, name : false})
    }


  const checkEmail = () => {
    const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(userData.email).toLowerCase())) {  
        if (userData.email.length === 0) { 
            setClean({...isClean, email : true});
            setWrong({...isWrong, email : false });
             } else {
                setWrong({...isWrong, email : true }); 
                setEmailWrongText('* Неккоректный Email')
                setClean({...isClean, email : false });
             }
        } else if ((userList.find(item => item.email === userData.email)) === undefined) {
                setClean({...isClean, email : false })
               setWrong({...isWrong, email : false });
        } else {
            setEmailWrongText('* Данный Email уже занят')
            setClean({...isClean, email : false })
            setWrong({...isWrong, email : true})
        }
  }
    const checkPassword = () => {
        if (userData.password.length <8 || userData.password.length > 32) {
            if (userData.password.length === 0) {
                setClean({...isClean, password : true })
                setWrong({...isWrong, password : false });
                } else {
                   setWrong({...isWrong, password : true }); 
                   setClean({...isClean, password : false });
                };
            
            
           } else { setClean({...isClean, password : false })
               setWrong({...isWrong, password : false });
                
           }
        }

    const checkSecPassword = () => {  
        if (userData.password === userData.secPassword) {  
            if (userData.secPassword.length === 0) {
                setClean({...isClean, secPassword : true });
                setWrong({...isWrong, secPassword : false });
                 }  else {
                           setWrong({...isWrong, secPassword : false });
                          setClean({...isClean, secPassword : false });
                      };
              
            } else { 
                if (userData.secPassword.length === 0) {
                    setClean({...isClean, secPassword : true });
                    setWrong({...isWrong, secPassword : false });
                } else { setWrong({...isWrong, secPassword : true });
                        setClean({...isClean, secPassword : false });
                }
            }   
        }

    const  handleClick = (e) => {
            e.preventDefault();
            if (isValideForm) {
                postData(`${host}/users`, "POST",
                {
                    name: userData.name,
                    login: userData.login,
                    email: userData.email,
                    password: userData.password
                }
                ).then((data) => {
                    console.log(data);
                })
            } else {
                alert('Заполните все поля')
            }
        }

    return (
        <div className="reg__page">
            <form className="reg__form">
                <h1>Регистрация</h1>
                <h2>Имя</h2>
                <input type={'text'} 
                        placeholder={'Ваше имя'} 
                        className={isWrong.name || isClean.name ? 'reg__form-input name wrong' : 'reg__form-input name'} 
                        onChange={handleInput} 
                        onMouseLeave={(e) => checkValidateInputs(e.target.name)}
                        onBlur={(e) => checkValidateInputs(e.target.name)}
                        name={'name'}
                        value={userData.name}
                    />
                {isClean.name ? <p className="reg__form-label name">{errText}</p> : null}
                <h2>Логин</h2>
                <input type={'text'} 
                        placeholder={'Ваш логин'} 
                        className={isWrong.login || isClean.login ? 'reg__form-input login wrong' : 'reg__form-input login'}
                        onChange={handleInput}
                        onMouseLeave={(e) => checkValidateInputs(e.target.name)}
                        onBlur={(e) => checkValidateInputs(e.target.name)}
                        name={'login'}
                        value={userData.login}
                        />
                {isClean.login ? <p className="reg__form-label login">{errText}</p> : null}
                {isWrong.login ? <p className="reg__form-label login">* Логин уже занят</p> : null} 
                <h2>Email</h2>
                <input type={'text'} 
                        placeholder={'Ваш email'} 
                        className={isWrong.email || isClean.email ? 'reg__form-input email wrong' : 'reg__form-input email'}
                        onChange={handleInput}
                        onMouseLeave={(e) => checkValidateInputs(e.target.name)}
                        onBlur={(e) => checkValidateInputs(e.target.name)}
                        name={'email'}
                        value={userData.email}
                        />
                {isClean.email ? <p className="reg__form-label email">{errText}</p> : null}
                {isWrong.email ? <p className="reg__form-label email">{emailWrongText}</p> : null}       
                <h2>Пароль</h2>
                <div className="reg__form-password-items">
                    <div className="reg__form-password-container">
                        <input type={'password'} 
                                placeholder={'Ваш пароль'} 
                                className={isWrong.password || isClean.password ? 'reg__form-input password wrong' : 'reg__form-input password'}
                                onChange={handleInput}
                                onMouseLeave={(e) => checkValidateInputs(e.target.name)}
                                onBlur={(e) => checkValidateInputs(e.target.name)}
                                name={'password'}
                                value={userData.password}
                                />
                        {isClean.password ? <p className="reg__form-label password">{errText}</p> : null}
                        {isWrong.password ? <p className="reg__form-label password">* Длина пароля от 8 до 32 цифр</p> : null}
                    </div>
                    <div className="reg__form-password-container sec-password">
                    <input type={'password'} 
                            placeholder={'Подтвердить пароль'} 
                            className={isWrong.secPassword || isClean.secPassword ? 'reg__form-input sec-password wrong' : 'reg__form-input sec-password'}
                            onChange={handleInput}
                            onMouseLeave={(e) => checkValidateInputs(e.target.name)}
                            onBlur={(e) => checkValidateInputs(e.target.name)}
                            name={'secPassword'}
                            value={userData.secPassword}
                            />   
                            {isClean.secPassword ? <p className="reg__form-label sec-password">{errText}</p> : null}
                            {isWrong.secPassword ? <p className="reg__form-label sec-password">* Пароли должны совпадать</p> : null}
                    </div>       
                </div>
                <div className={'reg__form-button-container'}>
                <button onMouseEnter={checkValidateForm}
                        onFocus={checkValidateForm} 
                        onClick={handleClick} 
                        className="btn reg_btn">
                        Зарегистрироваться
                </button>

                {isValideForm ? null : <p className="reg__form-label submit">* Заполните все поля правильно!</p>}
                </div>
                
            </form>
        </div>
    )
}