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

function App() {
  const [mode, setMode] = React.useState('WELCOME');
  const [id, setId] = React.useState(null);

  const topics = [
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'js', body: 'js is ...' },
  ];

  let content = null;
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
    </div>
  );
}

ReactDOM.render(
  <div>
    <App></App>
  </div>,
  document.getElementById('root') // 기준점이 되는 태그 객체
);
