
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data } = await req.json();

    switch (action) {
      case "analyze_attendance":
        return await analyzeAttendance(data);
      case "suggest_improvements":
        return await suggestImprovements(data);
      default:
        throw new Error("Invalid action specified");
    }
  } catch (error) {
    console.error("Error in groq-attendance function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

async function analyzeAttendance(data) {
  const { className, attendanceRecords, students } = data;
  
  // Calculate statistics and identify patterns
  const presentCount = attendanceRecords.filter(r => r.present).length;
  const totalStudents = students.length;
  const attendanceRate = (presentCount / totalStudents) * 100;
  
  // Create a prompt for Groq
  const prompt = `
    Analyze the following attendance data for class "${className}":
    - Total students: ${totalStudents}
    - Present students: ${presentCount}
    - Attendance rate: ${attendanceRate.toFixed(2)}%
    
    Please provide:
    1. A brief analysis of this attendance pattern
    2. Any concerning trends if attendance is below 80%
    3. Suggestions for improving attendance if needed
    
    Keep your response concise and actionable, under 200 words.
  `;

  return await callGroqAPI(prompt);
}

async function suggestImprovements(data) {
  const { className, attendanceHistory } = data;
  
  // Create a prompt for Groq
  const prompt = `
    Based on the following attendance history for class "${className}":
    ${attendanceHistory.map(h => `- ${h.date}: ${h.rate} (${h.present} present, ${h.absent} absent)`).join('\n')}
    
    Please provide:
    1. A pattern analysis of attendance over time
    2. Three specific, actionable suggestions for improving attendance
    3. How to recognize and reward consistent attendance
    
    Format your response as brief bullet points, totaling under 250 words.
  `;

  return await callGroqAPI(prompt);
}

async function callGroqAPI(prompt) {
  if (!GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: "You are an educational analytics assistant that specializes in analyzing attendance patterns and providing actionable insights to educators."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5,
      max_tokens: 500,
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error?.message || "Error calling Groq API");
  }

  return new Response(
    JSON.stringify({
      analysis: data.choices[0].message.content,
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
}
