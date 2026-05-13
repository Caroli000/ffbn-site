const request = require('supertest');
const app = require('../server');

describe('Action API', () => {
    describe('GET /api/actions', () => {
        it('devrait retourner toutes les actions en français par défaut', async () => {
            const res = await request(app).get('/api/actions');

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toBeInstanceOf(Array);
            expect(res.body.data.length).toBe(3);
            expect(res.body.data[0]).toHaveProperty('id');
            expect(res.body.data[0]).toHaveProperty('icon');
            expect(res.body.data[0]).toHaveProperty('title');
            expect(res.body.data[0]).toHaveProperty('description');
        });

        it('devrait retourner les actions en anglais avec le header Accept-Language', async () => {
            const res = await request(app)
                .get('/api/actions')
                .set('Accept-Language', 'en');

            expect(res.statusCode).toBe(200);
            expect(res.body.data[0].title).toBe('Academic Support');
        });

        it('devrait retourner les actions en anglais via query parameter', async () => {
            const res = await request(app).get('/api/actions?lng=en');

            expect(res.statusCode).toBe(200);
            expect(res.body.data[0].title).toBe('Academic Support');
        });
    });
});

describe('Stats API', () => {
    describe('GET /api/stats', () => {
        it('devrait retourner les statistiques', async () => {
            const res = await request(app).get('/api/stats');

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.length).toBe(3);
            expect(res.body.data[0]).toHaveProperty('label');
            expect(res.body.data[0]).toHaveProperty('value');
        });
    });
});

describe('Event API', () => {
    describe('GET /api/events', () => {
        it('devrait retourner tous les événements', async () => {
            const res = await request(app).get('/api/events');

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toBeInstanceOf(Array);
        });
    });

    describe('GET /api/events/:id', () => {
        it('devrait retourner un événement par ID', async () => {
            const res = await request(app).get('/api/events/1');

            expect(res.statusCode).toBe(200);
            expect(res.body.data).toHaveProperty('title');
        });

        it('devrait retourner 404 pour un ID inexistant', async () => {
            const res = await request(app).get('/api/events/999');

            expect(res.statusCode).toBe(404);
            expect(res.body.success).toBe(false);
        });
    });
});
