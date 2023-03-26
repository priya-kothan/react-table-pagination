import { useEffect, useState } from "react";
import { Posts } from "./postType";
export default function App() {
  const [postsList, setPosts] = useState<Posts>([]);
  const [rowItems, setrowItems] = useState<Posts>([]);
  const [rowPerPage, setrowPerPage] = useState<number>(10);
  useEffect(() => {
    async function fethdata() {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos")
      const data = await res.json();
      setPosts(data);
    }
    fethdata();
  }, []);

  const onPageChange = (i: number) => {
    const item = postsList.slice(i * rowPerPage, rowPerPage * (i + 1));
    setrowItems(item);
  };

  useEffect(() => {
    onPageChange(0);
  }, [rowPerPage]);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <td>id</td>
            <td>userId</td>
            <td>completed</td>
            <td>title</td>
          </tr>
        </thead>
        <tbody>
          {postsList &&
            rowItems.map((el) => {
              return (
                <tr>
                  <td>{el.id}</td>
                  <td>{el.userId}</td>
                  <td>{el.completed}</td>
                  <td>{el.title}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {Array(10)
        .fill(null)
        .map((el, idx) => {
          return <button onClick={() => onPageChange(idx)}>{idx + 1}</button>;
        })}
    </div>
  );
}
