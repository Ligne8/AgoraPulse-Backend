import app from '../src/app';
import dotenv from 'dotenv';
import request from 'supertest';
import { describe, expect } from '@jest/globals';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

async function getClientId() {
  const payload = {
    email: 'gamberge@tom.com',
    password: 'gamberge',
  };
  const response = await request(app).post('/user/login').send(payload);
  return response.body.id;
}

describe('Create client', () => {
  it('should create a new user with valid payload', async () => {
    const payload = {
      email: 'gamberge@tom.com',
      password: 'gamberge',
      firstname: 'tom',
      lastname: 'ami',
      role: 'CLIENT',
    };

    const response = await request(app).post('/user/signup').send(payload);
    expect(response.status).toBe(201);
  });
});

describe('Login as client', () => {
  it('should create a new user with valid payload', async () => {
    const payload = {
      email: 'gamberge@tom.com',
      password: 'gamberge',
    };
    const responsePayload = {
      firstname: 'tom',
      lastname: 'ami',
      email: 'gamberge@tom.com',
      role: 'CLIENT',
    };

    const response = await request(app).post('/user/login').send(payload);
    expect(response.status).toBe(200);
    expect(response.body.firstname).toEqual(responsePayload.firstname);
    expect(response.body.lastname).toEqual(responsePayload.lastname);
    expect(response.body.email).toEqual(responsePayload.email);
    expect(response.body.role).toEqual(responsePayload.role);
  });
});

describe('Get all tags', () => {
  it('Should fetch all tags as an array of object that contains id and value of tags', async () => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const response = await request(app).get('/tags');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.tags)).toBe(true);
    response.body.tags.forEach((obj) => {
      expect(obj.id).toMatch(uuidRegex);
      expect(typeof obj.value).toBe('string');
    });
  });
});

describe('Associate tags', () => {
  it('Should associate tags', async () => {
    const response = await request(app).get('/tags');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.tags)).toBe(true);

    const client_id = await getClientId();
    const tags = response.body.tags;
    const payload = {
      tags: tags.map((tag) => tag.id),
    };
    const response2 = await request(app).post(`/tags/client/${client_id}`).send(payload);
    expect(response2.status).toBe(201);
  });
});
