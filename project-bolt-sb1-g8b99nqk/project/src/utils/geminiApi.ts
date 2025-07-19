import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyAjSLA4gsTGorDCPqj7z-v11p1i-rzSnuM";

const genAI = new GoogleGenerativeAI(API_KEY);

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export async function generateHealthResponse(
  userMessage: string, 
  context: string = 'general-health',
  chatHistory: ChatMessage[] = []
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    // Context-specific system prompts in Bangla
    const contextPrompts = {
      'general-health': `আপনি একজন বাংলাদেশী স্বাস্থ্য বিশেষজ্ঞ AI সহায়ক। আপনার নাম "সুস্থ আনে স্বাস্থ্য AI"। আপনি সবসময় বাংলায় উত্তর দেবেন। সাধারণ স্বাস্থ্য সমস্যা, রোগের লক্ষণ, প্রাথমিক চিকিৎসা এবং স্বাস্থ্য পরামর্শ দিন। গুরুতর সমস্যার জন্য ডাক্তার দেখাতে বলুন।`,
      
      'child-health': `আপনি একজন শিশু স্বাস্থ্য বিশেষজ্ঞ AI। আপনি সবসময় বাংলায় উত্তর দেবেন। শিশুদের স্বাস্থ্য, পুষ্টি, টিকা, বৃদ্ধি এবং যত্ন সম্পর্কে পরামর্শ দিন। বাংলাদেশী শিশুদের জন্য উপযুক্ত পরামর্শ দিন।`,
      
      'pregnancy-support': `আপনি একজন গর্ভাবস্থা বিশেষজ্ঞ AI। আপনি সবসময় বাংলায় উত্তর দেবেন। গর্ভাবস্থার যত্ন, পুষ্টি, সতর্কতা এবং প্রসবের প্রস্তুতি সম্পর্কে পরামর্শ দিন। বাংলাদেশী মায়েদের জন্য উপযুক্ত পরামর্শ দিন।`,
      
      'period-support': `আপনি একজন নারী স্বাস্থ্য বিশেষজ্ঞ AI। আপনি সবসময় বাংলায় উত্তর দেবেন। মাসিক চক্র, পিরিয়ডের সমস্যা, ব্যথা উপশম এবং স্বাস্থ্যবিধি সম্পর্কে পরামর্শ দিন।`,
      
      'animal-treatment': `আপনি একজন পশু চিকিৎসা বিশেষজ্ঞ AI। আপনি সবসময় বাংলায় উত্তর দেবেন। গরু, ছাগল, মুরগি, মাছ এবং অন্যান্য পশুপাখির রোগ, চিকিৎসা এবং যত্ন সম্পর্কে পরামর্শ দিন।`,
      
      'abortion-support': `আপনি একজন নারী স্বাস্থ্য বিশেষজ্ঞ AI। আপনি সবসময় বাংলায় উত্তর দেবেন। গর্ভপাত পরবর্তী যত্ন, শারীরিক ও মানসিক স্বাস্থ্য এবং পুনরুদ্ধার সম্পর্কে সহানুভূতিশীল পরামর্শ দিন।`,
      
      'animal-bite': `আপনি একজন জরুরি চিকিৎসা বিশেষজ্ঞ AI। আপনার নাম "BiteBot"। আপনি সবসময় বাংলায় উত্তর দেবেন। সাপ, কুকুর, বিড়াল এবং অন্যান্য প্রাণীর কামড়ের প্রাথমিক চিকিৎসা এবং জরুরি পরামর্শ দিন।`,
      
      'disaster-support': `আপনি একজন দুর্যোগ ব্যবস্থাপনা বিশেষজ্ঞ AI। আপনার নাম "DisasterBot"। আপনি সবসময় বাংলায় উত্তর দেবেন। বন্যা, ঘূর্ণিঝড়, ভূমিকম্প এবং অন্যান্য দুর্যোগে করণীয়, নিরাপত্তা এবং জরুরি সহায়তা সম্পর্কে পরামর্শ দিন।`
    };

    const systemPrompt = contextPrompts[context as keyof typeof contextPrompts] || contextPrompts['general-health'];
    
    const fullPrompt = `${systemPrompt}

গুরুত্বপূর্ণ নির্দেশনা:
- সবসময় বাংলায় উত্তর দিন
- সহজ ও বোধগম্য ভাষা ব্যবহার করুন
- বাংলাদেশের প্রেক্ষাপটে পরামর্শ দিন
- গুরুতর সমস্যার জন্য ডাক্তার দেখাতে বলুন
- ইসলামিক মূল্যবোধের সাথে সামঞ্জস্যপূর্ণ পরামর্শ দিন

ব্যবহারকারীর প্রশ্ন: ${userMessage}`;

    // Build chat history for context
    const history = chatHistory.map(msg => ({
      role: msg.role,
      parts: msg.parts
    }));

    const chat = model.startChat({
      history: history,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const result = await chat.sendMessage(fullPrompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Fallback responses in Bangla
    const fallbackResponses = [
      'দুঃখিত, এই মুহূর্তে আমি আপনার প্রশ্নের উত্তর দিতে পারছি না। অনুগ্রহ করে একটু পরে আবার চেষ্টা করুন।',
      'আমার সিস্টেমে কিছু সমস্যা হচ্ছে। আপনার স্বাস্থ্য সমস্যার জন্য অনুগ্রহ করে একজন ডাক্তারের সাথে যোগাযোগ করুন।',
      'এই মুহূর্তে আমি সেবা দিতে পারছি না। জরুরি প্রয়োজনে ৯৯৯ নম্বরে কল করুন।'
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
}

// Function to analyze prescription/report text
export async function analyzePrescription(prescriptionText: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `আপনি একজন বাংলাদেশী ফার্মাসিস্ট এবং চিকিৎসা বিশেষজ্ঞ AI। নিচের প্রেসক্রিপশন বা মেডিকেল রিপোর্ট বিশ্লেষণ করুন এবং বাংলায় পরামর্শ দিন:

প্রেসক্রিপশন/রিপোর্ট: ${prescriptionText}

অনুগ্রহ করে নিম্নলিখিত বিষয়গুলো সম্পর্কে বাংলায় পরামর্শ দিন:
1. ওষুধের সঠিক সেবনবিধি
2. পার্শ্বপ্রতিক্রিয়া এবং সতর্কতা
3. খাদ্যাভ্যাস এবং জীবনযাত্রার পরামর্শ
4. কখন ডাক্তারের কাছে ফিরে যেতে হবে

মনে রাখবেন: এটি শুধুমাত্র সাধারণ পরামর্শ। চূড়ান্ত সিদ্ধান্তের জন্য অবশ্যই আপনার ডাক্তারের সাথে পরামর্শ করুন।`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error('Prescription Analysis Error:', error);
    return 'দুঃখিত, এই মুহূর্তে প্রেসক্রিপশন বিশ্লেষণ করতে পারছি না। অনুগ্রহ করে আপনার ডাক্তারের সাথে সরাসরি যোগাযোগ করুন।';
  }
}

// Function to analyze uploaded images
export async function analyzeImage(imageFile: File, context: string = 'general'): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Convert file to base64
    const imageData = await fileToGenerativePart(imageFile);
    
    const prompt = `আপনি একজন বাংলাদেশী চিকিৎসা বিশেষজ্ঞ AI। এই ছবিটি দেখে বাংলায় পরামর্শ দিন। যদি এটি কোন স্বাস্থ্য সমস্যা, প্রেসক্রিপশন, বা মেডিকেল রিপোর্ট হয় তাহলে উপযুক্ত পরামর্শ দিন। 

গুরুত্বপূর্ণ: 
- সবসময় বাংলায় উত্তর দিন
- যদি ছবিতে গুরুতর কিছু দেখেন তাহলে ডাক্তার দেখাতে বলুন
- শুধুমাত্র সাধারণ পরামর্শ দিন, নির্দিষ্ট রোগ নির্ণয় করবেন না`;

    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error('Image Analysis Error:', error);
    return 'দুঃখিত, এই মুহূর্তে ছবি বিশ্লেষণ করতে পারছি না। অনুগ্রহ করে টেক্সট মেসেজ পাঠান বা ডাক্তারের সাথে যোগাযোগ করুন।';
  }
}

// Helper function to convert file to generative part
async function fileToGenerativePart(file: File) {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(',')[1]); // Remove data:image/jpeg;base64, part
    };
    reader.readAsDataURL(file);
  });
  
  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
}