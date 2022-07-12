import React from 'react';
import { Meteor } from 'meteor/meteor';
import dayjs from 'dayjs';

import MessageBox from '../../molecules/MessageBox';
import DayBox from '../../atoms/DayBox';
import './styles.scss';

type MessageViewProps = {
  className?: string;
  messages: Message[];
};

const MessageView = ({ className, messages }: MessageViewProps) => {
  const ref = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    ref.current.scrollBy({ top: ref.current.scrollHeight });
  }, [messages]);

  return (
    <div ref={ref} className={['messageView', className].join(' ')}>
      {messages
        .sort(
          (msg1, msg2) => msg1.createdAt.valueOf() - msg2.createdAt.valueOf()
        )
        .map((message, index, messages) => {
          let Day: () => JSX.Element;

          if (index === 0) {
            Day = () => (
              <div
                key={`daybox-${index}`}
                className="messageView__row messageView__row--center"
              >
                <DayBox date={messages[index].createdAt} />
              </div>
            );
          } else if (
            dayjs(messages[index].createdAt).format('D/MM/YYYY') !==
            dayjs(messages[index - 1].createdAt).format('D/MM/YYYY')
          ) {
            Day = () => (
              <div
                key={`daybox-${index}`}
                className="messageView__row messageView__row--center"
              >
                <DayBox date={messages[index].createdAt} />
              </div>
            );
          }

          const Base = () => (
            <div
              key={message._id}
              className={[
                'messageView__row',
                message.senderId === Meteor.userId()
                  ? 'messageView__row--right'
                  : 'messageView__row--left',
              ].join(' ')}
            >
              <MessageBox
                className={[
                  'messageView__message',
                  message.senderId === Meteor.userId()
                    ? 'messageView__message--right'
                    : 'messageView__message--left',
                ].join(' ')}
                message={message}
                side={message.senderId === Meteor.userId() ? 'right' : 'left'}
              />
            </div>
          );

          return Day ? (
            <>
              <Day />
              <Base />
            </>
          ) : (
            <Base />
          );
        })}
    </div>
  );
};

export default MessageView;
