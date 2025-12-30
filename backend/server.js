require("dotenv").config();
const Fastify = require("fastify");
const cors = require("fastify-cors");
const db = require("./db");
const OpenAI = require("openai");

const fastify = Fastify({ logger: true });
fastify.register(cors);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

fastify.post("/recommend", async (request, reply) => {
  const { userInput } = request.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Recommend 3 to 5 movies based on this preference: ${userInput}. 
          Return only movie names as a comma-separated list.`,
        },
      ],
    });

    const movies = response.choices[0].message.content;

    db.run(
      `INSERT INTO recommendations (user_input, recommended_movies) VALUES (?, ?)`,
      [userInput, movies]
    );

    reply.send({
      success: true,
      recommendations: movies.split(",").map(m => m.trim()),
    });
  } catch (error) {
    reply.status(500).send({ error: "Something went wrong" });
  }
});

fastify.listen({ port: 3001 }, err => {
  if (err) throw err;
  console.log("Backend running on http://localhost:3001");
});
