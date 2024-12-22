import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

let Login = () => {
    //vår localStorage state
    const [items,setItems] = useState([]);

    let [username,setUsername] = useState(``);

    let [password,setPassword] = useState(``);

    let [error,setError] = useState(false)

    // state för navigation till homePage
    const navigate = useNavigate()

    //state för att växla mellan register och login
    let [showLogIn, setShowLogin] = useState(false);


    
    let saveUsername = (e) => {
       setUsername( e.target.value);
    }

   
    let savePassword = (e) => {
        setPassword(e.target.value)
     }

     // registerData funktion tar hand om all sparad information om register
    let registerData = (e) => {

        e.preventDefault();
        //ger data värdet av username och passwword samt skickar in det till localstorage med "userdata" som key.
        const data = { username, password };
        localStorage.setItem('userData', JSON.stringify(data));

        // skickar data ifrån localstorage till vårt items state.
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData) {
            
            console.log(storedData);
            setItems(storedData);
            setShowLogin(!showLogIn)
        }
     }

     // log in user funktion, kommer checka om login matchar ett registrerat konto. 
     let logInUser = (e) => {
        e.preventDefault();

        const storedData = JSON.parse(localStorage.getItem('userData'));
        // kollar så att storedData matchar inputsen som användaren lagt till.
        if (storedData.username === username && storedData.password === password) {
            console.log("du är inloggad som:",`UserName: ${storedData.username}`,`Password: ${storedData.password}`);

            // navigation till homePage
             navigate("/HomePage")

            setError(false)
        } else {
            setError(!error)
        }
     }

    // funktion för att växla mellan register account och login.
    let showLogInForm = () => {
        setShowLogin(!showLogIn);
    }
    return (
        <div>
            <h1 className="loginHeadline">Productivity Assistant Application</h1>
            {!showLogIn &&
                <form className="register-container" onSubmit={registerData}>
                    <input onChange={saveUsername} type="text" placeholder="username" required></input>
                    <input onChange={savePassword} type="password" placeholder="Password" required></input>
                    <button className="registerBtn"type="submit">Register</button>
                </form>
            }
            {!showLogIn &&

            <div className="accountContainer">
            <p>Already have an account?</p>
            <button className="loginBtn" onClick={showLogInForm}>Log in</button>
            </div>
                
            
            }


            {showLogIn &&
                <form className="login-container" onSubmit={logInUser}>
                    <input onChange={saveUsername} type="text" placeholder="username" required></input>
                    <input onChange={savePassword} type="password" placeholder="Password" required></input>
                    <button className="loginBtn"type="submit">Log in</button>
                </form>
            }
            {error && 
                <div>
                    <p>Error! Do not match registerd user</p>
                </div>
            }
        </div>
    )
}
export default Login;