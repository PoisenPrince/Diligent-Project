const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const Product = require('../models/Product');
const connectDB = require('../config/db');

describe('Products API', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await connectDB(uri);
    await Product.create({
      title: 'Test Product',
      slug: 'test-product',
      description: 'A product used for testing',
      price: 999,
      currency: 'INR',
      images: [],
      tags: ['test'],
      stock: 10
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  test('GET /api/products returns list of products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('GET /api/products/:id returns single product', async () => {
    const product = await Product.findOne({ slug: 'test-product' });
    const response = await request(app).get(`/api/products/${product._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.slug).toBe('test-product');
  });
});
