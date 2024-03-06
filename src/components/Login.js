import GoogleButton from "react-google-button";
import firebase from 'firebase/compat/app';
import {auth} from '../firebase';

const Login = () => {
    return (
        <div id="login-page" className="w-full h-screen flex justify-center items-center">

            <div id="login-card" className="w-[420px] h-56 md:w-[640px] md:h-64 bg-white bg-opacity-25 text-center pt-9 pb-16 rounded-xl">
                <h2 className="text-3xl md:text-4xl font-bold my-3">Welcome to Interacto 💬</h2>

                <div className="login-button cursor-pointer mt-8 md:mt-12 inline-block"
                onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
                    <GoogleButton />
                </div>
                

            </div>

        </div>
    );
}

export default Login;