import { getSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import { CustomButton } from ".";
import { FileUpload } from "tabler-icons-react";

export default function NeueNeuigkeiten(props) {
  const [data, setData] = useState({
    title: "",
    content: "",
    file: null,
  });

  useEffect(() => {
    if (props.news) {
      setData({
        ...data,
        title: props.news.title,
        content: props.news.content,
      });
    }
  }, []);

  return (
    <div className="flex w-full flex-col gap-y-8 mb-8">
      <input
        placeholder="Titel"
        type="text"
        name="title"
        value={data.title}
        onInput={(e) => {
          setData({ ...data, title: e.target.value });
        }}
        className="bg-ghostwhite w-2/3 outline-none px-6 py-2 text-2xl rounded-full"
        required
      />
      <textarea
        placeholder="Inhalt"
        name="content"
        rows="10"
        value={data.content}
        onInput={(e) => {
          setData({ ...data, content: e.target.value });
        }}
        className="bg-ghostwhite w-full outline-none px-6 py-2 text-2xl rounded-2xl"
        required
      />
      <div className="bg-ghostwhite rounded-full w-fit">
        <label
          htmlFor="file"
          className="flex gap-x-3 px-6 py-4 cursor-pointer items-center"
        >
          <FileUpload />{" "}
          <span className="flex-shrink overflow-hidden">
            {data.file?.name || "Datei hochladen"}
          </span>
          {data.file && (
            <img
              className="rounded-xl h-16 w-16 object-cover "
              src={URL.createObjectURL(data.file)}
            ></img>
          )}
        </label>
        <input
          type="file"
          id="file"
          onChange={(e) => {
            setData({ ...data, file: e.target.files[0] });
          }}
          accept="image/*"
          name="picture"
          className="p-4 rounded-full bg-ghostwhite hidden"
        />
      </div>
      <CustomButton
        className={"w-fit"}
        onClick={() => {
          const formData = new FormData();

          formData.append("title", data.title);
          formData.append("content", data.content);
          data.file && formData.append("picture", data.file);

          props.onCustomSubmit(formData);
        }}
      >
        Veröffentlichen
      </CustomButton>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/verwaltung/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
