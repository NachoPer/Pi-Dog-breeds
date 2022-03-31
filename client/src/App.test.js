import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import Paginated from "./components/Paginated/Paginated";

configure({ adapter: new Adapter() });

describe("<Paginated />", () => {
  let paginated = shallow(<Paginated dogsShowing={24} cardsPerPage={8} />);

  it("It should render an unordered list", () => {
    expect(paginated.find("ul").length).toBeGreaterThanOrEqual(1);
  });
  it("The total of li it should be the result of dogsShowing/cardsPerPage", () => {
    expect(paginated.find("li").length).toEqual(3);
  });
  it("The total of buttons it should be the result of dogsShowing/cardsPerPage", () => {
    expect(paginated.find("button").length).toEqual(3);
  });
});
