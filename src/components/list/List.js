import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es";
import { useNavigate } from "react-router-dom";
import { updateData } from "store/LocalStorage";
import "./list.scss";
import Button from "components/button/Button";

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

  const urlTypeChk = () => {
    if (typeof data === "string") {
      return JSON.parse(data);
    }
    if (typeof data === "object") {
      return data && typeof data === "string" ? JSON.parse(data) : data;
    }
  };

  return (
    <div className="list">
      <ul>
        {urlTypeChk().length === 0 ? (
          <li className="not-list">등록된 url이 없습니다.</li>
        ) : (
          urlTypeChk().map((item, index) => (
            <li key={index} onClick={() => navigate(`/${index}`)}>
              {item} <Button type="delete" onClick={(e) => deleteUrl(e, index)}>삭제</Button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default List;
