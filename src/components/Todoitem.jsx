import "./Todoitem.css";
import { memo, useContext } from "react";
import { TodoDispatchContext } from "../App";

const Todoitem = ({ id, isDone, content, date }) => {
  const{ onUpdate, onDelete } = useContext(TodoDispatchContext);

  const onChangeCheckbox = () => {
    onUpdate(id);
  }

  const onClickDeleteButton = () => {
    if(window.confirm(`(내용 : ${content}) 정말 삭제할까요 ?`)) {
      onDelete(id);
    }
  }

  return (
    <div className="Todoitem">
      <input onChange={onChangeCheckbox} readOnly checked={isDone} type="checkbox" />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  );
};

// 고차 컴포넌트 (Higher Order Component)
// export default memo(Todoitem, (preProps, nextProps) => {
//   if(preProps.id !== nextProps.id) return false;
//   if(preProps.isDone !== nextProps.isDone) return false;
//   if(preProps.content !== nextProps.content) return false;
//   if(preProps.date !== nextProps.date) return false;

//   return true;
// });

export default memo(Todoitem);