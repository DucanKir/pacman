/* global describe, xdescribe, it */
/* eslint-disable no-undef */

const chai  = window.chai
const expect = chai.expect

describe('getOppositeCorner', () => {
  it('getOppositeCorner', () => {
    expect(getPathDirection([1, 5], [4, 1])).to.deep.equal([1, 4])
  })
  it('getOppositeCorner', () => {
    expect(getPathDirection([4, 13], [16, 6])).to.deep.equal([4, 14])
  })
  it('getOppositeCorner', () => {
    expect(getPathDirection([16, 7], [1, 5])).to.deep.equal([15, 7])
  })
})
