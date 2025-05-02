import React, { useEffect, useState } from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import { useParams } from 'react-router-dom';
import botImage from '../../assets/imgs/bot.jpeg';
import userImage from '../../assets/imgs/user.jpg';
import { useSocket } from '../../hooks/useSocket';

const HarvestAssistant = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([
    {
      direction: 'incoming',
      message: 'Tui là trợ lý nông nghiệp',
      avatar: true,
    },
    {
      direction: 'incoming',
      message: 'Tui sẽ hỗ trợ bạn giải đáp những thắc mắc về vụ mùa với ID: ' + id,
    },
    {
      direction: 'incoming',
      message:
        'Tui được thiết kế với trí nhớ ngắn hạn, bạn hãy dùng tui như một công cụ truy vấn nha',
    },
    {
      direction: 'incoming',
      message: 'Hỏi thoải mái nhưng lịch sử trò chuyện sẽ không được lưu lại đâu nhé!',
    },
  ]);

  const [isBotThinking, setIsBotThinking] = useState(false);

  const socket = useSocket();

  useEffect(() => {
    socket.on('query', (resp) => {
      const { harvestId, response } = resp;

      setIsBotThinking(false);
      if (harvestId === id) {
        const object = {
          direction: 'incoming',
          message: response,
          avatar: messages[messages.length - 1].direction === 'outgoing',
        };

        setMessages([...messages, object]);
      }
    });

    return () => {
      socket.off('query');
    };
  }, [socket, id, messages]);

  const onSendMessage = (textContent) => {
    const object = {
      direction: 'outgoing',
      message: textContent,
      avatar: messages[messages.length - 1].direction === 'incoming',
    };

    const queryInfor = {
      harvestId: id,
      query: textContent,
    };

    setTimeout(() => {
      socket.emit('query-curious', queryInfor);
    }, 500);

    setIsBotThinking(true);
    setMessages([...messages, object]);
  };

  return (
    <>
      <h4 className="text-center">Chat with me!</h4>
      <div style={{ position: 'relative', height: '400px' }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={
                isBotThinking ? <TypingIndicator content="Tui đang nghĩ, đợi xíu..." /> : null
              }
            >
              {messages.map((object, index) => {
                const sender = object.direction === 'incoming' ? 'Bot' : 'You';
                if (object.avatar) {
                  return (
                    <Message
                      key={index}
                      model={{
                        direction: object.direction,
                        message: object.message,
                        sender,
                      }}
                    >
                      <Avatar
                        name={sender}
                        src={object.direction === 'incoming' ? botImage : userImage}
                      />
                    </Message>
                  );
                }

                return (
                  <Message
                    key={index}
                    avatarSpacer
                    model={{
                      direction: object.direction,
                      message: object.message,
                      sender,
                    }}
                  />
                );
              })}
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              // eslint-disable-next-line no-unused-vars
              onSend={(_, textContent, __, ___) => onSendMessage(textContent)}
              disabled={isBotThinking}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
};

export default HarvestAssistant;
