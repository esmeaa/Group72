/*
const request = require('supertest');
const app = require('./server');

describe('POST /api/register', () => {
  it('should reject invalid role', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        username: 'testuser',
        password: 'testpass',
        role: 'invalidrole'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid role');
  });
});

describe('POST /api/login', () => {
  it('should reject invalid credentials', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        username: 'notarealuser',
        password: 'wrongpass'
      });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });
});
*/
