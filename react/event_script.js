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
            props.onChangeMode(event.target.id);
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
  const topics = [
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'js', body: 'js is ...' },
  ];

  return (
    /**
     * 요구사항
     * Header 컴포넌트 안에서 링크를 클릭하면 'Header'가 alert
     * 리스트 클릭했을 때, 각 번호가 alert
     */
    <div>
      <Header
        title="REACT"
        onChangeMode={() => {
          alert('Header');
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(id) => {
          alert(id);
        }}
      ></Nav>
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}

ReactDOM.render(
  <div>
    <App></App>
  </div>,
  document.getElementById('root') // 기준점이 되는 태그 객체
);

/**
onClick={(event) => {
  props.onChangeMode();
}}

onClick = {props.onChangeMode}

결과적으로 동일한 결과 수행, 일반적으로 더 간결하고 명확한 두번째 방식 사용

그러나 성능 상 이슈가 있거나(why? 매번 익명함수 생성), 추가적인 매개변수를 전달해야 할 때는 첫 번째 방법을 사용할 수 있습니다.
 */
