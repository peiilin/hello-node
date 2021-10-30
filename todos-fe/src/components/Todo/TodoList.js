import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditBtn from "./buttons/EditBtn";
import ShowBtn from "./buttons/ShowBtn";
import DeleteBtn from "./buttons/DeleteBtn";
import axios from "axios";
import { STATUS_WORD, STATUS_COLOR } from "../../configs/status";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(async () => {
    let res = await axios.get("http://localhost:3001/api/todos");
    setTodos(res.data);
  }, []);

  return (
    <div className="column is-three-fifths">
      <nav
        className="pagination is-success"
        role="navigation"
        aria-label="pagination"
      >
        <ul className="pagination-list"></ul>
      </nav>
      <div className="level">
        <div className="level-item">
          <div className="buttons">
            <button className="button is-info">進行中</button>
            <button className="button is-success">已完成</button>
            <button className="button is-danger">已暫停</button>
          </div>
        </div>
      </div>
      {todos.map((item) => (
        <section
          className={`message ${STATUS_COLOR[item.status]}`}
          key={item.id}
        >
          <header className="message-header">
            <p>
              {STATUS_WORD[item.status]} {item.title}
            </p>
          </header>
          <div className="message-body">
            {item.content}
            <div>到期日期:{item.deadline}</div>
          </div>
          <footer className="card-footer">
            <ShowBtn />
            <a href="#" className="card-footer-item">
              <FontAwesomeIcon icon={faCheck} className="mr-2" />
              Done
            </a>
            <EditBtn />
            <DeleteBtn />
          </footer>
        </section>
      ))}
    </div>
  );
};

export default TodoList;
