import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 2rem;
  display: flex;
  background-color:red;
  align-items: center;
  flex-direction: column;
  `;
const Button = styled.button`
  display:inline-block;
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  height: 30px;
  width: 50px;
  border-radius: 2px;
  cursor: pointer;
`;
const Text = styled.input`
  border: 2px solid #000;
  padding: 0 1rem;
`;
const TaskCount = styled.span`
  margin: 10px;
`;
const Tasks = styled.div`
`;
const LIST = styled.li`
    listStyle:"none";
    text-decoration: "line-through";
`;



function App() {

  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([])
  const [completedTaskCount, setCompletedTaskCount] = useState(0)

  const handleClick = () => {
    const id = todoList.length + 1;
    setTodoList((previousTask) => [...previousTask, {
      id: id,
      task: input,
      complete: false,
    }
    ]);

    setInput("");
  }

  
  const handleComplete = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id == id) {
        if (!task.complete) {
          //Task is pending, modifying it to complete and increment the count
          setCompletedTaskCount(completedTaskCount + 1);
        }
        else {
          //Task is complete, modifying it back to pending, decrement Complete count
          setCompletedTaskCount(completedTaskCount - 1);
        }
        item = { ...task, complete: !task.complete };
      } else item = { ...task };
      return item;
    });
    setTodoList(list);
  };

  return (
    <div className='totalEntity'>
        <Container>
      <div>
        <h2 className='h2'>Todo List</h2>
        <Text onInput={(e) => { setInput(e.target.value) }} value={input} />
        <Button onClick={() => handleClick()}>Add</Button>

        <Tasks className='status'>
          <TaskCount>
            <b>completed Tasks = {completedTaskCount}</b>
          </TaskCount>
        
        </Tasks>
        <div>
          <ul>
            {todoList.map((todo) => {
              return (
                <LIST
                  complete={todo.complete}
                  id={todo.id}
                  onClick={() => { handleComplete(todo.id) }}
                  style={{
                    listStyle: "none",
                    textDecoration: todo.complete && "line-through",
                  }}>
                  {todo.task}
                </LIST>
              )
            })

            }
          </ul>
        </div>
      </div>
    </Container>
    </div>
  
  )

}

export default App;