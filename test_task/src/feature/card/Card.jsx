//Полученные данные отображаются на странице
import { useSelector } from "react-redux";

export default function Card() {
  const {repositories}  = useSelector((state) => state.repository)
  const {empty}  = useSelector((state) => state.repository)
  console.log("repositories from store:", repositories);
  return (
    <div className="w-full flex flex-wrap justify-between items-between ">
      
      {empty ?? <p>Данные не найдены</p>}
      {repositories.map((item) => (
       <div key={item.id} className="bg-sky-100 mt-10 mr-5 h-100 w-60 border-2 border-indigo-200  flex flex-col justify-around break-words">
          <p>name:{item.name}</p>
          {item.description ?  <p>description:{item.description}</p> :<p>Описание отсутсвует </p>}
          <p>ссылка на репозиторий: <br/>
          <a href={item.html_url} target="_blank">
            {item.html_url}{" "}
          </a></p>
          <p>Количество звезд: {item.stargazers_count}</p>
          <p>Дата последнего обновления: {item.updated_at}</p>
        </div>
      ))}
    </div>
  );
}
