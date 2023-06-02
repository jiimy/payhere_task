import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es";
import { useNavigate } from "react-router-dom";
import { updateData } from "store/LocalStorage";

const List = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.localStorage.urlList);

  const deleteUrl = (e, index) => {
    e.stopPropagation();
    const storedArray = JSON.parse(localStorage.getItem("urlList"));
    storedArray.splice(index, 1);
    dispatch(updateData({ urlList: storedArray }));
    localStorage.setItem("urlList", JSON.stringify(storedArray));
  };

  const apiKey = "jnT6hAtYeq9bTWtP";
  const url = "https://example.com";
  const apiUrl = `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(
    url
  )}&fl=timestamp&filter=statuscode:200&output=json&sort=desc&limit=1`;

  fetch(apiUrl, {
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `LOW ${apiKey}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // API 응답 처리
      console.log("dd", data);
    })
    .catch((error) => {
      // 오류 처리
    });

  return (
    <div>
      리스트
      <ul>
        {typeof data === "string" ? (
          <li>등록된 url이 없습니다.</li>
        ) : (
          data.map((item, index) => (
            <li key={index} onClick={() => navigate(`/${index}`)}>
              {item} <button onClick={(e) => deleteUrl(e, index)}>삭제</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default List;
