import { create } from 'zustand'
import axios from 'axios';
import { persist } from 'zustand/middleware'

const loginUrl = process.env.NEXT_PUBLIC_BASE_URL+'member/login'

const authStore = create(
    persist(
        (set, get) => ({
            accessToken : null,
            refreshToken : null,
            getAccessToken: () => get().accessToken,
            async jwtLogin(username, password) {
                try {
                    const result = await axios.post(loginUrl, {
                        username: username,
                        password: password
                    });
                    const data = result.data;
                    if (data.resultCode.startsWith('S-') && data.data != null) {
                        set(() => ({ accessToken: data.data }));
                        return true;
                    } else {
                        set((state) => ({ ...state, accessToken: null }));
                        return data;
                    }
                } catch (error) {
                    set((state) => ({ ...state, accessToken: null }));
                    return { resultCode: 'F-', msg: error.msg };
                }
            },
            jwtLogout() {set(() => ({accessToken : null, refreshToken : null}))},
            isJwtLoggedIn () {
                if(get().accessToken == null) {
                    return false
                }
            
                const now = parseInt(Date.now() / 1000)
                const expiration_time = parseJwt(authStore.getState().accessToken).exp
                return now <= expiration_time
            }
          }),
          {
            name: 'auth-storage',
          }
    )
)

  const parseJwt = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export default authStore;