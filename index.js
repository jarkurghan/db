import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("combined"));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "swagger",
      version: "2.0",
    },
    servers: [
      {
        url: `http://localhost:${9804}/`,
      },
    ],
  },
  apis: ["./tools/swagger/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

import auth from "./tools/middleware/auth.js";
import controller from "./routes/index.js";
app.use("/", auth, controller);

app.listen(9804, () => {
  console.log(`http://localhost:${9804}`);
});
