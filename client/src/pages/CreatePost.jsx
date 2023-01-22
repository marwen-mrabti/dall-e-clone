import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createPost, createPhoto } from "../api/post.api";
import { getRandomPrompt } from "../utils";
import { preview } from "../assets";
import { Loader, FormField } from "../components";

function CreatePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);

  //query photo from dall-e
  const photoQuery = useQuery(["photo", form.prompt], () => createPhoto(form.prompt), {
    refetchOnWindowFocus: false,
    enabled: generatingImg,
    onSuccess: (data) => {
      setForm({ ...form, photo: `data:image/png;base64,${data}` });
      setGeneratingImg(false);
    },
    onError: (error) => {
      alert(error.message);
      setGeneratingImg(false);
    },
  });

  const sharePostMutation = useMutation(["post"], createPost, {
    onSuccess: (data) => {
      setForm({ name: "", prompt: "", photo: "" });
      queryClient.refetchQueries(["posts"]);
      navigate(`/`);
    },
  });

  const handleOnSurpriseMe = async () => {
    const randomPrompt = await getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOnGenerate = () => {
    if (form.prompt.trim()) {
      setGeneratingImg(true);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (form.name.trim() && form.prompt.trim() && form.photo) {
      sharePostMutation.mutate(form);
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[222328] text-[3.2rem]">create</h1>
        <p className="mt-2 text-[#666e75] text-[1.6rem] max-w-[50rem]">
          Create and Share imaginative and visually stunning images generated using
          openai's dall-e model.
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={(e) => handleOnSubmit(e)}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="your name"
            type="text"
            name="name"
            placeholder="john doe"
            value={form.name}
            onChange={(e) => handleOnChange(e)}
          />
          <FormField
            labelName="prompt"
            type="text"
            name="prompt"
            placeholder="an oil painting by Matisse of a humanoid robot playing chess"
            value={form.prompt}
            onChange={(e) => handleOnChange(e)}
            isSurpriseMe
            handleOnSurpriseMe={handleOnSurpriseMe}
          />
          <div className="mt-2 flex justify-end gap-5">
            <button
              type="button"
              className="w-full sm:w-auto bg-green-700
               hover:bg-green-800 text-slate-100
                hover:text-slate-200 text-xl font-medium px-4 py-2 rounded-lg"
              disabled={generatingImg}
              onClick={handleOnGenerate}
            >
              {generatingImg ? "generating..." : "generate"}
            </button>
          </div>
          <div className="w-96 h-96 p-3  relative bg-gray-50 border border-gray-300 focus:border-blue-500 text-sm text-gray-900  rounded-lg focus:ring-blue-500 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt={"preview"}
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg ">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className=" mt-10 flex flex-col  ">
          <p className="mb-2 text-[1.4rem] text-gray-800">
            Once you have generated your image, you can share it with others in the
            community.
          </p>
          <button
            type="submit"
            className="w-full sm:w-auto bg-gray-700 hover:bg-gray-800 text-slate-100 hover:text-slate-200 text-xl font-medium px-4 py-2 rounded-lg"
          >
            {sharePostMutation.isLoading ? "processing..." : "share"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
