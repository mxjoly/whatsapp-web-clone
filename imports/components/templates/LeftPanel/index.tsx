import React from 'react';
import { Meteor } from 'meteor/meteor';
import { findChats } from '../../../api/helpers';
import { useTracker } from 'meteor/react-meteor-data';
import './styles.scss';

import UserPanel from '../UserPanel';
import Header from '../../organisms/LeftPanelHeader';
import NotificationPanel from '../../organisms/NotificationPanel';
import SearchBarPanel from '../../organisms/SearchBarPanel';
import ChatList from '../../organisms/ChatList';

type LeftPanelProps = {
  className?: string;
  onSelectChat?: (chatId: string) => void;
  onDeleteChat?: (chatId: string) => void;
  chatSelected?: Chat;
};

const LeftPanel = ({
  className,
  onSelectChat,
  onDeleteChat,
  chatSelected,
}: LeftPanelProps): JSX.Element => {
  const [search, setSearch] = React.useState<string>('');
  const [displayUserInfo, setDisplayUserInfo] = React.useState(false);

  const chats = useTracker(() => {
    // Filter with the title of the chat (simplified)
    if (search === '') {
      return findChats();
    } else {
      return findChats().filter(
        (chat) => chat.title.toUpperCase().indexOf(search.toUpperCase()) > -1
      );
    }
  });

  const user = useTracker(() => Meteor.user());

  return (
    <div className={['leftPanel', className].join(' ')}>
      <UserPanel
        className={[
          'leftPanel__userInfo',
          displayUserInfo && 'leftPanel__userInfo--active',
        ]
          .filter(Boolean)
          .join(' ')}
        user={user}
        onBack={() => setDisplayUserInfo(false)}
        isOpen={displayUserInfo}
      />
      <Header
        onClickAvatar={() => setDisplayUserInfo(true)}
        onClickChat={() => null}
        onClickData={() => null}
      />
      <NotificationPanel onClick={() => null} />
      <SearchBarPanel onChangeSearch={setSearch} />
      <ChatList
        chats={chats}
        onSelectChat={onSelectChat}
        onDeleteChat={onDeleteChat}
        chatSelected={chatSelected}
        onClickArchive={() => null}
      />
    </div>
  );
};

export default LeftPanel;
