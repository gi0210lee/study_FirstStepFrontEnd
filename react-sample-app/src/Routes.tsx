import * as React from 'react';
import { render } from 'react-dom';
import { Switch } from 'react-router';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { ChannelList } from './components';
import { Container } from 'semantic-ui-react';

const routes = <BrowserRouter>
  <div id='wrapper'>
    <ChannelList />
    <main style={{ margin: '1rem 0 1rem 16rem' }}>
      <Container>
        {/* Route는 path에 지정한 경로와 URL 경로가 일치할 때 
            render에 정의된 함수를 실행해주는 컴포넌트 */}
        <Switch>
          <Route
            exact={true} path= '/channels/:channelName'
            render={props => <h2>{props.match.params.channelName}</h2>} />
          <Route
            exact={true} path='/'
            render={() => <h1>Sample Application</h1>} />
        </Switch> 
      </Container>
    </main>
  </div>
</BrowserRouter>

// React 애플리케이션 자체를 읽어들이기 위한 것
// index.html 안에서 id 속성값인 app인 요소를 찾아 해당 위치에 애플리케이션을 렌더링
render(routes, document.getElementById('app'));