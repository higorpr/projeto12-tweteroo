import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

const port = 5000;

//server variables and constants
const user = {
    username: "Higor",
    avatar: "https://avatars.githubusercontent.com/u/83566539?v=4",
};

const tweet = {
    username: "Higor",
    tweet: "Tiramos o BolsoLixo!",
};

const users = [user];
const tweets = [tweet];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    if (!username || !avatar) {
        res.status(400).send("Todos os campos são obrigatórios");
        return;
    } else {
        const signedUser = {
            username,
            avatar,
        };
        users.push(signedUser);
        res.status(201).send("OK");
    }
});

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
    if (!username || !avatar) {
        res.status(400).send("Todos os campos são obrigatórios");
        return;
    } else {
        const newTweet = {
            username,
            tweet,
        };
        tweets.push(newTweet);
        res.status(201).send("OK");
    }
});

app.get("/tweets", (req, res) => {
    let output = tweets;
    const lastTen = tweets.slice(-10);
    lastTen.forEach((t) => {
        // console.log("Tweet: ",t)
        const targetUser = users.find((obj) => obj.username === t.username);
        // console.log(targetUser)
        // const image = targetUser.avatar;
        const userTweet = {
            username: t.username,
            // avatar: image,
            tweet: t.tweet,
        };
        output.push(userTweet);
    });
    res.status(200).send(output);
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});