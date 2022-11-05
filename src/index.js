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

function userExists(username) {
    return users.some((u) => u.username === username);
}

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
    const { tweet } = req.body;
    const username = req.headers.user
    if (!username || !tweet) {
        res.status(400).send("Todos os campos são obrigatórios");
        return;
    } else if (userExists(username)) {
        const newTweet = {
            username,
            tweet,
        };
        tweets.push(newTweet);
        res.status(201).send("OK");
    } else {
        res.status(404).send("This user does not exist");
        return;
    }
});

app.get("/tweets", (req, res) => {
    let output = [];
    const lastTen = tweets.slice(-10).reverse();
    lastTen.forEach((t) => {
        const targetUser = users.find((obj) => obj.username === t.username);
        const image = targetUser.avatar;
        const userTweet = {
            username: t.username,
            avatar: image,
            tweet: t.tweet,
        };
        output.push(userTweet);
    });
    res.status(200).send(output);
});

app.get("/tweets/:username", (req, res) => {
    const { username } = req.params;
    if (userExists(username)) {
        let userTweets = [];
        const userAvatar = users.find(
            (obj) => obj.username === username
        ).avatar;

        tweets.forEach((t) => {
            if (username === t.username) {
                const userTweet = {
                    username: t.username,
                    avatar: userAvatar,
                    tweet: t.tweet,
                };
                userTweets.push(userTweet);
            }
        });
        res.status(200).send(userTweets);
    } else {
        res.status(404).send('This user does not exist.')
    }
});

app.get("/sign-up", (req, res) => {
    res.status(201).send(users);
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
