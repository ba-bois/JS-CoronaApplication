import express from "express";
import bodyparser from "body-parser";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig.js";
import cors from "cors";
import uniquid from "uniqid";
import fileUpload from "express-fileupload";

import checkIfFieldsFilled from "./validation.js";
import * as path from "path";

const app = express();
const port = 3001;
const neuigkeiten = new JsonDB(new Config("filesystem/neuigkeiten", true, true, "/"));
const anmeldungen = new JsonDB(new Config("filesystem/anmeldungen", true, true, "/"));

app.use(bodyparser.json());
app.use(cors());
app.use(express.static("global"));
app.use(fileUpload());

app.get("/anmeldung", (req, res) => {
    try {
        if (anmeldungen.exists("/anmeldungen")) {
            res.json(anmeldungen.getData("/anmeldungen"));
        } else {
            res.json([]);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.patch("/neuigkeiten/:id", (req, res) => {
    try {
        if (neuigkeiten.exists("/neuigkeiten")) {
            const data = neuigkeiten.getData("/neuigkeiten");
            const index = data.findIndex(n => n.newsId === req.params.id);

            delete req.body.picture;

            if (req.files && Object.keys(req.files).length > 0) {
                const ext = req.files.picture.mimetype.split("/")[1];
                const filename = uniquid() + "." + ext;

                req.files.picture.mv(path.join("global", filename));

                const news = { ...req.body, picture: filename, newsId: req.params.id };
                neuigkeiten.push(`/neuigkeiten[${index}]`, news, false);
            } else {
                neuigkeiten.push(
                    `/neuigkeiten[${index}]`,
                    {
                        ...data[index],
                        ...req.body,
                    },
                    false
                );
            }
            res.sendStatus(200);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.post("/neuigkeiten", (req, res) => {
    try {
        let data = {
            ...req.body,
            newsId: uniquid("news_"),
        };

        if (req.files && Object.keys(req.files).length > 0) {
            const ext = req.files.picture.mimetype.split("/")[1];
            const filename = uniquid() + "." + ext;

            req.files.picture.mv(path.join("global", filename));

            data = { ...data, picture: filename };
        }

        neuigkeiten.push("/neuigkeiten[]", data, true);
        res.status(201).json(data.newsId);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.delete("/neuigkeiten/:id", (req, res) => {
    try {
        if (neuigkeiten.exists("/neuigkeiten")) {
            const data = neuigkeiten.getData("/neuigkeiten");
            const index = data.findIndex(n => n.newsId === req.params.id);

            if (index === -1) {
                res.sendStatus(404);
            } else {
                neuigkeiten.delete(`/neuigkeiten[${index}]`);
                res.sendStatus(200);
            }
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.post("/anmeldung", (req, res) => {
    try {
        if (checkIfFieldsFilled(req.body)) {
            anmeldungen.push(
                "/anmeldungen[]",
                {
                    ...req.body,
                    dateRegistered: new Date(),
                    testId: uniquid("test_"),
                },
                true
            );
        } else {
            throw new Error("Invalid Object");
        }
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        if (err.message === "Invalid Object") {
            res.sendStatus(400);
        } else {
            res.sendStatus(500);
        }
    }
});

app.get("/neuigkeiten", (req, res) => {
    try {
        if (neuigkeiten.exists("/neuigkeiten")) {
            res.json(neuigkeiten.getData("/neuigkeiten"));
        } else {
            res.json([]);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});
