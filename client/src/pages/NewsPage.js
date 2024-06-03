import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { BASE_URL } from "../services/helper";

const NewsPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState(null);

  const [createAt, setCreatedAt] = useState(null);
  const date = moment(createAt);
  const relativeTime = date.fromNow();

  const API = `${BASE_URL}/api/getSingleNews?id=${id}`;

  const getNews = async (url) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setNews(data.post);
        setCreatedAt(data.post.createdAt);
      } else {
        const errorMessage = await res.json();
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews(API);
  }, [API]);

  if (loading || !news) {
    return <div>Loading...</div>;
  }

  const { title, category, content, image, time } = news;

  return (
    <div className=" mx-auto px-3 mt-8 xl:w-[1200px] lg:w-[1000px] md:w-[800px] sm:w-full">
      <img
        src={image}
        alt={title}
        className="w-full mb-4 h-[300px] object-cover"
      />

      <h1 className="sm:text-3xl text-xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-2 ">{category}</p>
      <div className=" flex  items-center ">
        <p className="text-gray-500 mb-1">
          <AccessTimeIcon />
          {relativeTime}
        </p>
      </div>

      <p className="sm:text-lg text-md mb-20">
        {content.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </p>

      {/* Add more styling or elements as needed */}
    </div>
  );
};

export default NewsPage;
