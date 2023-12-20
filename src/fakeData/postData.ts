import img1 from "../images/man1.jpeg";
import img2 from "../images/imageWoman.jpeg";
import img3 from "../images/woman3.jpg";
import img4 from "../images/woman2.jpg";
export interface IData {
  img: string;
  name: string;
  desc: string;
  liked: boolean;
  likes: number;
}

export const PostsData: IData[] = [
  {
    img: img1,
    name: "yamna",
    desc: "photo about artifical",
    liked: false,
    likes: 220,
  },
  {
    img: img2,
    name: "jlal ",
    desc: "photo about work",
    liked: true,
    likes: 320,
  },
  {
    img: img3,
    name: "ahmed",
    desc: "photo about mental health",
    liked: false,
    likes: 210,
  },
  {
    img: img4,
    name: "ali",
    desc: "photo about education",
    liked: false,
    likes: 225,
  },
];
