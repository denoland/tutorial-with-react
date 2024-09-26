import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";
import data from "./data.json" with { type: "json" };

const router = new Router();

router.get("/", (context) => {
    context.response.body = "Welcome to dinosaur API!";
})

router.get("/dinosaurs", (context) => {
    context.response.body = data;
})

router.get("/dinosaurs/:dinosaur", (context) => {
    if (!context?.params?.dinosaur) {
        context.response.body = "No dinosaur name provided.";
    }

    const dinosaur = data.find((item) =>
        item.name.toLowerCase() === context.params.dinosaur.toLowerCase()
    );

    context.response.body = dinosaur ? dinosaur : "No dinosaur found.";
});

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
