'use strict';

const chai = require('chai');
chai.should();

var ReactLiberty = require('../../src/index.js');

describe('Main package', () => {
  it('should be not empty', () => {
    ReactLiberty.should.be.ok;
  });

  it('should contain gl namespace for corresponding renderer', () => {
    ReactLiberty.gl.should.be.ok;
  });

  it('should contain dom namespace for corresponding renderer', () => {
    ReactLiberty.dom.should.be.ok;
  });
});

describe('gl renderer', () => {
  it('should contain Container class signature', () => {
    ReactLiberty.gl.Container.should.be.ok;
  });

  it('should contain Image class signature', () => {
    ReactLiberty.gl.Image.should.be.ok;
  });

  it('should contain Text class signature', () => {
    ReactLiberty.gl.Text.should.be.ok;
  });
});

describe('dom renderer', () => {
  it('should contain Container class signature', () => {
    ReactLiberty.dom.Container.should.be.ok;
  });

  it('should contain Image class signature', () => {
    ReactLiberty.dom.Image.should.be.ok;
  });

  it('should contain Text class signature', () => {
    ReactLiberty.dom.Text.should.be.ok;
  });
});
