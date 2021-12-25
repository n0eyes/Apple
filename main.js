(() => {
  let yOffset = 0;
  let prevScrollHeight = 0; //현재까지 스크롤 된 높이들의 합
  let currentScene = 0; //현재 활성화 된 씬

  const sceneInfo = [
    {
      //0
      type: "sticky",
      heightNum: 5, //섹션의 높이를 정할 배수
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
      },
    },
    {
      //1
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      //2
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      //3
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  function setLayout() {
    //각 스크롤 섹션의 높이 셋팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    //새로 고침시 활성 씬 찾아가기
    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);
  }
  // 1. document.documentElement.clientWidth
  // 2. window.innerWidth
  //스크롤 넓이를 제외 할 경우 1번
  //추후 발생할 차이는?

  // #문서 높이 얻기
  // let scrollHeight = Math.max(
  //   document.body.scrollHeight, document.documentElement.scrollHeight,
  //   document.body.offsetHeight, document.documentElement.offsetHeight,
  //   document.body.clientHeight, document.documentElement.clientHeight
  // );

  // #스크롤 정보 얻기
  // 1. document.documentElement.scrollLeft / scrollTop
  // 2. document.body.~~~ (webkit 브라우저에서는 1번이 안됨)
  // 3. 브라우저 상관없이 window.pageYoffset

  // from 모던 자바스크립트
  function scrollLoop() {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }
    if (yOffset < prevScrollHeight) {
      //바운스로 인해 currentScene이 음수가 되는 현상 방지
      currentScene && currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }
  }
  window.addEventListener("load", setLayout);
  window.addEventListener("resize", setLayout);
  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
})();
