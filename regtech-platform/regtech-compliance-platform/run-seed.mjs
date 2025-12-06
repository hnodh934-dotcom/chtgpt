import { runCommercialSeeds } from './server/seed-commercial.ts';

runCommercialSeeds()
  .then(() => {
    console.log('Seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });
