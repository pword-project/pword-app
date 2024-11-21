import * as React from "react";
import renderer from "react-test-renderer";

import { ThemedText } from "../ThemedText";

// eslint-disable-next-line
it(`renders correctly`, () => {
  // eslint-disable-next-line
  const tree = renderer
    .create(<ThemedText>Snapshot test!</ThemedText>)
    .toJSON();

  // eslint-disable-next-line
  expect(tree).toMatchSnapshot();
});
