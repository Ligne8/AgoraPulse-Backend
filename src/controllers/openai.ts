import { Request, Response } from 'express';


/**
 * aiInput is all the information needed in order to have a great prompt
 */
export type aiInput  = {
  announce_type: string,
  fields: [string],
  tags: [string],
  description: string,
  title: string,
  store_information: [string]
}

/**
 * checkOpenAIRequest checks if the request is valid
 * @param req
 */
const checkOpenAIRequest = (req: Request): boolean => {
  return req.body.announce_type && req.body.fields && req.body.tags && req.body.description && req.body.title && req.body.store_information;
}

/**
 * createOpenAIRequest creates a new OpenAI request
 * @param req
 * @param res
 */
export function createOpenAIRequest(req: Request, res: Response) {
  if(!checkOpenAIRequest(req)) {
    res.status(400).send('Invalid request : ' +
        'announce_type, fields, tags, description, title, store_information are required');
    return;
  }
}