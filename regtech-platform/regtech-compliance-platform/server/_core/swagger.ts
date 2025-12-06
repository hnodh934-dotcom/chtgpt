/**
 * Swagger/OpenAPI Documentation Configuration
 */

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import type { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RegTech Compliance Platform API',
      version: '1.0.0',
      description: 'منصة الامتثال التنظيمي - API Documentation',
      contact: {
        name: 'RegTech Platform',
        url: 'https://regtech.manus.space',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
      {
        url: 'https://{domain}.manus.space',
        description: 'Production server',
        variables: {
          domain: {
            default: 'regtech',
            description: 'Your project domain',
          },
        },
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'session',
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
    tags: [
      {
        name: 'Frameworks',
        description: 'الأطر التنظيمية (PDPL, ECC, SAMA, NCA, CITC)',
      },
      {
        name: 'Controls',
        description: 'الضوابط التقنية',
      },
      {
        name: 'RegAdvisor',
        description: 'المستشار التنظيمي الذكي',
      },
      {
        name: 'RegDrafter',
        description: 'المحرر التنظيمي',
      },
      {
        name: 'RaaC',
        description: 'Regulation as Code',
      },
      {
        name: 'Compliance',
        description: 'نسب الامتثال والتقييمات',
      },
      {
        name: 'Monitor',
        description: 'نظام المراقبة',
      },
    ],
  },
  apis: [
    './server/routers.ts',
    './server/**/*Router.ts',
    './server/_core/systemRouter.ts',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
  // Swagger UI
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'RegTech API Documentation',
  }));

  // Swagger JSON
  app.get('/api/docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log('[Swagger] Documentation available at /api/docs');
}
