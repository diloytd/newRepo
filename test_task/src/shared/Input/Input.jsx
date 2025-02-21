//Input, в которой вводится поиск репозитория. Используется debounce из lodash и хук callback.В строке запрещено вводить киррилицу. Состояние help оповещает о том, что требуется только латинский алфавит, user передается в API для поиска.

import debounce from "lodash/debounce";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import Api from "../../api/api";
import { current } from "@reduxjs/toolkit";
export default function Input({ currentPage}) {
  const [user, setUser] = useState("");
  const [help, setHelp] = useState("");
  const dispatch = useDispatch();

  let ru = /[а-я]+/gi;

  const putRequest = (value) => {
    console.log("Отправка запроса с:", value);
    dispatch(Api(value, currentPage));
  };

  const debounceSearch = useCallback(
    debounce((value) => {
      if (value.trim().length >= 2) {
        dispatch(Api(value, currentPage));
      }
    }, 500),
    [dispatch, current] //добавила зависимости
  );

  const handleValue = (e) => {
    const value = e.target.value;
    if (value.search(ru) != -1) {
      setHelp("введите, пожалуйста, латинские буквы");
      value = value.replace(ru, "");
    }
    setHelp("");
    setUser(value);
    debounceSearch(value);
  };

  const handleSearch = () => {
    console.log(user);
    putRequest(user);
  };

  return (
    <>
      <div className="w-100 flex flex-row justify-between">
        <label htmlFor="input"></label>
        <input
          type="text"
          placeholder="введите запрос"
          value={user}
          id="input"
          onChange={handleValue}
          className="w-50 h-10 border border-sky-600"
        ></input>
        <button onClick={handleSearch} className="w-20 border  border-sky-600">
          Найти
        </button>{" "}
        <div>{help && <p className="text-xs text-red-600">{help}</p>}</div>
      </div>
    </>
  );
}
