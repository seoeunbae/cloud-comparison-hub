import { GoogleGenAI, Type } from "@google/genai";

export interface ComparisonResult {
  awsProduct: {
    name: string;
    isValid: boolean;
    description: string;
  };
  gcpProduct: {
    name: string;
    isValid: boolean;
    description: string;
  };
  similarities: string[];
  differences: string[];
  useCases: string[];
  summary: string;
}

export async function compareCloudProducts(awsInput: string, gcpInput: string): Promise<ComparisonResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const prompt = `
    Compare the following two cloud products:
    AWS Product: "${awsInput}"
    GCP Product: "${gcpInput}"

    Follow these rules strictly:
    1. Verify if "${awsInput}" is a valid AWS product.
    2. Verify if "${gcpInput}" is a valid GCP product.
    3. If a product is not a valid service of its respective CSP, mark it as isValid: false.
    4. Provide a detailed comparison including similarities, differences, and specific use cases.
    5. Be objective and technical.
    6. ALL RESPONSES MUST BE IN KOREAN (한국어로 답변하세요).
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          awsProduct: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              isValid: { type: Type.BOOLEAN },
              description: { type: Type.STRING }
            },
            required: ["name", "isValid", "description"]
          },
          gcpProduct: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              isValid: { type: Type.BOOLEAN },
              description: { type: Type.STRING }
            },
            required: ["name", "isValid", "description"]
          },
          similarities: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          differences: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          useCases: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          summary: { type: Type.STRING }
        },
        required: ["awsProduct", "gcpProduct", "similarities", "differences", "useCases", "summary"]
      }
    }
  });

  return JSON.parse(response.text || "{}") as ComparisonResult;
}
