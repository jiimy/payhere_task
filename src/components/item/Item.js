import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateData } from "store/LocalStorage";

const Item = () => {
  const dispatch = useDispatch();
  const [myArray, setMyArray] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("urlList");
    if (storedData) {
      setMyArray(JSON.parse(storedData));
    }
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (myArray.length >= 99) {
      alert("최대 4개까지 추가 가능합니다.");
      return;
    }

    const updatedArray = [...myArray, inputValue];
    setMyArray(updatedArray);
    setInputValue("");
    localStorage.setItem("urlList", JSON.stringify(updatedArray));
    dispatch(updateData({ urlList: updatedArray }));
    
  };

  return (
    <form onSubmit={handleClick}>
      <input type="text" onChange={handleInputChange} value={inputValue} />
      <button>추가</button>
    </form>
  );
};

export default Item;
