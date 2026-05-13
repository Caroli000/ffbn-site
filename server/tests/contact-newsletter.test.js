const request = require('supertest');
const app = require('../server');

describe('Contact API', () => {
    describe('POST /api/contact', () => {
        it('devrait créer un message de contact valide', async () => {
            const res = await request(app)
                .post('/api/contact')
                .send({
                    name: 'Jean Dupont',
                    email: 'jean@example.com',
                    message: 'Bonjour, je souhaite rejoindre votre association.',
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty('id');
            expect(res.body.data.name).toBe('Jean Dupont');
        });

        it('devrait rejeter un email invalide', async () => {
            const res = await request(app)
                .post('/api/contact')
                .send({
                    name: 'Jean Dupont',
                    email: 'email-invalide',
                    message: 'Bonjour, je souhaite rejoindre votre association.',
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.errors).toBeInstanceOf(Array);
        });

        it('devrait rejeter un message trop court', async () => {
            const res = await request(app)
                .post('/api/contact')
                .send({
                    name: 'Jean',
                    email: 'jean@example.com',
                    message: 'Salut',
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
        });

        it('devrait rejeter les champs manquants', async () => {
            const res = await request(app)
                .post('/api/contact')
                .send({});

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
        });
    });
});

describe('Newsletter API', () => {
    describe('POST /api/newsletter', () => {
        it('devrait inscrire un nouvel email', async () => {
            const res = await request(app)
                .post('/api/newsletter')
                .send({ email: 'test@example.com' });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.isNew).toBe(true);
        });

        it('devrait gérer un email déjà inscrit', async () => {

            await request(app)
                .post('/api/newsletter')
                .send({ email: 'doublon@example.com' });

            const res = await request(app)
                .post('/api/newsletter')
                .send({ email: 'doublon@example.com' });

            expect(res.statusCode).toBe(200);
            expect(res.body.isNew).toBe(false);
        });

        it('devrait rejeter un email invalide', async () => {
            const res = await request(app)
                .post('/api/newsletter')
                .send({ email: 'pas-un-email' });

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
        });
    });
});

describe('API Root', () => {
    describe('GET /api', () => {
        it('devrait retourner les informations de l\'API', async () => {
            const res = await request(app).get('/api');

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('endpoints');
            expect(res.body.version).toBe('1.0.0');
        });
    });

    describe('GET /route-inexistante', () => {
        it('devrait retourner 404', async () => {
            const res = await request(app).get('/route-inexistante');

            expect(res.statusCode).toBe(404);
            expect(res.body.success).toBe(false);
        });
    });
});
