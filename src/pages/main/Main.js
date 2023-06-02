import Item from "components/item/Item";
import List from "components/list/List";
import React, { useState } from "react";

const Main = () => {
  

  return (
    <div>
      <h2>관심있는 url을 추가해주세요.</h2>
      <div>
        <Item />
        <List />
      </div>
    </div>
  );
};

export default Main;
