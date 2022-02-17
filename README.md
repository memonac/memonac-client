# Refactor (TODO)

추후 리팩토링을 위한 파일입니다. 배포 전 프로젝트와 관련된 리드미로 변경될 예정입니다. 
develop 브랜치에서 pull 받은 후 작업하면서 추가로 리팩토링 되어야 하는 부분들을 아래에 적어주세요!

## feature/1013

 - express-validator : req.body validation을 배열 형식이 아닌 다른 방식으로 업데이트 
 - 특이 에러 케이스에 대해서 다시 한번 에러 핸들링 체크 필요(mongoDB error)
 - services >> memoroom.getAllMemoRoom flatMap으로 리팩토링 혹은 별도 함수를 따로 만들어 관리

## feature/1015
- memoRoom.js 추후 share 관련 컴포넌트로 분리 필요
- error, success의 naming, 그리고 지역 변수로 관리될 필요가 있는지, 그에 따라 useEffect가 필요한지에 따라 추후 리팩토링 필요

## feature/1016
- Audio component 정리 필요

## feature/1017
 - formdata append 처리
 - 형식에 맞지 않는 파일 업로드 시, 에러 처리

## feature/1019
 - 채팅 컴포넌트 생성
 - 채팅시 소켓이용하여 실시간 통신 구현 완료
 - 해당 대화 이력을 데이터베이스에 저장을 해야 하기 때문에 처음 axios로 요청을 보내려고 하다가 socket
   으로 이미 서버와 통신을 하고 있기도하고 해당 대화 이력을 정확하게 db에 저장해야 하기 때문에 사용자가
   대화를 보낼때 마다 db에 저장을 하기 때문에 별도의 axios 요청을 보내지 않음 
 - 대화 이력을 처음에 불러올때 현재는 데이터가 적어서 괜찮지만 대화 내역이 많아지면 불러오는 시간이 오래
   소요 되기 때문에 무한스크롤 적용 예정
 - 무한스크롤은 이전에 했던 스크롤 위치값을 가져오면 reflow가 생겨 비효울적이므로 Intersection 
   observer 를 구현 예정

## feature/1024
 - dnd 위치값 em으로 변경 필요 (현재 100VH, 100VW로 되어있음)

## feature/1026
 - 태그 검색 로직 useCallback 없애고 debounce로만 구현

## feature/1028
 - slice 함수 정리(코드정리)
 - memoroom 내에서 share 모달 별도 분리
 - react-dnd 외부영역 스크롤 방지
 - 메모 사이즈 동시 렌더링 체크 필요

## feature/1029
- new memo 새로운 메모 만들시에 해당 메모룸에 참가하고 있는 사용자에게도 보여주어야 하므로 axios로
  먼저 요청후 요청이 성공한다면 socket 통신으로 해당 추가된 메모 정보를 전달 하는것으로 수정
