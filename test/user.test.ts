import app from '../src/app';
import dotenv from 'dotenv';
import request from 'supertest';
import { describe, expect } from '@jest/globals';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

describe('GET /health', () => {
  it('Should return 200', async () => {
    return request(app)
      .get('/health')
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});
