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
    { name: "학생13", title: "모듈러 건축의 접합부 상세 개발", desc: "설명글을 여기에 적어주세요." },
    { name: "학생14", title: "BIM 기반 물량 산출 자동화", desc: "설명글을 여기에 적어주세요." },
    { name: "학생15", title: "드론을 활용한 외벽 점검 시스템", desc: "설명글을 여기에 적어주세요." },
    { name: "학생16", title: "해상 풍력 발전단지 기초 구조", desc: "설명글을 여기에 적어주세요." },
    { name: "학생17", title: "탄소 중립을 위한 친환경 콘크리트", desc: "설명글을 여기에 적어주세요." },
    { name: "학생18", title: "스마트 시티 교통 흐름 분석", desc: "설명글을 여기에 적어주세요." },

    // 4열
    { name: "학생19", title: "노후 공동주택 리모델링 방안", desc: "설명글을 여기에 적어주세요." },
    { name: "학생20", title: "건축물 생애주기 비용(LCC) 분석", desc: "설명글을 여기에 적어주세요." },
    { name: "학생21", title: "비정형 건축물의 시공 오차 관리", desc: "설명글을 여기에 적어주세요." },
    { name: "학생22", title: "지진 하중에 대한 면진 시스템", desc: "설명글을 여기에 적어주세요." },
    { name: "학생23", title: "화재 시 피난 시뮬레이션", desc: "설명글을 여기에 적어주세요." },
    { name: "학생24", title: "건물 일체형 태양광(BIPV) 효율", desc: "설명글을 여기에 적어주세요." },

    // 5열
    { name: "학생25", title: "대공간 구조물의 붕괴 매커니즘", desc: "설명글을 여기에 적어주세요." },
    { name: "학생26", title: "콘크리트 균열 자기 치유 기술", desc: "설명글을 여기에 적어주세요." },
    { name: "학생27", title: "실내 공기질(IAQ) 개선 방안", desc: "설명글을 여기에 적어주세요." },
    { name: "학생28", title: "소음 저감을 위한 바닥 구조", desc: "설명글을 여기에 적어주세요." },
    { name: "학생29", title: "건설 폐기물 재활용 블록", desc: "설명글을 여기에 적어주세요." },
    { name: "학생30", title: "OSC 기반의 병원 건축", desc: "설명글을 여기에 적어주세요." },

    // 6열
    { name: "학생31", title: "달 기지 건설을 위한 3D 프린팅", desc: "설명글을 여기에 적어주세요." },
    { name: "학생32", title: "초장대 교량의 케이블 해석", desc: "설명글을 여기에 적어주세요." },
    { name: "학생33", title: "머신러닝을 이용한 공사비 예측", desc: "설명글을 여기에 적어주세요." },
    { name: "학생34", title: "스마트 글래스 에너지 성능", desc: "설명글을 여기에 적어주세요." },
    { name: "학생35", title: "도심지 지하 터널 굴착 안정성", desc: "설명글을 여기에 적어주세요." },
    { name: "학생36", title: "미래형 수직 농장(Vertical Farm)", desc: "설명글을 여기에 적어주세요." },
];


// 2. 배치도 자동 생성 함수 (데이터 연결)
const gridContainer = document.getElementById('layout-grid');

function createLayout() {
    gridContainer.innerHTML = '';

    students.forEach((student, index) => {
        // 1) 학생 이름표 생성
        const div = document.createElement('div');
        div.classList.add('student-item');
        
        // [수정] 3, 9, 15... 번째 요소에 여백 클래스 추가
        if (index % 6 === 2) {
            div.classList.add('aisle-right');
        }
        
        div.innerHTML = `
            <span class="panel-label">PANEL</span>
            <span class="student-name">${student.name}</span>
        `;
        
        // [핵심 수정] 클릭 시 설명(student.desc)도 함께 보냄!
        div.onclick = () => openModal(student.name, student.title, student.desc);
        
        gridContainer.appendChild(div);

        // 2) 줄 바꿈 및 그룹 나누기
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