
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { className, attendanceHistory } = await req.json();
    if (!className || !attendanceHistory) {
      return new Response(
        JSON.stringify({ error: "Missing className or attendanceHistory" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // The prompt asks Groq to generate 3 actionable notifications/reminders for the educator based on recent attendance data.
    const prompt = `
      You are a virtual assistant for educators.
      Based on the following recent attendance history for class "${className}":
      ${attendanceHistory.map(
        (h) => `- ${h.date}: ${h.rate} (${h.present} present, ${h.absent} absent)`
      ).join('\n')}
      
      Please generate 3 concise, actionable smart notifications or reminders that a school management system could display to the educator. 
      - If attendance is trending low, suggest ways to engage students, send reminders to absentees, or take class-wide action.
      - If a student is often absent, suggest a personal outreach notification.
      - If attendance rates improve, suggest positive feedback notification.
      Use bullet points. Be brief.
    `;

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
            content: "You are a helpful assistant generating actionable notifications for teachers based on class attendance data."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.4,
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Error calling Groq API");
    }

    return new Response(
      JSON.stringify({
        reminders: data.choices[0].message.content,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in groq-reminders function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
