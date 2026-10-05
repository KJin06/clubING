// clubING 와이어프레임 스크립트
// 1) 모든 화면에 같은 사이드바·상단바를 채움
// 2) data-a="번호" 가 붙은 요소에 주석 번호 동그라미를 넣음
// 3) 1920x1080 화면을 액자 너비에 맞게 줄임

const NAV = [
  ['home', '홈'],
  ['calendar', '캘린더'],
  ['events', '행사·플레이북'],
  ['handover', '인수인계'],
  ['retro', '회고'],
  ['-'],
  ['knowhow', '노하우 공유'],
  ['members', '임원·권한'],
];

function fillSide(side) {
  const active = side.dataset.active;
  const items = NAV.map(([key, label]) =>
    key === '-' ? '<span class="sep"></span>'
      : `<span class="${key === active ? 'on' : ''}">${label}</span>`
  ).join('');
  side.innerHTML = `
    <div class="logo"><i></i>clubING</div>
    <div class="org"><div>컴퓨터정보공학부 학생회<small>2026 · 임원 5명</small></div>▾</div>
    <nav class="nav">${items}</nav>
    <div class="help">클럽이에게 물어보기</div>`;
}

function fillTop(top) {
  const user = top.dataset.user || '참상아 · 회장';
  const coin = top.dataset.coin || '120';
  top.innerHTML = `
    <h1>${top.dataset.title}</h1>
    <div class="search">행사, 체크리스트, 회고, 인수인계 답변 검색</div>
    <div class="coin">${coin}</div>
    <div class="bell"></div>
    <div class="me"><span class="av">${user.slice(0, 1)}</span>${user}</div>`;
}

document.querySelectorAll('.frame .side').forEach(fillSide);
document.querySelectorAll('.frame .top').forEach(fillTop);
document.querySelectorAll('.frame [data-a]').forEach(el => {
  const mark = document.createElement('i');
  mark.className = 'anno';
  mark.textContent = el.dataset.a;
  el.appendChild(mark);
});

// 액자 배율
function fit() {
  document.querySelectorAll('.frame-wrap:not(.actual)').forEach(wrap => {
    wrap.style.setProperty('--s', wrap.clientWidth / 1920);
  });
}
fit();
if ('ResizeObserver' in window) {
  const ro = new ResizeObserver(fit);
  document.querySelectorAll('.frame-wrap').forEach(w => ro.observe(w));
} else {
  window.addEventListener('resize', fit);
}

// 주석 번호 보이기/숨기기
const annoBtn = document.getElementById('toggle-anno');
if (annoBtn) {
  annoBtn.addEventListener('click', () => {
    const show = annoBtn.getAttribute('aria-pressed') !== 'true';
    annoBtn.setAttribute('aria-pressed', String(show));
    document.body.classList.toggle('hide-anno', !show);
  });
}

// 원본 크기로 보기
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const wrap = document.getElementById(btn.dataset.target);
    const actual = wrap.classList.toggle('actual');
    btn.textContent = actual ? '화면에 맞추기' : '원본 크기 (1920×1080)';
    fit();
  });
});
