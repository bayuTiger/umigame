import sdk from "@api/pplx";

// 環境変数からAPIキーを取得
const API_KEY = process.env.PERPLEXITY_API_KEY;

if (!API_KEY) {
  throw new Error("API key is missing");
}

sdk.auth(API_KEY);

export const generateQuestion = async (): Promise<string> => {
  try {
    const response = await sdk.post_chat_completions({
      model: "llama-3-sonar-small-32k-online",
      messages: [
        {
          role: "system",
          content:
            "You are a creative game master. Generate a unique lateral thinking puzzle.",
        },
        {
          role: "user",
          content:
            'Create a new lateral thinking puzzle similar to "The Man in the Elevator".',
        },
      ],
    });
    if (response.data?.choices?.[0]?.message?.content) {
      return response.data.choices[0].message.content;
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("Error generating question:", error);
    throw error;
  }
};

export const answerQuestion = async (
  question: string,
  answer: string
): Promise<string> => {
  try {
    const response = await sdk.post_chat_completions({
      model: "llama-3-sonar-small-32k-online",
      messages: [
        {
          role: "system",
          content:
            "You are a game master for a lateral thinking puzzle. Evaluate the player's answer.",
        },
        {
          role: "user",
          content: `Question: ${question}\nPlayer's answer: ${answer}\nIs this correct? If not, provide a hint.`,
        },
      ],
    });
    if (response.data?.choices?.[0]?.message?.content) {
      return response.data.choices[0].message.content;
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("Error answering question:", error);
    throw error;
  }
};
