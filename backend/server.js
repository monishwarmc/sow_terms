// server.js
import Fastify from 'fastify';
import cors from '@fastify/cors';
import term from './terms.js';  // Ensure proper extension here

const fastify = Fastify({ logger: true });

await fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

fastify.get('/', async (request, reply) => {
  reply.send({ status: 'ok' });
});


fastify.get('/terms/:id', async (request, reply) => {
  const { id } = request.params;
  try {
    const Term = await term.findOne({
      where: { id: id },
    });

    if (Term) {
      reply.send(Term);
    } else {
      reply.status(404).send({ error: 'Term not found' });
    }
  } catch (error) {
    console.error('Error fetching term:', error);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen({ port: PORT, host: '0.0.0.0' }, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on port ${PORT}`);
});


