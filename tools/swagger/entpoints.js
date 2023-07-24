/**
 * @swagger
 * /clone:
 *  get:
 *       security:
 *            - client-id: []
 *            - client-secret: []
 *            - db-url: []
 *       tags: [database]
 *       responses:
 *            200:
 *                description: success.
 *                content:
 *                    application/json:
 *                         schema:
 *                              type: object
 *            400:
 *                description: Error.
 *                content:
 *                    application/json:
 *                         schema:
 *                              type: string
 *                              example: "error"
 */

/**
 * @swagger
 * /insert:
 *  post:
 *       security:
 *            - client-id: []
 *            - client-secret: []
 *            - db-url: []
 *       tags: [database]
 *       requestBody:
 *              content:
 *                  multipart/form-data:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        file:
 *                          type: string
 *                          format: binary
 *       responses:
 *            200:
 *                description: success.
 *                content:
 *                    application/json:
 *                         schema:
 *                              type: object
 *            400:
 *                description: Error.
 *                content:
 *                    application/json:
 *                         schema:
 *                              type: string
 *                              example: "error"
 */
