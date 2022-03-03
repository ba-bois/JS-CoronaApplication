import express from "express";
import bodyparser from "body-parser";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig.js";
import "dotenv/config";
import cors from "cors";
import uniquid from "uniqid";

import checkIfFieldsFilled from "./validation.js";

const app = express();
const port = 3000;
const neuigkeiten = new JsonDB(new Config("filesystem/neuigkeiten", true, true, "/"));
const anmeldungen = new JsonDB(new Config("filesystem/anmeldungen", true, true, "/"));

app.use(bodyparser.json());
app.use(cors());
app.use(express.static("global"));

app.get("/anmeldung", async (req, res) => {
    const header = req.headers.authorization;

    if (header) {
        try {
            // check if data contains field anmeldungen, otherwise send empty array
            if (anmeldungen.exists("/anmeldungen")) {
                res.json(anmeldungen.getData("/anmeldungen"));
            } else {
                res.json([]);
            }
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(403);
    }
});

app.post("/anmeldung", (req, res) => {
    try {
        if (checkIfFieldsFilled(req.body)) {
            anmeldungen.push("/anmeldungen[]", { ...req.body, dateRegistered: new Date(), testId: uniquid() }, true);
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
    console.log(`started server on port ${port}`);
});
