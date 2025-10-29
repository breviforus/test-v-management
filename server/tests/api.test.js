const request = require('supertest');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const requestRoutes = require('../routes/requests');
const userRoutes = require('../routes/users');

app.use('/api/requests', requestRoutes);
app.use('/api/users', userRoutes);

describe('Vacation Management API - Validation Tests', () => {
  describe('POST /api/requests - Input Validation', () => {
    it('should reject empty request body', async () => {
      const res = await request(app).post('/api/requests').send({});
      expect(res.status).toBe(400);
    });

    it('should reject request without user_id', async () => {
      const res = await request(app).post('/api/requests').send({
        start_date: '2025-12-01',
        end_date: '2025-12-05'
      });
      expect(res.status).toBe(400);
    });

    it('should reject request without start_date', async () => {
      const res = await request(app).post('/api/requests').send({
        user_id: 1,
        end_date: '2025-12-05'
      });
      expect(res.status).toBe(400);
    });

    it('should reject request without end_date', async () => {
      const res = await request(app).post('/api/requests').send({
        user_id: 1,
        start_date: '2025-12-01'
      });
      expect(res.status).toBe(400);
    });

    it('should reject when end_date is before start_date', async () => {
      const res = await request(app).post('/api/requests').send({
        user_id: 1,
        start_date: '2025-12-10',
        end_date: '2025-12-05'
      });
      expect(res.status).toBe(400);
    });
  });

  describe('PUT /api/requests/:id - Validation', () => {
    it('should reject invalid status value', async () => {
      const res = await request(app).put('/api/requests/1').send({
        status: 'InvalidStatus'
      });
      expect(res.status).toBe(400);
    });

    it('should reject empty status', async () => {
      const res = await request(app).put('/api/requests/1').send({});
      expect(res.status).toBe(400);
    });
  });
});
