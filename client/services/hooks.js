import decode from "jwt-decode";

/*
*  After login, 
    *  save the JWT token as "authToken" in local storage 
    *  save the refresh token as "refreshToken" in local storage
*/

// ?  return bearer token
export async function useBearer() {
    try {
        const authToken = localStorage.getItem("authToken");
        const refreshToken = localStorage.getItem("refreshToken");
        if (!authToken || !refreshToken)
            return false;
        const token = decode(authToken)
        if (token.exp < new Date().getTime() / 1000) {
            const res = await fetch("/api/auth/refresh", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    refreshToken
                })
            });
            const data = await res.json();
            if (res.status === 200) {
                localStorage.setItem("authToken", data.tokens.authToken)
                localStorage.setItem("refreshToken", data.tokens.refreshToken)
            }
            else {
                alert('your refresh token is expired, please log in again!');
            }
        }
        return `Bearer ${localStorage.getItem("authToken")}`
    } catch (error) {
        console.log(error)
        return false
    }
}

// ? return bool based on expiry time of token
export async function useAuth() {
    try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) return false
        const { exp } = decode(authToken)
        if (exp < new Date().getTime() / 1000) {
            const res = await fetch("/api/auth/refresh", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    refreshToken
                })
            });
            const data = await res.json();
            if (res.status === 200) {
                localStorage.setItem("authToken", data.tokens.authToken)
                localStorage.setItem("refreshToken", data.tokens.refreshToken)
                return true;
            }
            else {
                alert('your refresh token is expired, please log in again!');
                useReset();
                return false  
            }
        } 
    } catch (error) {
        return false
    }
}

// ? decode auth token and returns properties of User
export async function useUser() {
    try {
        const auth = await useAuth();
        if (auth) {
            const authToken = localStorage.getItem("authToken");
            const user = decode(authToken);
            return user;
        }
        else return false
    } catch (error) {
        return false;
    }
}

// ?  On logout, trigger useReset() hook
export function useReset() {
    localStorage.clear();
    
}