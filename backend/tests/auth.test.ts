import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src';

describe('Auth API', () => {
  const mockUser = {
    email: 'john.doe@example.com',
    password: 'Password123!',
  };

  beforeAll(async () => {
    await mongoose.connect(
      process.env.DATABASE_URI || 'mongodb://localhost:27017/rh-portal',
    );
  });

  afterAll(async () => {
    await mongoose.connection.db?.dropDatabase();
    await mongoose.connection.close();
  });

  it('devrait créer un nouvel utilisateur (Sign up)', async () => {
    const res = await request(app).post('/api/auth/register').send(mockUser);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  it('devrait refuser une inscription avec un email déjà existant', async () => {
    const res = await request(app).post('/api/auth/register').send(mockUser);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('already registered');
  });

  it("devrait connecter l'utilisateur et retourner un JWT", async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: mockUser.email,
      password: mockUser.password,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
