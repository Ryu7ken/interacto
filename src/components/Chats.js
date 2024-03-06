import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {

    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const didMountRef = useRef(false);


    // function to logout
    const handleLogout = async () => {
        await auth.signOut();
        navigate('/');
    }

    // to show user avatar image
    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: 'image/jpg' });
    }

    useEffect(() => {

        if (!didMountRef.current) {
            didMountRef.current = true

        if(!user || user === null){
            navigate('/');

            return;
        }

        // fetching the existing user
        axios.get('https://api.chatengine.io/users/me/', 
        {
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {

            // getting the user credentials
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);
            
            // getting user image
            getFile(user.photoURL)
            .then((avatar) => {
                formdata.append('avatar', avatar, avatar.name)

                // getting new user
                axios.post('https://api.chatengine.io/users/',
                formdata,
                { headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY } }
                )
                .then(() => setLoading(false))
                .catch((error) => console.log('error', error.response))
            })
        })
    }
    }, [user, navigate]);


    if(!user || loading) return 'Loading...'; 

    return (
        <div className="chats-page absolute w-[100vw] h-[100vh] top-0 left-0">

            <div className="nav-bar w-full h-16 bg-blue-500 flex justify-between">

                <div className="logo-tab absolute left-6 top-3 text-3xl text-white font-bold">
                    Interacto
                </div>
                <div onClick={handleLogout} className="logout-tab absolute right-10 top-2 text-white cursor-pointer text-lg border-2 p-2 rounded-lg hover:bg-blue-400">
                    Logout
                </div>

            </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.email}
                userSecret={user.uid}
            />

        </div>
    );
}

export default Chats;