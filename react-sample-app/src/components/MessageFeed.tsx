import * as React from 'react';
import { fetchMessages, Message } from '../client';
import { Segment, Image, Comment, Header } from 'semantic-ui-react';

interface MesasgeFeedProps {
  channelName: string;
}

interface MesasgeFeedState {
  messages: Message[];
}

export class MessageFeed extends React.Component<MessageFeedProps, MessageFeedState> {
  
  constructor(props: MesasgeFeedProps) {
    super(props);
    this.state = {
      messages: []
    };
  }

  public render() {
    return (
      <Comment.Group>
        <Header as='h3' dividing>{this.props.channelName}</Header>
        {this.state.messages.sclice().reverse().map(message=>
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

  // 서버 사이드 애플리케이션에 GET 요청을 전송
  private fetchMessages = (channelName: string) => {
    fetchMessages(channelName)
      .then(response => {
        this.setState({ messages: response.data.messages });
      })
      .catch(err => {
        console.log(err);
      });
  }

  public componentDidUpdate(prevProps: MessageFeedProps) {
    if (prevProps.channelName !== this.props.channelName) {
      this.fetchMessages(this.props.channelName);
    }
  }
}

