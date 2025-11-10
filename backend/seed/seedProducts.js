/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');

const products = [
  {
    title: 'Aurora Bluetooth Earbuds',
    slug: 'aurora-bluetooth-earbuds',
    description: 'Noise-cancelling wireless earbuds with 24-hour playback and IPX5 water resistance.',
    price: 4499,
    currency: 'INR',
    images: ['https://images.unsplash.com/photo-1511379938547-c1f69419868d'],
    tags: ['electronics', 'audio'],
    stock: 42
  },
  {
    title: 'Pebble Smartwatch Lite',
    slug: 'pebble-smartwatch-lite',
    description: 'Lightweight smartwatch with heart-rate monitoring and customizable faces.',
    price: 6999,
    currency: 'INR',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30'],
    tags: ['electronics', 'wearables'],
    stock: 30
  },
  {
    title: 'ClayCraft Dinner Set (16 pc)',
    slug: 'claycraft-dinner-set-16',
    description: 'Handcrafted stoneware dinner set featuring dinner plates, bowls, and mugs.',
    price: 3299,
    currency: 'INR',
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'],
    tags: ['kitchen', 'home'],
    stock: 18
  },
  {
    title: 'BrewMaster Pour Over Kit',
    slug: 'brewmaster-pour-over-kit',
    description: 'Complete pour-over coffee kit with reusable stainless filter and glass decanter.',
    price: 2499,
    currency: 'INR',
    images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93'],
    tags: ['kitchen', 'coffee'],
    stock: 25
  },
  {
    title: 'Orbit Ergonomic Office Chair',
    slug: 'orbit-ergonomic-office-chair',
    description: 'Mesh office chair with adjustable lumbar support and 4D armrests.',
    price: 12999,
    currency: 'INR',
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'],
    tags: ['furniture', 'office'],
    stock: 12
  },
  {
    title: 'ZenDesk Workspace Mat',
    slug: 'zendesk-workspace-mat',
    description: 'Dual-sided vegan leather desk mat to organize your workspace.',
    price: 1599,
    currency: 'INR',
    images: ['https://images.unsplash.com/photo-1517423440428-a5a00ad493e8'],
    tags: ['office', 'accessories'],
    stock: 60
  },
  {
    title: 'EcoNote Recycled Notebook',
    slug: 'econote-recycled-notebook',
    description: 'A5 dotted notebook made from 100% recycled paper with lay-flat binding.',
    price: 499,
    currency: 'INR',
    images: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f'],
    tags: ['stationery', 'eco-friendly'],
    stock: 120
  },
  {
    title: 'Lumos LED Desk Lamp',
    slug: 'lumos-led-desk-lamp',
    description: 'Adjustable LED lamp with warm-to-cool lighting and USB charging port.',
    price: 2199,
    currency: 'INR',
    images: ['https://images.unsplash.com/photo-1505691723518-36a5ac3be353'],
    tags: ['electronics', 'office'],
    stock: 50
  },
  {
    title: 'Trailblazer Travel Backpack',
    slug: 'trailblazer-travel-backpack',
    description: 'Weather-resistant 28L backpack with padded laptop sleeve and organizer pockets.',
    price: 5499,
    currency: 'INR',
    images: ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee'],
    tags: ['travel', 'outdoors'],
    stock: 35
  },
  {
    title: 'Nimbus Memory Foam Pillow',
    slug: 'nimbus-memory-foam-pillow',
    description: 'Cooling gel-infused pillow that adapts to your sleeping posture.',
    price: 2499,
    currency: 'INR',
    images: ['https://images.unsplash.com/photo-1505692794403-55b39e2fb3c7'],
    tags: ['home', 'sleep'],
    stock: 40
  }
];

async function seed() {
  let exitCode = 0;
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('🌱 Seed data inserted successfully');
  } catch (error) {
    exitCode = 1;
    console.error('Seed error:', error);
  } finally {
    try {
      await mongoose.connection.close();
      console.log('🔌 MongoDB connection closed');
    } catch (closeError) {
      exitCode = 1;
      console.error('Error closing MongoDB connection:', closeError);
    }
    process.exit(exitCode);
  }
}

seed();
