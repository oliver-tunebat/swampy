import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    res.status(200).send("hello world!");
};

export default handler;