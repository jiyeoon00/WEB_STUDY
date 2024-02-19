// function App() {
//   return (
//     <div>
//       <header>
//         <h1>
//           <a href="/">WEB</a>
//         </h1>
//       </header>
//       <nav>
//         <ol>
//           <li>
//             <a href="/read/1">html</a>
//           </li>
//           <li>
//             <a href="/read/2">css</a>
//           </li>
//           <li>
//             <a href="/read/3">js</a>
//           </li>
//         </ol>
//       </nav>
//       <article>
//         <h2>Welcome</h2>
//         Hello, WEB
//       </article>
//     </div>
//   );
// }

// ReactDOM.render(
//   <div>
//     <App></App>
//   </div>,
//   document.getElementById('root') // 기준점이 되는 태그 객체
// );

/**
 리액트는 컴포넌트(=사용자 정의 태그)를 만드는 기술이다.

 뷰를 독립적으로 구성하여 재사용을 할 수 있고 이를 통해 새로운 컴포넌트를 쉽게 만들 수 있다. 

 위 코드는 뷰가 나눠지지 않고 묶여있다. header, nav, article내부 코드가 엄청 길다면 리펙토링도 힘들고, 각 코드를 재사용할 수도 없다.
 위 코드를 각 컴포넌트로 나눈 것이 아래 코드이다.

 */

function Header() {
  return (
    <header>
      <h1>
        <a href="/">WEB</a>
      </h1>
    </header>
  );
}

function Nav() {
  return (
    <nav>
      <ol>
        <li>
          <a href="/read/1">html</a>
        </li>
        <li>
          <a href="/read/2">css</a>
        </li>
        <li>
          <a href="/read/3">js</a>
        </li>
      </ol>
    </nav>
  );
}

function Article() {
  return (
    <article>
      <h2>Welcome</h2>
      Hello, WEB
    </article>
  );
}

function App() {
  return (
    <div>
      <Header></Header>
      <Nav></Nav>
      <Article></Article>
    </div>
  );
}

ReactDOM.render(
  <div>
    <App></App>
  </div>,
  document.getElementById('root') // 기준점이 되는 태그 객체
);
