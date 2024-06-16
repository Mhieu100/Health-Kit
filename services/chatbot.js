const API_KEY = "AIzaSyAOKXJTFDh7N6zzdUgBzEK0swghxM-xMqc";
export const chatbot = async (contents) => {
  const { data: apiRes } = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
    contents
  );
  return apiRes;
};
