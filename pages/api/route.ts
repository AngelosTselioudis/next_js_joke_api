import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Check if the request method is either GET or POST
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const jokeResponse = await fetch('https://v2.jokeapi.dev/joke/Any');
    if (!jokeResponse.ok) {
      res.status(500).json({ message: 'Failed to fetch joke' });
      return;
    }
    const joke = await jokeResponse.json();
    res.status(200).json({ joke });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
};
