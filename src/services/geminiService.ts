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

export async function compareCloudProducts(awsInput: string, gcpInput: string): Promise<ComparisonResult | null> {
  // 1. 환경 변수 확인 (보안을 위해 실제 운영 환경에서는 키 전체를 로그에 찍지 않는 것이 좋습니다)
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    console.error("Error: VITE_GEMINI_API_KEY가 설정되지 않았습니다.");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
    const model = ai.getGenerativeModel({ model: "gemini-3-flash-preview" }); 

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

    // API 호출
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
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
            similarities: { type: Type.ARRAY, items: { type: Type.STRING } },
            differences: { type: Type.ARRAY, items: { type: Type.STRING } },
            useCases: { type: Type.ARRAY, items: { type: Type.STRING } },
            summary: { type: Type.STRING }
          },
          required: ["awsProduct", "gcpProduct", "similarities", "differences", "useCases", "summary"]
        }
      }
    });

    const responseText = result.response.text();

    if (!responseText) {
      throw new Error("AI로부터 빈 응답이 반환되었습니다.");
    }

    return JSON.parse(responseText) as ComparisonResult;

  } catch (error: any) {
    // 에러 종류에 따른 상세 로깅
    console.error("--- compareCloudProducts 에러 발생 ---");

    if (error.status) {
      // API 응답 에러 (401, 429, 500 등)
      console.error(`Status Code: ${error.status}`);
    }

    if (error.message) {
      console.error(`Error Message: ${error.message}`);
    }

    // JSON 파싱 에러 발생 시 원본 텍스트 확인용
    // console.error("Raw Response Text:", responseText); 

    console.error("Stack Trace:", error.stack);
    console.error("-------------------------------------");

    // 에러 발생 시 null을 반환하거나, 에러 객체를 다시 던질 수 있습니다.
    throw error;
  }
}