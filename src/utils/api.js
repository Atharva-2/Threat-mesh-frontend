const API_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchThreats = async () => {
  try {
    const response = await fetch(`${API_URL}/api/threats/list`);
    return response.json();
  } catch (error) {
    console.error("Error fetching threats:", error);
  }
};

export const reportThreat = async (threatData) => {
  try {
    const response = await fetch(`${API_URL}/api/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(threatData),
    });
    return response.json();
  } catch (error) {
    console.error("Error reporting threat:", error);
  }
};
