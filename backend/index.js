import express from "express";
import bodyparser from "body-parser";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig.js";
import "dotenv/config";
import * as jose from "jose";
import hkdf from "@panva/hkdf";

const app = express();
const port = 3000;
const neuigkeiten = new JsonDB(new Config("filesystem/neuigkeiten", true, true, "/"));
const anmeldungen = new JsonDB(new Config("filesystem/anmeldungen", true, true, "/"));

app.use(bodyparser.json());

const checkIfFieldsFilled = (obj) => {
    const allElements = ["surname", "lastName", "phoneNumber", "mail", "postCode", "city", "street", "houseNumber", "birthdate"];

    const isEveryElementFilled = Object.values(obj).every((el) => !!el);
    const isEveryElementAvailable = allElements.every((el) => Object.keys(obj).includes(el));

    return isEveryElementFilled && isEveryElementAvailable;
};

async function getDerivedEncryptionKey(secret) {
    return await (0, hkdf.default)("sha256", secret, "", "NextAuth.js Generated Encryption Key", 32);
}

async function decode(params) {
    const { token, secret } = params;
    if (!token) {
        return null;
    }
    const encryptionSecret = await getDerivedEncryptionKey(secret);
    const { payload } = await (0, jose.jwtDecrypt)(token, encryptionSecret, {
        clockTolerance: 15,
    });
    return payload;
}

app.get("/anmeldung", async (req, res) => {
    const header = req.headers.authorization;

    if (header) {
        const token = header.split(" ")[1];
        try {
            const t = await decode({ token, secret: process.env.PRIVATE_KEY });
            // check if data contains field anmeldungen, otherwise send empty array
            if (anmeldungen.exists("/anmeldungen")) {
                res.json(anmeldungen.getData("/anmeldungen"));
            } else {
                res.json([]);
            }
        } catch (err) {
            if (err instanceof jose.errors.JWEDecryptionFailed) {
                console.log("Wrong key");
                res.sendStatus(403);
            } else {
                console.error(err);
            }
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(403);
    }
});

app.post("/anmeldung", (req, res) => {
    try {
        if (checkIfFieldsFilled(req.body)) {
            anmeldungen.push("/anmeldungen[]", req.body, true);
        } else {
            throw new Error("Invalid Object");
        }
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        if (err.message === "Invalid Object") {
            res.sendStatus(400)
        } else {
            res.sendStatus(500);
        }
    }
});

//TODO: UseCase schreiben
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
