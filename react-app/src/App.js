import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          /**
           * 함수가 호출될 떄, react는 이벤트 객체를 첫 번째 매개변수로 주입해준다.
           * 해당 이벤트 객체는 이벤트 상황을 제어할 수 있는 여러가지 정보와 기능을 가지고 있다.
           */
          onClick={(event) => {
            console.log(event);
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}

/**
 태그의 속성으로 값을 넘기면 문자열이 된다. 따라서 추후 숫자와 대조할 일이 있을 경우 숫자로 바꿔줘야 한다.  
 */
function Nav(props) {
  const lis = [];
  props.topics.map((t) => {
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={'/read/' + t.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
          }}
        >
          {t.title}
        </a>
      </li>
    );
  });

  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title"></input>
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="Create"></input>
        </p>
      </form>
    </article>
  );
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return (
    <article>
      <h2>Update</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onUpdate(title, body);
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          ></input>
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="Update"></input>
        </p>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);

  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'js', body: 'js is ...' },
  ]);

  let content = null;
  let contextControl = null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>;
  } else if (mode === 'READ') {
    let title = null;
    let body = null;

    for (let i = 0; i < topics.length; i++) {
      if (id === topics[i].id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
    contextControl = (
      <li>
        <a
          href={'/update/' + id}
          onClick={(event) => {
            event.preventDefault();
            setMode('UPDATE');
          }}
        >
          update
        </a>
      </li>
    );
  } else if (mode === 'CREATE') {
    content = (
      <Create
        onCreate={(title, body) => {
          const newTopic = { id: nextId, title: title, body: body };
          const newTopics = topics;
          setId(nextId);
          setNextId(nextId + 1);
          newTopics.push(newTopic);
          setTopics(newTopics);
          setMode('READ');
        }}
      ></Create>
    );
  } else if (mode === 'UPDATE') {
    let title = null;
    let body = null;

    for (let i = 0; i < topics.length; i++) {
      if (id === topics[i].id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }

    content = (
      <Update
        title={title}
        body={body}
        onUpdate={(title, body) => {
          const newTopics = [...topics];
          const updatedTopic = { id: id, title: title, body: body };
          for (let i = 0; i < newTopics.length; i++) {
            if (newTopics[i].id === id) {
              newTopics[i] = updatedTopic;
            }
          }
          setTopics(newTopics);
          setMode('READ');
        }}
      ></Update>
    );
  }

  return (
    /**
     * 요구사항
     * Header를 클릭하면 title: "Welcome", body = "Hello, WEB" 인 Article이 뜨고,
     * 각 리스트를 클릭하면 각 id에 맞는 topics의 title과 body를 가진 Article이 뜬다.
     */
    <div>
      <Header
        title="REACT"
        onChangeMode={() => {
          setMode('WELCOME');
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(id) => {
          setMode('READ');
          setId(id);
        }}
      ></Nav>
      {content}
      <ul>
        <li>
          <a
            href="/create"
            onClick={(event) => {
              event.preventDefault();
              setMode('CREATE');
            }}
          >
            create
          </a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
