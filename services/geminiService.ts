import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        prompt: {
            type: Type.STRING,
            description: "A detailed, highly probable text prompt that could have been used to create the image. Capture the essence, style, and subject matter."
        }
    },
    required: ["prompt"]
};

export async function analyzeImage(apiKey: string, base64Image: string, mimeType: string): Promise<AnalysisResult> {
    if (!apiKey) {
        throw new Error("API Key is missing.");
    }
    const ai = new GoogleGenAI({ apiKey });

    const textPart = {
        text: `Analyze this AI-generated image. Based on its style, artifacts, and characteristics, determine a detailed, highly probable text prompt that could have been used to create it.
        Respond ONLY with a JSON object that adheres to the provided schema.`
    };

    const imagePart = {
        inlineData: {
            data: base64Image,
            mimeType: mimeType
        }
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [textPart, imagePart] },
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        }
    });

    try {
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        
        if (result && typeof result.prompt === 'string') {
            return { prompt: result.prompt };
        } else {
            throw new Error("Invalid JSON structure received from API.");
        }
    } catch (e) {
        console.error("Failed to parse Gemini response:", response.text);
        throw new Error("Could not parse the analysis result from the AI. The response might be malformed.");
    }
}