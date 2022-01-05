/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const should = require("should");
const utils = require("./utils");

describe("utils.js 모듈의 capitialize() 함수는", () => {
  it("문자열의 첫번째 문자를 대문자로 변환한다.", () => {
    const result = utils.capitialize("hello");
    result.should.be.equal(result, "Hello");
  });
});
