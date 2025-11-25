/* -------------------------------------------------------
   [기존 상단 코드] 스크롤 애니메이션 (유지)
   ------------------------------------------------------- */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach((el) => observer.observe(el));


/* ==========================================================
   [NEW] Layout 배치도 시스템 (설명 기능 추가됨)
   ========================================================== */

// 1. 학생 데이터 (여기서 'desc' 부분을 수정하세요!)
const students = [
    // 1열
    { name: "김한양", title: "도심 항공 모빌리티(UAM) 버티포트", desc: "UAM 상용화에 대비한 도심형 수직 이착륙장(Vertiport)의 효율적인 동선 체계와 구조적 안전성을 분석한 연구입니다." },
    { name: "이건축", title: "친환경 목구조 하이라이즈 빌딩", desc: "탄소 배출 저감을 위한 고층 목조 건축의 접합부 상세 개발 및 내화 성능 검증에 관한 프로젝트입니다." },
    { name: "박공학", title: "AI 기반 건축 구조 안전 진단", desc: "딥러닝 알고리즘을 활용하여 콘크리트 균열 이미지를 분석하고, 건물의 안전 등급을 자동으로 산정하는 시스템입니다." },
    { name: "최구조", title: "초고층 빌딩 풍진동 제어", desc: "설명글을 여기에 적어주세요." },
    { name: "정시공", title: "스마트 건설 현장 안전 솔루션", desc: "설명글을 여기에 적어주세요." },
    { name: "강환경", title: "제로 에너지 빌딩 이중 외피", desc: "설명글을 여기에 적어주세요." },

    // 2열
    { name: "조설계", title: "메타버스 가상 건축 공간", desc: "설명글을 여기에 적어주세요." },
    { name: "윤도시", title: "포스트 코로나 주거 공간 변화", desc: "설명글을 여기에 적어주세요." },
    { name: "장재료", title: "3D 프린팅 콘크리트 배합", desc: "설명글을 여기에 적어주세요." },
    { name: "한설비", title: "데이터센터 냉각 효율 최적화", desc: "설명글을 여기에 적어주세요." },
    { name: "오역사", title: "한국 전통 건축의 현대적 재해석", desc: "설명글을 여기에 적어주세요." },
    { name: "송재생", title: "폐공장 리모델링 도시 재생", desc: "설명글을 여기에 적어주세요." },

    // 3열
    { name: "전선일", title: "고에너지 X선을 활용한 GO-LDH 복합체 혼입 해수 알칼리 활성화 재료의 반응 생성물 분석", desc: "설명글을 여기에 적어주세요." },
    { name: "이종혁", title: "서울시 권역별 주택가격 결정요인 분석:PF·금융규제·심리 변수를 반영한 실증 연구", desc: "설명글을 여기에 적어주세요." },
    { name: "이상휘", title: "드론을 활용한 외벽 점검 시스템", desc: "설명글을 여기에 적어주세요." },
    { name: "안문호", title: "응답스펙트럼 해석을 위한 소프트웨어 개발", desc: "설명글을 여기에 적어주세요." },
    { name: "성무규", title: "WUF-W 접합부 설계 자동화 프로세스 개발", desc: "설명글을 여기에 적어주세요." },
    { name: "김한울", title: "RC 기둥의 파괴모드 분류 방법 제안", desc: "설명글을 여기에 적어주세요." },

    // 4열
    { name: "카잉윈티탄트", title: "지속가능한 지역 재활성화와 보행 친화성을 위한 서울역 복합환승 허브 재개발 제안", desc: "설명글을 여기에 적어주세요." },
    { name: "보연영", title: "슬래그 특성을 고려한 3D 프린팅 콘크리트의 성능 및 구조 적합성 평가", desc: "설명글을 여기에 적어주세요." },
    { name: "백인휘", title: "콘크리트 슬래브의 갈고리 겹침이음길이에 따른 이음강도평가", desc: "설명글을 여기에 적어주세요." },
    { name: "곽현오", title: "목재의 밀도 및 투수성을 고려한 탄화깊이식 제안", desc: "설명글을 여기에 적어주세요." },
    { name: "한재혁", title: "외기 도입 기준 방식에 따른 에너지 절감 효과 비교", desc: "설명글을 여기에 적어주세요." },
    { name: "한성우", title: "LLM을 활용한 그래스호퍼 기반 대화형 설계 및 외피 일사량 최적화 알고리즘 연구", desc: "설명글을 여기에 적어주세요." },

    // 5열
    { name: "이재훈", title: "경제성과 환경성을 고려한 2050년 대한민국 최적 전원믹스 시뮬레이션", desc: "설명글을 여기에 적어주세요." },
    { name: "송현우", title: "콘크리트 균열 자기 치유 기술", desc: "설명글을 여기에 적어주세요." },
    { name: "박호일", title: "재실자수에 따른 디맨드 컨트롤 에너지 절감 효과분석", desc: "설명글을 여기에 적어주세요." },
    { name: "박병준", title: "일사량 측정을 통한 공동주택 최적 배치 분석", desc: "설명글을 여기에 적어주세요." },
    { name: "나병윤", title: "단층 건물 형상과 부하: 부피 고정 다기후 분석", desc: "설명글을 여기에 적어주세요." },
    { name: "김채원", title: "서울시립미술관 본관을 대상으로 한 OpenStudio 기반 신재생에너지 최적화 시뮬레이션 연구", desc: "설명글을 여기에 적어주세요." },

    // 6열
    { name: "황동욱", title: "건설현장 CCTV 영상을 활용한 딥러닝 기반 실시간 안전모 착용 탐지 연구", desc: "설명글을 여기에 적어주세요." },
    { name: "정지환", title: "초장대 교량의 케이블 해석", desc: "설명글을 여기에 적어주세요." },
    { name: "정민관", title: "균열단면을 고려한 프리스트레스트 중공 슬래브(HCS) 구조해석", desc: "설명글을 여기에 적어주세요." },
    { name: "이지수", title: "횡력저항시스템(SRFS) 기반 구조 부재의 역할 분류를 통한 KDS 내진 상세 규정 검토 자동화 모듈", desc: "설명글을 여기에 적어주세요." },
    { name: "이동건", title: "지진 발생 시 건축물의 기능손실기간을 고려한 취약도 함수 기반 손실금액 산정", desc: "설명글을 여기에 적어주세요." },
    { name: "이건우", title: "비균일 강성을 고려한 초고층 건물의 아웃리거 최적 배치에 관한 연구", desc: "설명글을 여기에 적어주세요." },

    // 7열
    { name: "윤준성", title: "딥러닝 의미 분할을 활용한 건축 도면 지능형 노이즈 제거 및 중심선 추출", desc: "설명글을 여기에 적어주세요." },
    { name: "묘묘", title: "노후 단독주택의 리모델링에 대한 모듈러 공법 적용 연구- 공간 확장과 증축 중심으로", desc: "설명글을 여기에 적어주세요." },
    { name: "최동혁", title: "컴퓨터 비전 기반 CNN 전이학습 모델의 콘크리트 순환골재 미분말 함유량 예측 모델 성능 비교 연구", desc: "설명글을 여기에 적어주세요." },
    { name: "정희찬", title: "3D 프린팅 콘크리트의 골재량 및 PP섬유 혼입률이 유변학적 특성 및 소성 수축 균열에 미치는 상호 영향 분석", desc: "설명글을 여기에 적어주세요." },
    { name: "정윤아", title: "굴패각을 활용한 알칼리 활성 고로슬래그 경화체의 기초적 특성에 관한 연구", desc: "설명글을 여기에 적어주세요." },
    { name: "정민성", title: "바인더 젯팅 3D 프린팅 시멘트 모르타르의 기계적 특성 및 치수 정확도에 미치는 열", desc: "설명글을 여기에 적어주세요." },

    // 8열
    { name: "장훈희", title: "폐콘크리트 침목 골재 전처리에 따른 흡음 블록 제작 가능성 평가", desc: "설명글을 여기에 적어주세요." },
    { name: "임영채", title: "소듐 알루미네이트 함량에 따른 알칼리 활성화 폐콘크리트 미분말의 강도 발현 메커니즘", desc: "설명글을 여기에 적어주세요." },
    { name: "임여진", title: "SCMs를 혼입한 폐콘크리트 미분말의 2단계 탄산화 반응을 통해 생성된 실리카겔의 특성에 관한 연구", desc: "설명글을 여기에 적어주세요." },
    { name: "유창모", title: "알칼리 토금속 이온을 첨가한 이산화탄소 반응경화형 결합재의 반응 생성물 형태 특성 및 기계적 물성 분석", desc: "설명글을 여기에 적어주세요." },
    { name: "안병건", title: "VMA 함량이 3D 프린팅 콘크리트의 유변학적 특성에 미치는 영향 연구", desc: "설명글을 여기에 적어주세요." },
    { name: "손명규", title: "그래핀 옥사이드(GO)가 첨가된 칼슘 실리케이트 수화물(CSH) 페이스트의 화학적 구조 특성에 관한 연구", desc: "설명글을 여기에 적어주세요." },

    // 9열
    { name: "문태선", title: "나노 TiO2 다형체가 탄산화 양생한 γ-C2S 클링커의 반응 생성물 및 기계적 물성에 미치는 영향", desc: "설명글을 여기에 적어주세요." },
    { name: "김영찬", title: "고온 양생 조건에서 PLC 삼성분계 바인더의 반응 특성 및 서중 콘크리트 적용 가능성 연구", desc: "설명글을 여기에 적어주세요." },
    { name: "김서영", title: "알카놀아민계 혼화제를 혼입한 석회석, 슬래그 혼합 시멘트의 물성 및 강도 실험을 통한 현장 적용성 평가", desc: "설명글을 여기에 적어주세요." },
    { name: "권희선", title: "층상 이중 수산화물/그래핀 옥사이드 복합체가 첨가된 해수 혼합 알칼리 활성화 슬래그의 특성 분석", desc: "설명글을 여기에 적어주세요." },
    { name: "장영환", title: "해석 가능 AI 기반 서울시 상권 매출영향 요인 분석", desc: "설명글을 여기에 적어주세요." },
    { name: "이서연", title: "실물옵션 도입을 가정한 이산화탄소 및 그린수소 활용 e-메탄을 생산 국내 도입 타당성 분석", desc: "설명글을 여기에 적어주세요." },

    // 10열
    { name: "윤태웅", title: "임대주택 브랜드 오퍼레이터가 오피스텔 임대시장에 미치는 영향 분석", desc: "설명글을 여기에 적어주세요." },
    { name: "송낙범", title: "머신러닝 기반 주요 업무 권역 부동산 투자 자본환원율(Capitalization Rate) 예측모형 비교", desc: "설명글을 여기에 적어주세요." },
    { name: "박다연", title: "패널 회귀분석을 통한 건설기업 재무성과와 거시경제변수 간의 상관관계 분석", desc: "설명글을 여기에 적어주세요." },
    { name: "김재원", title: "거대 언어 모델 기반 시방 준수 검토 성능 향상을 위한 검색 증강 생성 기법의 효과성 검증", desc: "설명글을 여기에 적어주세요." },
    { name: "고예성", title: "교량 상판 균열 모니터링 디지털 트윈 구현을 위한 3D 가우시안 스플래팅 활용 포토그래메트리 방법론 제안", desc: "설명글을 여기에 적어주세요." },
    { name: "가한결", title: "진도관리를 위한 하이브리드 데이터셋 기반 자재 반입 As-Built 데이터 수집 자동화 시스템 제안 및 적용성 검증", desc: "설명글을 여기에 적어주세요." },
];


// 2. 배치도 자동 생성 함수 (업데이트: 수직선 클래스 추가)
const gridContainer = document.getElementById('layout-grid');

function createLayout() {
    gridContainer.innerHTML = '';

    students.forEach((student, index) => {
        // 1) 학생 이름표 생성
        const div = document.createElement('div');
        div.classList.add('student-item');
        
        // [기존] 3, 9, 15... 번째 요소에 여백 클래스 추가 (복도 만들기)
        if (index % 6 === 2) {
            div.classList.add('aisle-right');
        }

        // [NEW] 수직선 추가 로직 (3번째, 6번째 사람 빼고 모두 선을 그어라)
        // (index+1)이 3의 배수가 아니면 선을 가집니다.
        if ((index + 1) % 3 !== 0) {
            div.classList.add('has-line');
        }
        
        div.innerHTML = `
            <span class="panel-label">PANEL</span>
            <span class="student-name">${student.name}</span>
        `;
        
        div.onclick = () => openModal(student.name, student.title, student.desc);
        
        gridContainer.appendChild(div);

        // 2) 줄 바꿈 및 그룹 나누기 (기존 로직 유지)
        const currentCount = index + 1;
        if (currentCount % 6 === 0 && currentCount !== students.length) {
            if (currentCount % 12 === 0) {
                const spacer = document.createElement('div');
                spacer.classList.add('group-spacer');
                gridContainer.appendChild(spacer);
            } else {
                const divider = document.createElement('div');
                divider.classList.add('row-divider');
                gridContainer.appendChild(divider);
            }
        }
    });
}

// 3. 팝업창 열기 함수 (설명 추가됨)
function openModal(name, title, desc) {
    const modal = document.getElementById('project-modal');
    
    // 텍스트 채워넣기
    document.getElementById('modal-name').innerText = name;
    document.getElementById('modal-title').innerText = title;
    
    // [핵심 수정] 설명이 있으면 넣고, 없으면 기본 문구 출력
    const descElement = document.getElementById('modal-desc');
    if (desc) {
        descElement.innerText = desc;
    } else {
        descElement.innerText = "추가 설명이 준비되지 않았습니다.";
    }
    
    modal.style.display = 'flex';
}

// 4. 팝업창 닫기 함수
function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.style.display = 'none';
}

// 초기 실행
createLayout();

/* ==========================================================
   [NEW] 스크롤 스파이 (Scroll Spy)
   : 현재 보고 있는 섹션의 메뉴 글자를 밝게 비춤
   ========================================================== */

// 1. 관찰할 대상들 설정
const sections = document.querySelectorAll('section'); // 모든 섹션
const navLinks = document.querySelectorAll('.nav-menu a'); // 모든 메뉴 링크

// 2. 관찰자(Observer) 옵션 설정
const spyOptions = {
    root: null,
    rootMargin: "-50% 0px -50% 0px", // 화면의 정중앙을 가로지르는 선을 기준으로 감지
    threshold: 0
};

// 3. 관찰 로직
const scrollSpy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 화면 중앙에 들어온 섹션의 ID를 가져옴
            const currentId = entry.target.getAttribute('id');
            
            // 모든 메뉴의 active 클래스 제거 (초기화)
            navLinks.forEach(link => {
                link.classList.remove('active');
                
                // 현재 섹션과 연결된 링크만 active 클래스 추가
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, spyOptions);

// 4. 모든 섹션에 관찰자 붙이기
sections.forEach(section => {
    scrollSpy.observe(section);
});