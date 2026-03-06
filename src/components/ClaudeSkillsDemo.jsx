import { useState } from 'react';

export default function ClaudeSkillsDemo() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const res = await fetch('/api/claude', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt,
                    useTools: true // Enable Claude Skills
                }),
            });

            if (!res.ok) {
                throw new Error('API request failed');
            }

            const data = await res.json();
            setResponse(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Extract text from Claude's response
    const getResponseText = () => {
        if (!response?.response?.content) return '';
        
        const textBlocks = response.response.content.filter(
            block => block.type === 'text'
        );
        
        return textBlocks.map(block => block.text).join('\n');
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Claude Skills Demo</h1>
            
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Ask Claude (Skills Enabled)
                        </label>
                        <textarea
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                            rows="4"
                            placeholder="Try: 'What's the weather in San Francisco?' or 'Calculate 15 * 23 + 100'"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                        disabled={loading || !prompt.trim()}
                    >
                        {loading ? 'Processing...' : 'Send'}
                    </button>
                </form>
            </div>

            {/* Example prompts */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-2">Try these examples:</h3>
                <div className="space-y-2">
                    <button
                        className="block w-full text-left px-3 py-2 bg-white rounded hover:bg-gray-100 text-sm"
                        onClick={() => setPrompt("What's the weather in New York?")}
                    >
                        🌤️ "What's the weather in New York?"
                    </button>
                    <button
                        className="block w-full text-left px-3 py-2 bg-white rounded hover:bg-gray-100 text-sm"
                        onClick={() => setPrompt("Calculate 234 * 567 + 890")}
                    >
                        🔢 "Calculate 234 * 567 + 890"
                    </button>
                    <button
                        className="block w-full text-left px-3 py-2 bg-white rounded hover:bg-gray-100 text-sm"
                        onClick={() => setPrompt("Search for the latest news about AI")}
                    >
                        🔍 "Search for the latest news about AI"
                    </button>
                </div>
            </div>

            {/* Response */}
            {loading && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-700">🤖 Claude is thinking and using tools...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700">❌ Error: {error}</p>
                </div>
            )}

            {response && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-3">Claude's Response:</h3>
                    <div className="prose max-w-none">
                        <p className="whitespace-pre-wrap text-gray-800">{getResponseText()}</p>
                    </div>
                    
                    {response.iterations > 0 && (
                        <div className="mt-4 pt-4 border-t border-green-300">
                            <p className="text-sm text-gray-600">
                                🔧 Claude used {response.iterations} tool call(s) to answer your question
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
