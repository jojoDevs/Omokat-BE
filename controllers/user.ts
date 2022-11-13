import Users from "../models/users";

export const test = () => {
    console.log("시작");
    Users.create({
        id: "0",
        password: "0",
        name: "0",
        pic: "",
        answer: "0",
        games: 1,
        win: 1
    })
        .then(() => console.log('테이블성공'))
        .catch(() => console.log('실패'));
};
