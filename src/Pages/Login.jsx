import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

let Login = () => {
    //vår localStorage state
    const [items,setItems] = useState([]);

    let [username,setUsername] = useState(``);

    let [password,setPassword] = useState(``);

    //state för att växla mellan register och login
    let [showLogIn, setShowLogin] = useState(false);


    
    let saveUsername = (e) => {
       setUsername( e.target.value);
    }

   
    let savePassword = (e) => {
        setPassword(e.target.value)
     }

     // registerData funktion tar hand om all sparad information om register
    let registerData = () => {
        //ger data värdet av username och passwword samt skickar in det till localstorage med "userdata" som key.
        const data = { username, password };
        localStorage.setItem('userData', JSON.stringify(data));

        // skickar data ifrån localstorage till vårt items state.
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData) {
            
            console.log(storedData);
            setItems(storedData);
        }
     }

    // funktion för att växla mellan register account och login.
    let showLogInForm = () => {
        setShowLogin(!showLogIn);
    }
    return (
        <div>
            {!showLogIn &&
                <form className="register-container">
                    <input onChange={saveUsername} type="text" placeholder="username"></input>
                    <input onChange={savePassword} type="password" placeholder="Password"></input>
                   <Link to="/Homepage"><button onClick={registerData} type="submit">Register</button></Link> 
                </form>
            }

            <p>Already have an account?</p>
            <button onClick={showLogInForm}>Log in</button>

            {showLogIn &&
                <form className="login-container">
                    <input type="text" placeholder="username"></input>
                    <input type="password" placeholder="Password"></input>
                    <button type="submit">Log in</button>
                </form>
            }
        </div>
    )
}
export default Login;