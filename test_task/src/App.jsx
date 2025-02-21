//Основная функция, которая отвечает за добавление компанентов INPUT, CARD, проверяя ошибки, пустой массив репозиториев и загрузку. Также внутри осуществлена функция handleScroll

import { useDeferredValue, useState } from "react";
import { useEffect } from "react";
import Api from "./api/api";
import "./App.css";
import Card from "./feature/card/Card";
import Input from "./shared/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage} from "../src/store/slice";

function App() {
  const {
    loading,
    empty,
    error,
    repositories,
    flagScroll,
    currentPage,
    lastSearchedUser,
  } = useSelector((state) => state.repository);
 
  const dispatch = useDispatch();
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return function () {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [flagScroll]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (!loading && !flagScroll) {
        dispatch(setCurrentPage(currentPage + 1));
        dispatch(Api(lastSearchedUser, currentPage + 1));
      }
    }
  };

return (
    <>
      <div className="flex h-screen flex flex-col items-center w-full">
        <h1 className="text-sky-400/100 text-2xl">
          Поиск пользователей ГитХаб
        </h1>
        <div>
          <Input currentPage={currentPage}/>
        </div>
        <div>
          {loading && <span>Идет загрузка данных...</span>}
          {empty && (
            <span> Данные не найдены. Попробуйте ввести другой запрос</span>
          )}
          {error && <p className="color-red">Произошла ошибка</p>}
          { repositories.length > 0 &&
            <Card/>
          }
        </div>
      </div>
    </>
  );
}

export default App;
