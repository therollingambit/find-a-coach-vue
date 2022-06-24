const uri = import.meta.env.VITE_FIREBASE_URI;

export default {
  async contactCoach(context, payload) {
    const newRequest = {
      // id: new Date().toISOString(),
      userEmail: payload.email,
      message: payload.message,
    };

    const res = await fetch(`${uri}/requests/${payload.coachId}.json`, {
      method: "POST",
      body: JSON.stringify(newRequest),
    });

    const resData = await res.json();

    if (!res.ok) {
      const error = new Error(resData.message || "Failed to send request!");
      throw error;
    }

    newRequest.id = resData.name;
    newRequest.coachId = payload.coachId;

    context.commit("addRequest", newRequest);
  },
  async fetchRequests(context) { // requests for active user
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const res = await fetch(`${uri}/requests/${coachId}.json?auth=${token}`);
    const resData = await res.json();

    if (!res.ok) {
      const error = new Error(resData.message || "Failed to send request!");
      throw error;
    }

    const requests = []
    for (const key in resData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: resData[key].userEmail,
        message: resData[key].message,
      };
      requests.push(request);
    }

    context.commit("setRequests", requests);
  },
};
