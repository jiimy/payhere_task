import Button from "components/button/Button";
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
    if (myArray.length >= 4) {
      alert("최대 4개까지 추가 가능합니다.");
      return;
    }
    if (inputValue.includes("http")) {
      // 중복
      if (!myArray.includes(inputValue)) {
        const updatedArray = [...myArray, inputValue];
        setMyArray(updatedArray);
        setInputValue("");
        localStorage.setItem("urlList", JSON.stringify(updatedArray));
        dispatch(updateData({ urlList: updatedArray }));
      } else {
        alert("이미 있습니다.");
      }
    } else {
      alert("정확한 도메인이름을 입력해주세요");
    }
  };

  return (
    <form onSubmit={handleClick}>
      <input type="text" onChange={handleInputChange} value={inputValue} />
      <Button>추가</Button>
    </form>
  );
};

export default Item;
