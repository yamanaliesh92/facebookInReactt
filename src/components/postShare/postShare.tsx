import "./postShare.css";

import { HiPhotograph } from "react-icons/hi";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { ContextUser } from "../../context/userContext";
import {
  createPostApi,
  IPayloadCreatePost,
  PostDateApi,
} from "../../axios/Post/createPost.api";
import { useMutation } from "react-query";
import { AxiosErrors } from "../../axios/common.api";

const init: IPayloadCreatePost = {
  desc: "",
  title: "",
};

const PostShare = () => {
  const [image, setImg] = useState<File | null>(null);

  const [element, setElement] = useState<IPayloadCreatePost>(init);

  const { mutateAsync, error } = useMutation<
    PostDateApi,
    AxiosErrors,
    IPayloadCreatePost
  >("createPost", createPostApi);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setElement((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onsubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;
    const formData = new FormData();
    formData.append("title", element.title);
    formData.append("desc", element.desc);
    formData.append("img", image);

    await mutateAsync(formData as any);
  };

  const { data } = useContext(ContextUser);

  const myImg = data?.data.image;

  const inputRef = useRef<HTMLInputElement>(null);

  const onchangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const value = e.target.files[0];
    setImg(value);
  };
  return (
    <div className="postshare">
      <img src={myImg} alt="share" className="myImg" />
      <div className="input">
        <input
          type={"text"}
          value={element.title}
          name="title"
          onChange={onChange}
          placeholder="what is your mind"
        />
        <input
          type={"text"}
          value={element.desc}
          name="desc"
          onChange={onChange}
          placeholder="add the description"
        />
      </div>
      <div className="postoption">
        <div className="option">
          <HiPhotograph
            size={"1.5rem"}
            onClick={() => inputRef.current?.click()}
          />
          <h6> photo</h6>
        </div>

        <button onClick={onsubmit} className="button buttonPs">
          share
        </button>
        <div style={{ display: "none" }}>
          <input type={"file"} ref={inputRef} onChange={onchangeImg} />
        </div>
      </div>

      {error && (
        <span style={{ color: "red", fontWeight: "bold" }}>
          {error?.response?.data.message}
        </span>
      )}
    </div>
  );
};
export default PostShare;
