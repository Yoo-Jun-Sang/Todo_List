import './App.css'
import { useState, useRef, useReducer, useCallback, createContext, useMemo} from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';

//예시 데이터
const mockData = [
  {
    id: 0,
    isDone: false,
    content: "HTML 공부",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "CSS 공부",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "Java Script 공부",
    date: new Date().getTime(),
  }
];

//변환기
function reducer(state, action) {
  switch(action.type) {
    case "CREAT" : 
      return [action.data, ...state];
    case "UPDATE" :
      return state.map((item) =>
        item.id === action.targetId ? {...item, isDone: !item.isDone} : item
      );
    case "DELETE" :
      return state.filter((item) =>
        item.id !== action.targetId
      );
    default:
      return state;
  }
}

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreat = useCallback((content) => {
    dispatch({
      type: "CREAT",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  }, []);

  
  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  }, []);

  const memoizedDispatch = useMemo(() => {
    return { onCreat, onUpdate, onDelete };
  }, []);

  return (
    <div className="App">
      <Header />

      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider
          value={memoizedDispatch}  
        >
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
