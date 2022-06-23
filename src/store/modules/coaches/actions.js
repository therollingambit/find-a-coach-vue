const uri = import.meta.env.VITE_FIREBASE_URI;

export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const response = await fetch(`${uri}/coaches/${userId}.json`, {
      method: "PUT",
      body: JSON.stringify(coachData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }

    context.commit("registerCoach", {
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(context, _) {
    const res = await fetch(`${uri}/coaches.json`);
    const resData = await res.json();

    if (!res.ok) {
      // error
    }

    const coaches = [];
    for (const key in resData) {
      const coach = {
        id: key,
        firstName: resData[key].firstName,
        lastName: resData[key].lastName,
        description: resData[key].description,
        hourlyRate: resData[key].hourlyRate,
        areas: resData[key].areas,
      };

      coaches.push(coach);
    }

    context.commit("setCoaches", coaches);
  },
};
