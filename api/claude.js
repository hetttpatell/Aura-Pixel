import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

// Define available tools/skills for Claude
const tools = [
    {
        name: "get_weather",
        description: "Get the current weather in a given location. Use this when users ask about weather conditions.",
        input_schema: {
            type: "object",
            properties: {
                location: {
                    type: "string",
                    description: "The city and state, e.g. San Francisco, CA"
                },
                unit: {
                    type: "string",
                    enum: ["celsius", "fahrenheit"],
                    description: "The unit of temperature"
                }
            },
            required: ["location"]
        }
    },
    {
        name: "search_web",
        description: "Search the web for information. Use this when users ask for current information or facts.",
        input_schema: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "The search query"
                }
            },
            required: ["query"]
        }
    },
    {
        name: "calculate",
        description: "Perform mathematical calculations. Use this for math problems or computations.",
        input_schema: {
            type: "object",
            properties: {
                expression: {
                    type: "string",
                    description: "The mathematical expression to evaluate"
                }
            },
            required: ["expression"]
        }
    }
];

// Tool execution logic
function executeToolCall(toolName, toolInput) {
    switch (toolName) {
        case "get_weather":
            // Mock weather data - replace with real API call
            return {
                location: toolInput.location,
                temperature: 72,
                unit: toolInput.unit || "fahrenheit",
                conditions: "Sunny",
                humidity: 45
            };
        
        case "search_web":
            // Mock search results - replace with real search API
            return {
                query: toolInput.query,
                results: [
                    {
                        title: "Search result for: " + toolInput.query,
                        snippet: "This is a mock result. Integrate with a real search API."
                    }
                ]
            };
        
        case "calculate":
            try {
                // Simple calculator - enhance with math.js for complex calculations
                const result = eval(toolInput.expression);
                return {
                    expression: toolInput.expression,
                    result: result
                };
            } catch (error) {
                return {
                    error: "Invalid mathematical expression"
                };
            }
        
        default:
            return { error: "Unknown tool" };
    }
}

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {

        const { prompt, useTools = true } = req.body;

        let messages = [
            {
                role: "user",
                content: prompt
            }
        ];

        // Tool use loop
        let response;
        let iterations = 0;
        const maxIterations = 5; // Prevent infinite loops

        while (iterations < maxIterations) {
            // Create message with or without tools
            const requestParams = {
                model: "claude-3-5-sonnet-20241022",
                max_tokens: 1024,
                messages: messages
            };

            if (useTools) {
                requestParams.tools = tools;
            }

            response = await anthropic.messages.create(requestParams);

            // Check if Claude wants to use a tool
            const toolUse = response.content.find(block => block.type === "tool_use");

            if (!toolUse) {
                // No tool use, we're done
                break;
            }

            // Execute the tool
            const toolResult = executeToolCall(toolUse.name, toolUse.input);

            // Add assistant's response and tool result to messages
            messages.push({
                role: "assistant",
                content: response.content
            });

            messages.push({
                role: "user",
                content: [
                    {
                        type: "tool_result",
                        tool_use_id: toolUse.id,
                        content: JSON.stringify(toolResult)
                    }
                ]
            });

            iterations++;
        }

        res.status(200).json({
            response: response,
            iterations: iterations
        });

    } catch (error) {

        console.error("Claude API error:", error);

        res.status(500).json({
            error: "Claude API error",
            message: error.message
        });

    }

}