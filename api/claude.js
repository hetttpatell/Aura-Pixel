import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {

        const { prompt } = req.body;

        const response = await anthropic.messages.create({
            model: "claude-3-5-sonnet",
            max_tokens: 500,
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        res.status(200).json(response);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Claude API error"
        });

    }

}