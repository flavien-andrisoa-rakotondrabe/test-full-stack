import request from 'supertest';
import app from '../src';
import { signToken } from '../src/controllers/auth.controller';

describe('Candidates API', () => {
  let token: string;

  beforeAll(() => {
    token = signToken('mock-user-id');
  });

  it("devrait bloquer l'accès sans token (401)", async () => {
    const res = await request(app).get('/api/candidates');
    expect(res.statusCode).toEqual(401);
  });

  it('devrait créer un candidat avec un token valide', async () => {
    const newCandidate = {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice.smith@test.com',
      phone: '0612345678',
    };

    const res = await request(app)
      .post('/api/candidates')
      .set('Authorization', `Bearer ${token}`)
      .send(newCandidate);

    expect(res.statusCode).toEqual(201);
    expect(res.body.firstName).toBe('Alice');
    expect(res.body).toHaveProperty('_id');
  });

  it('devrait retourner une erreur 400 si le format email est invalide', async () => {
    const invalidCandidate = {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'pas-un-email',
      phone: '0612345678',
    };

    const res = await request(app)
      .post('/api/candidates')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidCandidate);

    expect(res.statusCode).toEqual(400);
  });
});
