# 들어가기 전에 ... Entity vs Use Case

| 클린 아키텍처 20장. 업무규칙

## Entity

- 대출에 N%의 이자를 부과한다는 사실은 은행이 돈을 버는 업뮤규칙 (Business Rules)이다. 컴퓨터 프로그램으로 이를 자동화하든, 은행직원이 주판을 튕겨서 계산하든 어쨌든 은행에 반드시 존재해야 하는 rule이다. 이러한 rule을 핵심 업무규칙 (Critical Business Rule)이라고 하자.
- 핵심 업무규칙은 보통 데이터를 요구한다. 예를 들어 대출에는 대출잔액, 이자율, 지급 일정 등이 필요하다. 이러한 데이터를 핵심 업무 데이터라고 하자.
- **핵심 규칙과 핵심 데이터는 본질적으로 결합되어있다.** 때문에 객체로 만들기 좋은 후보가 된다. 이러한 유형의 객체를 **엔티티(Entity)**라고 한다.
- 👉 프로그램이 있건 없건, 어떤 프레임워크로 만들던 방법에 상관 없이 비지니스에 항상 존재하는 핵심 명사 + 핵심 동사를 Entity라고 이해했다.

## Use Case

- 유스케이스 예시 (신규 대출을 위한 신상정보 수집하기)
  - 입력: 이름, 주소, 생일, 주민번호 등
  - 출력: 신용도, 대출가능여부
  - 기본과정:
  1. 이름, 주소, 생일, 주민 번호 등을 받는다.
  2. 신용정보기관 api등을 통해 신용도를 조회한다.
  3. 신용도가 500보다 낮으면 거절버튼을 활성화한다.
  4. 신용도가 500보다 높으면 Customer 엔티티를 생성하고, 대출견적을 활성화한다.
- 👉 구체적인 Flow를 그려낸 것. 애플리케이션 동작 시나리오.
- 위 유스케이스는 Customer 엔티티에 의존하고 있다.
  - 유스케이스는 엔티티에 의존하지만, 엔티티는 유스케이스에 의존하지 않는다.
- 유스케이스가 엔티티를 제어한다.
- 유스케이스는 사용자와 엔티티 사이의 상호작용을 규정한다.
- 👉 똑같은 신용대출 애플리케이션이라도 유스케이스는 서로 다르기 쉬운 것 같다.

<br>

# 애플리케이션 설계 실습

## 목표

- 쿠키 가게 아키텍처를 설계한다.
- 상점에서는 여러 종류의 쿠키를 판매한다.
- 이용자는 쿠키를 선택하여 주문하고, 제3자 결제 서비스에서 주문대금을 지불한다.
- 인증된 경우에만 쿠키를 구입할 수 있다.
- 로그인 버튼을 누르면 로그인할 수 있는 로그인 페이지로 이동한다.
- 로그인에 성공하면 장바구니에 쿠키를 넣을 수 있다.
- 쿠키를 장바구니에 담으면 주문할 수 있다.
- 지불 후 목록에 새 주문이 표시되고 장바구니가 지워진다.

| entities, use cases and functionality를 생각해보고, 이들이 앞에서 설명한 3계층 중 어디에 속하는지 알아보자.

<br>

## 1. Designing Domain

- 도메인: 애플리케이션의 주요 엔터티와 해당 데이터 변환이 있는 곳
- 상점 도메인
  - the data types of each entity: user, cookie, cart, and order;
  - the factories for creating each entity, or classes if you write in OOP;
  - and transformation functions for that data.
- transformation functions는 오직 rules of the domain에만 의존해야 한다. 예를 들면,
  - 총액을 계산하는 함수
  - 유저의 취향을 탐지하는 함수
  - 특정 쿠키가 카트에 담겨있는지 여부를 결정하는 함수

<br>

## 2. Designing Application Layer

- use cases들이 있는 곳.
- use case 는 항상 actor, action, result를 포함한다.
- 👉 누가, 무엇을 했더니, 무엇이 되었다.
- 유스케이스는 시나리오다.
- "체크아웃 시나리오" 예시
  1. 장바구니에서 항목을 검색하고 새 주문을 생성
  2. 주문에 대한 지불
  3. 결제 실패 시 사용자에게 알림
  4. 결제 성공 시 장바구니를 비우고 주문결과를 보여줌
- 위 시나리오를 설명하는 코드들이 바로 **use case function**들이다.
- 외부 세계와 통신하기 위한 인터페이스인 포트가 존재하는 곳이기도 하다.

## 3. Designing Adapters Layer

- 이곳에서는 외부 서비스들에 대한 어댑터들을 정의한다.
- Frontend에서 어댑터는 대부분이 UI framework + API server request module이다.
- 우리의 예시에서는,
  - UI-framework;
  - API request module;
  - Adapter for local storage;
  - Adapters and converters of API answers to th application layer.

## 막힌다면 MVC를 떠올려보자.

| 3계층 아키텍쳐와 컨셉이 완전히 동일하진 않지만 대략적인 판단에 도움될 수 있다.

- models are usually domain entities,
- controllers are domain transformations and application layer
- view is driving adapters.
