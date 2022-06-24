const api_key = import.meta.env.VITE_FIREBASE_API_KEY;

export default {
  login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}`;

    if (mode === "signup") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_key}`;
    }

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const resData = await res.json();

    if (!res.ok) {
      const error = new Error(resData.message || "Failed to authenticate");
      throw error;
    }

    localStorage.setItem("token", resData.idToken);
    localStorage.setItem("userId", resData.localId);

    context.commit("setUser", {
      token: resData.idToken,
      userId: resData.localId,
      tokenExpiration: resData.expiresIn,
    });
  },
  autoLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      context.commit("setUser", {
        token,
        userId,
        tokenExpiration: null,
      });
    }
  },
  logout(context) {
    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};
