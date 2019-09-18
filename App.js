import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import moment from 'moment';
import 'moment/locale/ko';

import "prop-types";

const styles = StyleSheet.create({
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});


export default class App extends Component {
  state = {
    messages: [],
  };

  renderCustomView = (props) => {
    if (props.currentMessage.location) {
      return (
        <View style={props.containerStyle}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={[styles.mapView]}
            region={{
              latitude: props.currentMessage.location.latitude,
              longitude: props.currentMessage.location.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <MapView.Marker
              coordinate={{
                latitude: props.currentMessage.location.latitude,
                longitude: props.currentMessage.location.longitude
              }}
            />
          </MapView>
        </View>
      );
    }
    return null
  }

  componentWillMount() {
    if (!this.state.messages.length) {
      this.setState({
        messages: [
          {
            _id: Math.round(Math.random() * 1000000),
            text: '0 message',
            createdAt: new Date(),
            system: true
          }]
      })
    }
    this.setState({
      messages: [
        {
          _id: Math.round(Math.random() * 1000000),
          text: '#awesome',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'Developer',
          },
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: '',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
          },
          image: 'http://www.pokerpost.fr/wp-content/uploads/2017/12/iStock-604371970-1.jpg',
          sent: true,
          received: true,
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: 'Send me a picture!',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'Developer',
          },
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: '',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
          },
          sent: true,
          received: true,
          location: {
            latitude: 48.864601,
            longitude: 2.398704
          },
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: 'Where are you?',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'Developer',
          },
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: 'Yes, and I use Gifted Chat!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'js',
            avatar: 'https://kr.seaicons.com/wp-content/uploads/2017/02/add-1-icon.png',
          },
          sent: true,
          received: true
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: 'Are you building a chat app?',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'Developer',
          },
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: "You are officially rocking GiftedChat.",
          createdAt: new Date(),
          system: true,
        },
      ]
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderBubble() {
    console.log("renderBubble");
  }

  renderSystemMessage() {
    console.log("renderSystemMessage");
  }

  onLongPress(context, message) {
    console.log(context, message);
  }

  render() {
    return (
      <>
        {this.state.messages.length === 0 && (
          <View style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 50
            }]}>
            <Image
              source={{ uri: 'https://i.stack.imgur.com/qLdPt.png' }}
              style={{
                ...StyleSheet.absoluteFillObject,
                resizeMode: 'contain'
              }}
            />
          </View>
        )}
        <GiftedChat
          // 표시할 메시지
          messages={this.state.messages}
          // 입력 텍스트, 지정 안해주면 됨. 지정해주면 나옴
          // text={""}

          // 입력 텍스트 비어 있을 때 나오는 값
          placeholder={"입력해라."}
          // messageIdGenerator (Function)-새 메시지의 ID를 생성. uuid에 의해 생성 된 UUID v4의 기본값

          // 메시지 보낼 때
          onSend={(messages) => this.onSend(messages)}
          renderCustomView={this.renderCustomView}
          // 메시지 보내는 사용자 : {_id(고유값), name(이름), avatar(썸네일 : 채팅 상대방일 때 의미 있음.)}
          user={{
            _id: 1,
            name: 'js',
            avatar: 'https://cdn.icon-icons.com/icons2/906/PNG/512/star-1_icon-icons.com_69882.png',
          }}
          // 키패드가 내려가 있어도 Send 버튼 보이는지 여부
          alwaysShowSend={true}
          // 날짜 현지화. 위에 import moment 필요
          locale={'ko'}
          // timeFormat (String)-렌더링 시간에 사용할 형식. 기본값 'LT'. 어떤 값이 있는지 참고 사이트: https://momentjs.com/
          timeFormat={'LTS'}
          // dateFormat (String)-날짜 렌더링에 사용할 형식. 기본값 'll'. 어떤 값이 있는지 참고 사이트: https://momentjs.com/
          dateFormat={'LL'}
          // 키보드가 나타날 때 채팅창 뷰에 애니매이션 적용 여부
          isAnimated={true}
          // Load earlier messages 버튼 활성화,
          loadEarlier={false}
          // onLoadEarlier (Function) - Load earlier message 버튼 콜백 함수
          // isLoadingEarlier={true} - 이전 메시지를로드 할 때 ActivityIndicator를 표시

          //renderLoading - (Function)-초기화 할 때 로딩 뷰를 렌더링
          //renderLoadEarlier - (Function)-사용자 정의 "이전 메시지로드"버튼

          // 함수! 사용자 정의 메시지 아바타, null로 설정하면 아바타 안나옴. 이 함수에서 아바타 그릴 수 있을듯
          // renderAvatar={null}

          // showUserAvatar : 내 아바타 렌더링 여부.
          // showAvatarForEveryMessage : 같은 날 같은 사용자가 연속 메시지를 보낸 경우에만 아바타가 표시됩니다. 기본값은 false입니다
          showUserAvatar={true}
          showAvatarForEveryMessage={true}

          // 아래 두개 함수는 기분 페이지로 이동하거나 간단한 프로필 나오거나 할 때 사용, 안 써도 무방
          // onPressAvatar (Function (user))-메시지 아바타를 탭했을 때의 콜백
          // onLongPressAvatar (Function (user))-메시지 아바타를 길게 누르면 콜백

          // 정확힌 모르겠, 안써도 될듯. enderAvatarOnTop (Bool)-메시지 아바타를 맨 아래가 아닌 연속 된 메시지의 맨 위에 렌더링합니다. 기본값은 false입니다
          renderAvatarOnTop={false}

          // 사용자 정의 메시지 풍선, 사용자 정의 시스템 메시지, 우선 배제
          // renderBubble={() => this.renderBubble()}
          // renderSystemMessage={() => this.renderSystemMessage()}

          // 메시지 길게 눌렀을 때 콜백. 기존에는 복사 기능 있음.
          //onLongPress={(context, message) => this.onLongPress(context, message)}

          // 메시지 표시 순서 반대로, false로 하면 최신이 위로
          inverted={true}
          // 상대방 이름 나올지 여부, 기본 false
          renderUsernameOnMessage={false}

          // 채팅창에서 개행을 했을 때 입력창의 min, max 높이 값
          minComposerHeight={30}
          maxComposerHeight={100}


          // 우선 배제
          // renderMessage (Function)-사용자 정의 메시지 컨테이너
          // renderMessageText (Function)-사용자 정의 메시지 텍스트
          // renderMessageImage (Function)-사용자 정의 메시지 이미지
          // renderMessageVideo (Function)-사용자 정의 메시지 비디오
          // imageProps (Object)-기본 renderMessageImage에 의해 생성 된 <Image> 구성 요소에 전달할 추가 component
          // videoProps (Object)-기본 renderMessageVideo에 의해 생성 된 <Video> 구성 요소로 전달 될 추가 component
          // lightboxProps (Object)-MessageImage의 라이트 박스로 전달할 추가 component

          // isCustomViewBottom (Bool)-텍스트, 이미지 및 비디오보기 전후에 renderCustomView가 표시되는지 확인합니다. 기본값은 false
          // renderCustomView (Function)-버블 내부의 사용자 정의보기

          // renderDay (Function)-메시지 위의 사용자 정의 요일
          // renderTime (Function)-메시지 내부의 사용자 정의 시간
          // renderFooter (Function)-ListView의 맞춤 바닥 글 구성 요소입니다 (예 : '사용자가 입력하고 있습니다 ...'; 예제는 example / App.js를 참조
          // renderChatFooter (Function)-MessageContainer 아래에 렌더링 할 사용자 정의 구성 요소 (ListView와 별도)
          // renderInputToolbar (Function)-사용자 정의 메시지 작성기 컨테이너
          // renderComposer (Function)-사용자 정의 텍스트 입력 메시지 작성기
          // renderActions (Function)-메시지 작성기의 왼쪽에있는 사용자 정의 동작 단추
          // renderSend (Function)-사용자 정의 전송 버튼; 예를 들어 사용자 정의 아이콘 (예)을 사용하여 자식을 원래의 Send 구성 요소로 매우 쉽게 전달할 수 있습니다.
          // renderAccessory (Function)-메시지 작성기 아래의 사용자 지정 두 번째 작업 줄

          // onPressActionButton (Function)-Action 버튼을 눌렀을 때의 콜백 (설정된 경우 기본 actionSheet는 사용되지 않음)
          // bottomOffset (Integer)-화면 하단에서 채팅 거리 (예 : 탭 막대를 표시하는 경우 유용)
          // minInputToolbarHeight (Integer)-입력 도구 모음의 최소 높이입니다. 기본값은 44입니다
          // listViewProps (Object)-<ListView> 메시지에 전달할 추가 component. 일부 component은 재정의 할 수 없습니다. 자세한 내용은 MessageContainer.render ()의 코드를 참조하십시오
          // textInputProps (Object)-<TextInput>에 전달할 추가 component
          // keyboardShouldPersistTaps (Enum)-탭 후 키보드를 계속 볼지 여부를 결정합니다. <ScrollView> 문서를 참조하십시오
          // onInputTextChanged (Function)-입력 텍스트가 변경 될 때 콜백
          // maxInputLength (Integer)-최대 메시지 작성기 TextInput 길이
          // extraData (Object)-요청시 FlatList를 다시 렌더링하기위한 추가 component. 바닥 글 등을 렌더링하는 데 유용합니다.

          // scrollToBottom (Bool)-scrollToBottom 구성 요소를 활성화합니다 (기본값은 false).
          // scrollToBottomComponent (함수)-사용자 정의 스크롤을 맨 아래 컴포넌트 컨테이너
          // scrollToBottomOffset (Integer)-맨 아래 컴포넌트로 스크롤을 표시하기 시작할 사용자 정의 높이 오프셋 (기본값은 200)
          // scrollToBottomStyle (Object)-하단 구성 요소 컨테이너의 사용자 정의 스타일
          // onQuickReply (함수)-빠른 응답을 보낼 때 콜백 (백엔드 서버로)
          // renderQuickReplies (함수)-사용자 정의 빠른 응답보기
          // quickReplyStyle (StyleProp)-사용자 정의 빠른 응답보기 스타일
          // renderQuickReplySend (함수)-사용자 정의 빠른 회신 보내기보기
          // alignTop (부울) 메시지 거품이 채팅 상단에 표시되는지 여부를 제어합니다 (기본값은 false-거품이 아래쪽에 정렬 됨)
          // shouldUpdateMessage (함수)-메시지 구성 요소가 정상적인 경우를 벗어난 업데이트시기를 알려줍니다.

          parsePatterns={linkStyle => [
            {
              pattern: /#(\w+)/,
              style: { ...linkStyle, color: 'lightgreen' },
              onPress: props => alert(`press on ${props}`),
            },
          ]}
        />
      </>
    );
  }
}