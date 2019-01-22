import * as React from 'react';
import { fetchMessages, Message } from "../client";
import { Segment, Image, Comment, Header } from 'semantic-ui-react';
import Axios, { CancelTokenSource } from 'axios';

interface MessageFeedProps {
  channelName: string;
  shouldReload: boolean;
  setShouldReload: (shouldReload: boolean) => void;
}

interface MessageFeedState {
  messages: Message[];
}

export class MessageFeed extends React.Component<MessageFeedProps, MessageFeedState> {

  private cancelTokenSource: CancelTokenSource;

  constructor (props: MessageFeedProps) {
    super(props);
    this.state = {
      messages: []
    };
    this.cancelTokenSource = null
  }

  private fetchMessages = (channelName: string) => {
    this.props.setShouldReload(false);

    // cancelToken을 생성
    this.cancelTokenSource = Axios.CancelToken.source();
    fetchMessages(channelName, {}, this.cancelTokenSource.token)
      .then(response => {
        this.setState({ messages: response.data.messages });
      })
      .catch(err => {
        if (Axios.isCancel(err)) {
          // 컴포넌트가 언마운트 상태일 경우
          console.log(err);
        } else {
          // 일반적인 경우의 오류 처리
          console.log(err)
        }
      })
  }

  public componentWillUnmount() {
    if (this.cancelTokenSource) {
      this.cancelTokenSource.cancel('this component has been unmounted');
    }
  }

  // 업데이트 되기 전 상태의 props 와 state를 인자로 받는다.
  public componentDidUpdate(prevProps: MessageFeedProps) {
    if (prevProps.channelName !== this.props.channelName || 
      !prevProps.shouldReload && this.props.shouldReload) {
      this.fetchMessages(this.props.channelName);
    }
  }

  public componentDidMound() {
    this.fetchMessages(this.props.channelName);
  }

  public render() {
    return (
      <Comment.Group>
        <Header as='h3' dividing>{this.props.channelName}</Header>
        {this.state.messages.slice().reverse().map(message=>
          <Comment key={message.id}>
            <Comment.Avatar src={message.user.avatar || '/img/avatar.png'} />
            <Comment.Content>
              <Comment.Author as='a'>{message.user.name}</Comment.Author>
              <Comment.Metadata>
                <div>{message.date}</div>
              </Comment.Metadata>
              <Comment.Text>
                {message.body}
              </Comment.Text>
            </Comment.Content>
          </Comment>
          )}
      </Comment.Group>
    )
  }
}