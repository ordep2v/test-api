import axios from 'axios';
import { Request, Response } from 'express';

class FriendController {
  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      res.status(200).send(data);
    } catch (e: any) {
      res.status(401).send({ message: e.message });
    }
  };
}

export default FriendController;
