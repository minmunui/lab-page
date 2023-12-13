# When To Meet

## 프로젝트 설치하기

### node 프로젝트 설치

해당 프로젝트를 실행하기 위해서는 node.js가 필요합니다. 프로젝트 개발에 사용된 node버전은 16.16.0입니다. 노드를 설치해 주세요.

[Node.js](https://nodejs.org/en)

파일 압축을 해제하거나, 레포지토리를 클론하여 디렉터리에 저장합니다. 해제한 폴더 time-to-meet의 루트경로에서 아래 명령어를 실행해 프로젝트를 설치합니다.

```jsx
npm start
```

### 데이터베이스 가동

`config/config.json` 에서 데이터베이스 정보를 확인하여, MySQL 데이터베이스를 생성해야 합니다. 기본 데이터베이스 이름은 `whenToMeet`입니다.

```jsx
create schema whenToMeet
```

상세 스키마는 Sequelize를 이용하여 프로젝트 생성 시, 자동으로 작성됩니다.

### Tailwindcss 실행

해당 프로젝트의 스타일이 제대로 작동하지 않을 수도 있습니다. tailwind를 통해 작성된 스타일을 적용하기 위해서는 `css`파일 추출이 필요할 수 있습니다. 아래 명령어를 통해 `css`파일을 추출합니다.

```jsx
npm run dev
```

모든 준비가 끝나고 아래의 주소로 접속하면 화면을 확인할 수 있습니다.

```jsx
https://localhost:8001
```

## 서비스 이용하기

### 회원가입 및 로그인

서비스에 접속하면 아래와 같은 화면을 볼 수 있습니다. 회원가입을 해야만, 서비스를 이용할 수 있습니다. 회원가입버튼을 눌러 회원가입을 진행합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cf979c83-ea45-4035-a68a-d9fa058e8a50/c9271b82-f866-401b-8d2a-f359284fec61/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cf979c83-ea45-4035-a68a-d9fa058e8a50/1709ac69-8a41-49c1-ab31-58dbb077500c/Untitled.png)

회원가입 후, 로그인하면 아래와 같은 화면을 보게 됩니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cf979c83-ea45-4035-a68a-d9fa058e8a50/b5a579b1-e968-442e-83cc-e253cfae8a00/Untitled.png)

### 그룹 생성하기

그룹을 생성해야 서비스를 이용할 수 있습니다. ‘그룹 생성’을 통해 그룹을 생성합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cf979c83-ea45-4035-a68a-d9fa058e8a50/e8159f2e-386c-44ae-852a-975fe4779477/Untitled.png)

필요한 정보를 입력하고, 그룹을 생성합니다. 그룹을 생성하면, 해당 그룹 페이지로 자동으로 이동합니다. 그룹 페이지에는 그룹에 대한 정보, 참가함 사람들의 목록, 각 멤버들의 가능한 시간대 차트들이 표시됩니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cf979c83-ea45-4035-a68a-d9fa058e8a50/942503e8-aaf9-48b3-80a9-f15f0cf43233/Untitled.png)

메인 화면에서는 아래와 같이 나타납니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cf979c83-ea45-4035-a68a-d9fa058e8a50/bbc2b19e-4926-46da-a7a3-1541cb98a1b6/Untitled.png)

### 그룹 참가 및 일정 기록하기

회원이 특정 그룹에 입장할 경우, 자동으로 그룹에 추가되어 표가 수정됩니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cf979c83-ea45-4035-a68a-d9fa058e8a50/498ce645-6123-4359-ae6f-ca4b5e8b9ca4/Untitled.png)

각 블록을 클릭 및 드래그하여, 일정을 기록할 수 있습니다. 기본적으로 붉은색은 불가능한 시간대, 녹색은 가능한 시간대입니다. 타인의 시간 역시 조정이 가능하여, 이를 통해 유연하게 사용할 수 있습니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cf979c83-ea45-4035-a68a-d9fa058e8a50/ea59fdfc-3819-4c39-951d-9a6dc387ab49/Untitled.png)

## 아쉬운 점

기본 데모버전이므로 컨셉만이 구현되었습니다. 다양한 기능을 추가하여 퀄리티를 높일 수 있을 것으로 기대합니다.

### 역할 지정

역할 지정을 통해서 다양한 기능을 추가할 수 있습니다. 멤버의 경우에는 본인의 일정만을 수정할 수 있고, 관리자의 경우 모든 멤버의 일정을 수정할 수 있게 하는 것입니다. 또한 관리자의 경우 멤버를 강퇴하는 기능을 추가한다면, 원치 않는 사용자를 제거할 수 있습니다.

### 더 많은 일정

데모버전인 현재에는 24시간을 기준으로만 가능하지만, 달력과 일자를 추가하거나, 현재는 1시간인 시간 간격을 변경 가능하게 한다면 좀 더 높은 퀄리티의 프로젝트가 될 것으로 기대됩니다.