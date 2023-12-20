import img1 from "../images/man1.jpeg";
import img2 from "../images/imageWoman.jpeg";
import img3 from "../images/woman3.jpg";
import img4 from "../images/woman2.jpg";

interface IFollowData {
  name: string;
  username: string;
  img: string;
}

export const FollowCardData: IFollowData[] = [
  {
    name: "ali",
    username: "ali sh",
    img: img1,
  },
  {
    name: "ahmad",

    username: "ahmad db",
    img: img2,
  },
  {
    name: "yaman",

    username: "yaman shh",
    img: img3,
  },
  {
    name: "khaili",

    username: "khaili kh",
    img: img4,
  },
];
