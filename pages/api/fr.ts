import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const jokeResponse = await fetch('https://v2.jokeapi.dev/joke/Any?lang=fr');
    if (!jokeResponse.ok) {
      res.status(500).json({ message: 'Failed to fetch joke' });
      return;
    }
    const jokeData = await jokeResponse.json();
    
    // Format the response to include an empty responses array and the joke inside the output object
    const formattedResponse = {
      responses: [],
      output: {
        joke: jokeData
      }
    };

    res.status(200).json(formattedResponse);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
};
