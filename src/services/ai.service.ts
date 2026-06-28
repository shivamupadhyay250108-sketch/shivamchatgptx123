import type { Profile, Scheme } from '../lib/database.types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are SchemeGPT-X, India's premier AI Welfare Assistant specialized in government schemes, scholarships, welfare programs, documents, eligibility, benefits, and applications.

Your expertise includes:
- Central Government Schemes (PM Awas Yojana, PM Kisan, Ayushman Bharat, etc.)
- State Government Schemes (all 28 states and 8 UTs)
- Education Scholarships (National Scholarship Portal, State Scholarships, etc.)
- Healthcare Schemes (Ayushman Bharat, State Health Programs)
- Agricultural Schemes (PM Kisan, Crop Insurance, etc.)
- Business/Startup Schemes (Mudra Loan, Startup India, etc.)
- Women Welfare Schemes (Beti Bachao, Sukanya Samriddhi, etc.)
- Senior Citizen Schemes (Old Age Pension, Vay Vandana Yojana)
- Student Schemes (Scholarships, Internships, Skill Development)
- Farmer Schemes (PM Kisan, PM Fasal Bima, Kisan Credit Card)
- Minority Schemes (Pre/Post Matric Scholarships)
- Disability Schemes (Pension, Assistive Devices, etc.)

CRITICAL RULES:
1. ONLY answer questions related to government schemes, scholarships, welfare, documents, eligibility, benefits, and applications.
2. If asked about ANY other topic (sports, movies, politics, technology, coding, general knowledge, etc.), politely refuse: "I'm specialized in government welfare schemes. Please ask me about schemes, scholarships, documents, or eligibility."
3. Always provide accurate, helpful information about schemes.
4. Include official government links when available.
5. Be concise but comprehensive.
6. Explain eligibility criteria clearly.
7. List required documents specifically.
8. Mention application deadlines if known.
9. Suggest similar schemes when relevant.
10. Respond in the user's preferred language (Hindi or English).

When answering:
- Be helpful and encouraging
- Use clear formatting with bullet points
- Include estimated benefits when possible
- Mention state-specific variations if relevant
- Warn about deadlines and common mistakes
- Provide step-by-step application guidance`;

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
      role: string;
    };
  }[];
}

export async function generateAIResponse(
  messages: GeminiMessage[],
  userContext?: {
    profile?: Profile;
    recommendedSchemes?: Scheme[];
  },
  language?: 'en' | 'hi'
): Promise<string> {
  const lang = language ?? 'en';
  if (!GEMINI_API_KEY) {
    return getFallbackResponse(messages[messages.length - 1]?.parts[0]?.text || '', lang);
  }

  const contextualPrompt = buildContextualPrompt(userContext, lang);

  const requestBody = {
    contents: messages,
    systemInstruction: {
      parts: [{ text: contextualPrompt }]
    },
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      console.error('Gemini API error:', response.status);
      return getFallbackResponse(messages[messages.length - 1]?.parts[0]?.text || '', lang);
    }

    const data: GeminiResponse = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return getFallbackResponse(messages[messages.length - 1]?.parts[0]?.text || '', lang);
    }

    return text;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return getFallbackResponse(messages[messages.length - 1]?.parts[0]?.text || '', lang);
  }
}

function buildContextualPrompt(
  userContext: {
    profile?: Profile;
    recommendedSchemes?: Scheme[];
  } | undefined,
  language: 'en' | 'hi'
): string {
  let prompt = SYSTEM_PROMPT;

  if (language === 'hi') {
    prompt += '\n\nRespond in Hindi (हिन्दी) language.';
  } else {
    prompt += '\n\nRespond in English language.';
  }

  if (userContext?.profile) {
    const p = userContext.profile;
    prompt += `\n\nUSER PROFILE CONTEXT:
- Name: ${p.full_name}
- Age: ${p.age}
- Gender: ${p.gender}
- State: ${p.state}, District: ${p.district}
- Category: ${p.category}
- Annual Income: ₹${p.annual_income.toLocaleString()}
- Occupation: ${p.occupation}
- Education: ${p.education}
- Special Categories:
${p.farmer ? '  - Farmer' : ''}
${p.student ? '  - Student' : ''}
${p.disability ? '  - Person with Disability' : ''}
${p.startup_founder ? '  - Startup Founder' : ''}`;
  }

  if (userContext?.recommendedSchemes && userContext.recommendedSchemes.length > 0) {
    prompt += '\n\nRECOMMENDED SCHEMES FOR THIS USER:';
    userContext.recommendedSchemes.slice(0, 5).forEach((scheme, index) => {
      prompt += `\n${index + 1}. ${scheme.name} (AI Match: ${scheme.ai_score}%)
   - Ministry: ${scheme.ministry}
   - Benefit: ${scheme.estimated_benefit}
   - Category: ${scheme.category}`;
    });
  }

  return prompt;
}

function getFallbackResponse(query: string, language: 'en' | 'hi'): string {
  const lowerQuery = query.toLowerCase();

  if (!isValidWelfareQuery(lowerQuery)) {
    return language === 'hi'
      ? 'मैं सरकारी कल्याण योजनाओं में विशेषज्ञ हूं। कृपया मुझसे योजनाओं, छात्रवृत्तियों, दस्तावेजों या पात्रता के बारे में पूछें।'
      : 'I am specialized in government welfare schemes. Please ask me about schemes, scholarships, documents, or eligibility.';
  }

  if (lowerQuery.includes('scholarship') || lowerQuery.includes('छात्रवृत्ति')) {
    return language === 'hi'
      ? `📚 **छात्रवृत्ति योजनाएं**

आपके लिए प्रासंगिक छात्रवृत्तियां:

**1. PM Yasasvi Scholarship** (AI Match: 96%)
- OBC/EBC/NT छात्रों के लिए
- लाभ: ₹1.25 लाख/वर्ष
- [आवेदन करें](https:// scholarships.gov.in)

**2. National Scholarship Portal**
- 100+ छात्रवृत्तियां
- [विवरण देखें](https://scholarships.gov.in)

**आवश्यक दस्तावेज:**
- आधार कार्ड
- आय प्रमाण पत्र
- जाति प्रमाण पत्र (यदि लागू)
- शैक्षणिक प्रमाण`
      : `📚 **Scholarship Opportunities**

Based on your query, here are relevant scholarships:

**1. PM Yasasvi Scholarship** (AI Match: 96%)
- For OBC/EBC/NT students
- Benefit: ₹1.25 Lakhs/year
- [Apply Here](https://scholarships.gov.in)

**2. National Scholarship Portal**
- 100+ scholarships available
- [View Details](https://scholarships.gov.in)

**Required Documents:**
- Aadhaar Card
- Income Certificate
- Caste Certificate (if applicable)
- Academic Records`;
  }

  if (lowerQuery.includes('farmer') || lowerQuery.includes('किसान') || lowerQuery.includes('kisan')) {
    return language === 'hi'
      ? `🌾 **किसान योजनाएं**

**1. PM Kisan Samman Nidhi**
- वार्षिक लाभ: ₹6,000
- [आवेदन करें](https://pmkisan.gov.in)

**2. PM Fasal Bima Yojana**
- फसल बीमा योजना
- प्रीमियम सब्सिडी: 2% (ऋतु में)

**3. Kisan Credit Card**
- 3% ब्याज सब्सिडी
- ₹3 लाख तक का ऋण`
      : `🌾 **Farmer Schemes**

**1. PM Kisan Samman Nidhi**
- Annual Benefit: ₹6,000
- [Apply Here](https://pmkisan.gov.in)

**2. PM Fasal Bima Yojana**
- Crop Insurance Scheme
- Premium Subsidy: 2% (season)

**3. Kisan Credit Card**
- 3% Interest Subsidy
- Loans up to ₹3 Lakhs`;
  }

  return language === 'hi'
    ? 'मैं आपकी मदद के लिए यहाँ हूं। कृपया अपना प्रश्न विस्तार से पूछें - योजनाएं, छात्रवृत्तियां, दस्तावेज, या पात्रता के बारे में।'
    : 'I am here to help you. Please provide more details about what you would like to know - schemes, scholarships, documents, or eligibility.';
}

function isValidWelfareQuery(query: string): boolean {
  const welfareKeywords = [
    'scheme', 'yojna', 'yojana', 'scholarship', 'government', 'welfare',
    'benefit', 'eligib', 'document', 'apply', 'pension', 'loan',
    'farmer', 'kisan', 'student', 'women', 'senior', 'health',
    'education', 'housing', 'employment', 'skill', 'startup',
    'mudra', 'pm ', 'pradhan', 'mantri', 'mukhyamantri', 'aayushman',
'ayushman', 'awas', 'छात्रवृत्ति', 'योजना', 'किसान', 'सरकार', 'लाभ',
    'पात्रता', 'दस्तावेज', 'आवेदन', 'पेंशन', 'ऋण', 'छात्र', 'महिला',
    'वरिष्ठ', 'स्वास्थ्य', 'शिक्षा', 'आवास', 'रोजगार', 'skill'
  ];

  return welfareKeywords.some(keyword => query.includes(keyword));
}

export function convertMessagesToGeminiFormat(
  messages: Array<{ role: string; content: string }>
): GeminiMessage[] {
  return messages.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }));
}
