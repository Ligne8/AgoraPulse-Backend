import { Request, Response } from 'express';
import { createOpenAIRequestService } from '../services/openai';

/**
 * aiInput is all the information needed in order to have a great prompt
 */
export type aiInput = {
  announce_type: string;
  fields: [string];
  tags: [string];
  description: string;
  title: string;
  store_information: [string];
};

/**
 * checkOpenAIRequest checks if the request is valid
 * @param req
 */
function checkOpenAIRequest(req: Request): boolean {
  return (
    req.body.announce_type &&
    req.body.fields &&
    req.body.tags &&
    req.body.description &&
    req.body.title &&
    req.body.store_information
  );
}

/**
 * createOpenAIRequest creates a new OpenAI request
 * @param req
 * @param res
 */
export function createOpenAIRequestController(req: Request, res: Response): void {
  if (!checkOpenAIRequest(req)) {
    res
      .status(400)
      .send('Invalid request : ' + 'announce_type, fields, tags, description, title, store_information are required');
    return;
  }
  createOpenAIRequestService()
    .then(() => {
      res.send('OpenAI request created :\n' + res);
    })
    .catch((error: Error) => {
      res.status(500).send('Error creating OpenAI request' + error);
    });
}
