import axios from "axios";
// Input your own API key for language.googleapis
const apiKey = "AIzaSyCerECamR0ZFb4Y0efRShiUCWKmnc-pANo";
const annotateUrl = `https://language.googleapis.com/v2/documents:annotateText`;
const sentimentUrl =
  "https://language.googleapis.com/v2/documents:analyzeSentiment";

export const analyzeInputAnnotate = async (input: string) => {
  // Create the api link to be called
  const url = `${annotateUrl}?key=${apiKey}`;

  // Request body, asking for document sentiment score, classification and moderation categories
  const request = {
    // Plain text needed to be sent
    document: {
      type: "PLAIN_TEXT",
      content: input,
    },
    features: {
      extractDocumentSentiment: true,
      classifyText: true,
      moderateText: true,
    },
  };

  // Calling the API
  try {
    const response = await axios.post(url, request, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // return response.data;
    // Proccessing the api data
    let isToxicText = false;
    let toxicCategories = [];
    for (const category of response.data.moderationCategories) {
      if (category.confidence > 0.7) {
        isToxicText = true;
        toxicCategories.push(category.name);
      }
    }
    console.error(toxicCategories);
    return {
      isToxicText: isToxicText,
      toxicCategories: toxicCategories,
    };
  } catch (err) {
    console.log("Error calling the API:", err);
    console.log(apiKey);
    throw err;
  }
};

export const analyzeInputSentiment = async (input: string) => {
  // Create the api link to be called
  const url = `${sentimentUrl}?key=${apiKey}`;

  const request = {
    document: {
      // Plain text needed to be sent
      type: "PLAIN_TEXT",
      content: input,
    },
  };

  // Calling the API
  try {
    const response = await axios.post(url, request, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.log("Error calling the API:", err);
    throw err;
  }
};
