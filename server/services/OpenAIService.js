const { OpenAI } = require('openai');

class OpenAIService {
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY || 'sk-placeholder',
        });
    }

    async getChatbotResponse(history) {
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-placeholder') {
            return "Désolé, je ne peux pas répondre pour le moment (Clé API manquante). Mais je peux vous dire que la FFBN est là pour vous aider !";
        }

        try {
            const messages = [
                {
                    role: "system",
                    content: "Tu es l'assistant virtuel de la FFBN (Filles et Fils du Burundi du Nord-Pas-de-Calais). Tu aides les étudiants burundais dans leurs démarches d'intégration, de réussite académique et de vie associative. Sois accueillant, solidaire et précis. Si tu ne connais pas la réponse, suggère de contacter l'équipe via le formulaire de contact."
                },
                ...history.map(m => ({
                    role: m.sender === 'user' ? 'user' : 'assistant',
                    content: m.text
                }))
            ];

            const response = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages,
                max_tokens: 200
            });

            return response.choices[0].message.content;
        } catch (error) {
            console.error('OpenAI Error:', error);
            return "Oups, j'ai eu un petit problème technique. Pouvez-vous reformuler ?";
        }
    }
}

module.exports = new OpenAIService();
