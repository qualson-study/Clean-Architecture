## 클린 아키텍처로 얻고자 하는 것

- 시스템의 확장성: 프로그램을 쉽게 업데이트하고 수정할 수 있다.

<br>

## 클린 아키텍처 정의

- 클린 아키텍처는 애플리케이션 도메인에 대한 근접성에 따라 책임과 기능 부분을 분리하는 방법이다.
- 클린 아키텍처 = 3계층 아키텍쳐
- 3계층 = Domain Layer + Application Layer + Adapters Layer
- 3계층 아키텍처는 클린 아키텍처를 분석하기 위한 도식 중 하나라고 이해된다. 유사품이 Hexagonal Architecture (a.k.a. Ports and Adapters) 인듯.

<br>

## 3계층 아키텍처 뜯어보기 - 중심부터 바깥으로

### 1. Domain Layer

- It is the entities and data that describe the subject area of the application, as well as the code to transform that data
- The domain is the core that distinguishes one application from another.
- 프레임워크를 React to Angular 바꾸거나 use case를 바꿔도 변하지 않는 코어 부분이 도메인이다.
  - ex. 상점의 경우 제품, 주문, 사용자, 장바구니 및 데이터를 업데이트하는 기능은 프레임워크에 종속적이지 않다.
- 도메인 엔터티의 데이터 구조와 변환의 본질은 외부 세계와 독립적입니다. ??
  - 장바구니에 항목을 추가하는 기능은 항목이 정확히 얼마나 추가되었는지에 상관하지 않습니다. "구매" 버튼을 통해 사용자가 직접 또는 프로모션 코드를 사용하여 자동으로. 두 경우 모두 항목을 수락하고 추가된 항목과 함께 업데이트된 장바구니를 반환합니다. << 이해 안감
- cf. 도미엔 주도 설계 (DDD)에서 도메인이란, “해결하고자 하는 문제 영역”이다.
  - 도메인은 다시 하위의 여러 도메인으로 나누어지곤 합니다. 예를 들면 “온라인 쇼핑” 도메인은 “상품”, “주문”, “회원”과 같은 하위 도메인으로 나뉘고, 이 중 “주문” 도메인은 또다시 “주문자”, “주문 상품”, “배송”과 같은 하위 도메인으로 나눠질 수 있습니다. [링크](https://medium.com/myrealtrip-product/what-is-domain-driven-design-f6fd54051590)
- cf. Domain Layer는 Business Rule이 존재하는 영역입니다. 번역앱은 번역을 하고, 결제 앱은 결제를 수행합니다. 이렇듯 비즈니스의 본질은 쉽게 바뀌지 않으므로 Business Rule은 잘 변하지 않는 안정된 영역입니다. [링크](https://dataportal.kr/74)

### 2. Application Layer

- This layer describes use cases, i.e. user scenarios.
- 어떤 event가 발생한 후에 일어나는 일에 책임지는 부분
- 장바구니에 추가 = use case = 버튼 이벤트(A) + 이후에 일어나는 일(B)
  - 버튼 클릭 이벤트가 발생한 후에 어떠어떠하게 되어야한다~ 를 설명하자면, 아래와 같으며 이것이 일종의 "orchestrator"이다. 즉 orchestrator = B라고 이해할 수 있을 것 같다.
    1. 서버로 이동하여 요청을 보냅니다.
    2. domain transformation (상태변경을 의미하는 듯)
    3. redraw the UI
- Application Layer 내부에는 "ports"가 있다.
  - 일반적으로 port는 interface, 즉 behavior contract이다.
- ports = Input Ports + Output Ports
  - Input Ports tell us how the application wants to be contacted by the outside world
  - Output Ports say how the application is going to communicate with the outside world to make it ready.

### 3. Adapters Layer

- Adapters Layer 내부에는 "adapters"가 있다.
- 외부 서비스의 호환되지 않는 API를 애플리케이션이 원하는 것과 호환되는 API로 변환하려면 어댑터가 필요합니다.
- lower the coupling between our code and the code of third-party services를 위해 Adapter를 사용한다.
  - 낮은 결합은 다른 모듈이 변경될 때 한 모듈을 변경해야 하는 필요성을 줄여준다.
- Adapter = driving + driven
  - driving: 앱에 signal을 전송하는 곳 (쏘는 곳)
  - driven: 앱으로부터 signal을 수신하는 곳 (받는 곳)

<br>

## 종속성규칙: 3계층 아키텍처에서 외부 계층만 내부 계층에 의존할 수 있다.

- 올바른 종속성 방향을 생각해야한다.
- 종속성 규칙을 위반하면 아래와 같은 문제가 발생할 수 있다.
  1. Cyclic dependencies: A -> B -> C -> A
  2. Poor testability: 작은 부분을 테스트하기 위해 전체 시스템을 시뮬레이션해야하는 경우가 생김
  3. Too high coupling: 모듈간의 잘못된 상호작용으로 버그가 발생할 수 있음

<br>

## Advantages of Clean Architecture

- Separate domain
- Independent Use Cases
- Replaceable Third-Party Services

<br>

## Costs of Clean Architecture

- Takes Time
- Sometimes Overly Verbose
- Can Make Onboarding More Difficult
- Can Increase the Amount of Code

<br>

## How to reduce costs

- 클린 아키텍처를 도입하면서도 시간을 아끼는 방법
- 즉 현실적으로는 완벽한 클린 아키텍처를 구현할 수 없지만, "이것만은 지키자" 하는 약속

1. Extract Domain

   - 다른 계층을 건너뛰더라도 코드 기반에 퍼지지 않은 추출된 도메인이 있어야 기능 개발하고 리팩토링하는 것이 더 수월할 것임

2. Obey Dependency Rule
   - 외부 서비스는 우리의 필요에 맞게 조정되어야 하며 그렇지 않은 경우에는 절대 적용하지 말라.
   - "fine-tuning"하고 있다면 뭔가 잘못된게 아닌지 점검해보자
