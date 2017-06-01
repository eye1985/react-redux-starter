import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './container/App';
import store from './store/store';

import { AppContainer } from 'react-hot-loader';

require('./scss/style.scss');

ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
          <App />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept('./container/App', () => {
        const NewApp = require('./container/App').default;
        render(
            <AppContainer>
              <Provider store={store}>
                <NewApp />
              </Provider>
            </AppContainer>,
            document.getElementById('app')
        );
    });
}
