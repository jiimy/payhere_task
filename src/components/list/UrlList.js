import axios from "axios";
import { apiKey } from "constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UrlList = () => {
  const { id } = useParams();
  const [arr, setArr] = useState([]);
  const [index, setIndex] = useState(-1);
  const [loading, setLooading] = useState(0);
  const count = 10;
  var now = new Date();
  var year = now.getFullYear();

  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem("urlList"));

    function getUrl() {
      if (storedArray) {
        for (let i = 0; i <= count; i++) {
          if (i < loading) {
            continue;
          }
          setTimeout(() => {
            try {
              axios
                .get(`/wayback/available`, {
                  params: { url: `${storedArray[id]}`, timestamp: `${year - i}0101` },
                  headers: {
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `LOW ${apiKey}`,
                  },
                })
                .then((res) => {
                  let url = res && res.data.archived_snapshots.closest.url;
                  setArr((prevArr) => {
                    const filteredArr = prevArr.filter((existingItem) => {
                      const option1 = existingItem !== url;
                      const option2 = existingItem.includes("0101");
                      return option1 && option2;
                    });
                    return [...filteredArr, url];
                  });
                  if (i === count) {
                    setIndex(i);
                  }
                });
            } catch (error) {
              console.log(error);
            }
            setLooading(i);
          }, 1000 * i);
        }
      }
    }
    getUrl();
  }, []);

  return (
    <div className="list">
      <div className="title">
        <h3>최근 10년 1월 1일 스냅샷</h3>
      </div>
      {arr && index !== count ? (
        <div>로딩중입니다 {(loading / count) * 100}% 완료</div>
      ) : (
        <ul>
          {arr.map((item, index) => (
            <li key={index}>
              <a href={item} target="_blank" rel="noreferrer">
                {item}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UrlList;
