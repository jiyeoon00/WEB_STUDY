/**
 * <img src = "image.jpg" width="100" height="100">
 *
 * 위 img태그는 src, width, height 각 속성이 무슨 값을 가지냐에 따라 이미지가 달라진다.
 * 내가 만든 컴포넌트도 이렇게 속성을 가지도록 하고 싶다 ==> props
 *
 *
 *
 **/
function Header(props) {
  //props에는 <Header title="REACT"></Header>의 객체가 들어온다.

  return (
    <header>
      <h1>
        <a href="/">{props.title}</a>
      </h1>
    </header>
  );
}

function Nav(props) {
  const lis = [];

  /**
   * props로 받은 내용들을 바탕으로
   * li구성하여 넣어준다.
   */
  props.topics.map((t) => {
    lis.push(
      <li key={t.id}>
        <a href={'/read/' + t.id}>{t.title}</a>
      </li>
    );
  });

  /**
   * {배열객체} 놓으면,
   * 리액트에서 배열의 원소를 하나씩 꺼내 배치해준다.
   */
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
    <div>
      <Header title="REACT"></Header>
      <Nav topics={topics}></Nav>
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
