import React from "react";
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AppContainer from "./AppContainer";

test('rendering "uncle-bob"', () => {
  const history = createMemoryHistory();
  const route = '/uncle-bob';
  history.push(route);
  const { container, getByTestId } = render(
    <Router history={history}>
      <AppContainer/>
    </Router>
  );
  expect(getByTestId('location-display')).toHaveTextContent(route)
});

