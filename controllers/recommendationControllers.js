import Recommendation from "../models/recommendationModels.js";
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

const recommendationControllers = {
   createRecommendation: async (req, res) => {
      const {prompt} = req.body;
      if(!prompt) {
         return res.status(400).json({ error: "Prompt is required" });
      };
      try {
         const response = await openai.chat.completions.create({
            model: "gpt-5-nano",
            messages: [
               {
                 role: "system",
                 content: `
                   You are a movie recommendation assistant.
                   Always respond **only** with a JSON array of movie objects.
                   Each movie object must include:
                   - title
                   - genre
                   - release_year
                   - imdb_rating
                   - short_description
                   - imdb_link
             
                   Example format:
                   [
                     {
                       "title": "Inception",
                       "genre": "Sci-Fi, Thriller",
                       "release_year": 2010,
                       "imdb_rating": 8.8,
                       "short_description": "A thief enters people's dreams to steal secrets.",
                       "imdb_link": "https://www.imdb.com/title/tt1375666/"
                     }
                   ]
             
                   Do not include any extra text or explanation — only valid JSON.
                 `
               },
               {
                 role: "user",
                 content: `Recommend five movies based on the following prompt: ${prompt}`
               }
             ]
         })
         const result = response.choices[0].message.content;
         const newRecommendation = new Recommendation({
            user_input: prompt,
            recommended_movies: JSON.parse(result)
         });
         await newRecommendation.save();

         res.status(200).json({success: true, results: JSON.parse(result)});
      } catch (error) {
         console.error(error);
         return res.status(500).json({success: false, error: error.message });
      }
   },
   getRecommendations: async (req, res) => {
      try {
         const recommendations = await Recommendation.find().sort({createdAt: -1});
         return res.status(200).json({success: true, recommendations: recommendations || []});
      } catch (error) {
         return res.status(500).json({success: false, error: error.message});
      }
   }
}

export default recommendationControllers;