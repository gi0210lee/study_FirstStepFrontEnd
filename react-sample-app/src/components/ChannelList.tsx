import * as React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';

// export class ChannelList extends React.Component<{}, {}> {
//   public render() {
//     const channels = ['general', 'random'];

//     return (
//       <Menu inverted vertical fixed={'left'}>
//         <Menu.Item>
//           Channels
//           <Menu.Menu>
//             {channels.map(channel => 
//                 <Menu.Item 
//                   key={channel}
//                   as={NavLink}
//                   to={{ pathname: `/channels/${channel}` }}>
//                 {channel}                
//                 </Menu.Item>
//               )
//             }
//             <Menu.Item>
//               general
//             </Menu.Item>
//           </Menu.Menu>
//         </Menu.Item>
//       </Menu>
//     );
//   }
// }

const channels = ['general', 'random'];

export const ChannelList = () => {
  return (
    <Menu inverted vertical fixed={'left'}>
      <Menu.Item as={Link} to={'/'}>       
        Home
        <Icon name='home' />
      </Menu.Item>
      <Menu.Item>
        Channel
        <Icon name='list' />
          <Menu.Menu>
            {channels.map(channel => 
              <Menu.Item  
                key={channel}
                name={channel}
                as={NavLink}
                to={`/channels/${channel}`}>
                {channel}
              </Menu.Item>
            )}
          </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
};