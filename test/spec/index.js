'use strict';

var ReactLiberty = require('../../src/index.js');

describe('Main package', function () {
  it('should be not empty', function () {
    expect(ReactLiberty).toBeTruthy();
  });
  it('should contain gl namespace for corresponding renderer', function () {
    expect(ReactLiberty.gl).toBeTruthy();
  });
  it('should contain dom namespace for corresponding renderer', function () {
    expect(ReactLiberty.dom).toBeTruthy();
  });
  it('should contain render function', function () {
    expect(typeof ReactLiberty.render).toBe('function');
  });
});

describe('gl renderer', function () {
  it('should contain Container class signature', function(){
    expect(ReactLiberty.gl.Container).toBeTruthy();
  });
  it('should contain Image class signature', function(){
    expect(ReactLiberty.gl.Image).toBeTruthy();
  });
  it('should contain Text class signature', function(){
    expect(ReactLiberty.gl.Text).toBeTruthy();
  });
});

describe('dom renderer', function () {
  it('should contain Container class signature', function(){
    expect(ReactLiberty.dom.Container).toBeTruthy();
  });
  it('should contain Image class signature', function(){
    expect(ReactLiberty.dom.Image).toBeTruthy();
  });
  it('should contain Text class signature', function(){
    expect(ReactLiberty.dom.Text).toBeTruthy();
  });
});