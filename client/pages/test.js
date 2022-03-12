import { useState, useEffect } from "react";
import { useAuth, useBearer, useUser, useReset } from "../services/hooks";
import styles from "../styles/Test.module.css";

export default function Test() {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({});
    const [bearer, setBearer] = useState('');
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(async () => {
        const auth = await useAuth();
        const user = await useUser();
        setAuth(auth);
        setBearer(bearer);
        setUser(user);
        setLoading(false);

        return () => {
            setAuth(false);
            setBearer('');
            setUser({});
            setUserData({});
            setLoading(false);
        }
    }, [auth, loading, userData]);

    async function FetchUserData() {
        setLoading(true);
        if (auth === false) {
            alert('Please log in first');
        } else {
            fetch("/api/user", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": await useBearer()
                }
            })
                .then(res => res.json())
                .then(data => {
                    setUserData(data);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }

    function loginUser() {
        setLoading(true);
        fetch("/api/auth/signin", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email: "karansh492@gmail.com",
                password: "FFFFFF"
            })
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("authToken", data.tokens.authToken);
                localStorage.setItem("refreshToken", data.tokens.refreshToken);
                setAuth(true);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    function Logout() {
        useReset();
        setAuth(false);
    }

    if (loading === true) {
        return (
            <div className={styles.testContainer}>
                <h1>loading ...</h1>
            </div>
        );
    } 

    return (
        <div className={styles.testContainer}>
        {
            auth ? 
            <div>
                <p>you're logged in 🖕🏽</p>
                <h1>Hii {user.username}!</h1>
                <button className={styles.btn} onClick={FetchUserData}>Fetch User Data</button>
                <button className={styles.btn2} onClick={Logout}>Logout</button>
                {
                    userData.username !== undefined ?
                    <div>
                        <h4>User Data</h4>
                        <p>{userData.username}</p>
                        <p>{userData.email}</p>
                        <p>{userData.phone}</p>
                    </div>
                    : null
                }
            </div> 
            : 
            <div>
                <p>You are not logged in</p>
                <button className={styles.btn} onClick={loginUser}>Click to sign in</button>
            </div>
        }
        </div>
    );
}