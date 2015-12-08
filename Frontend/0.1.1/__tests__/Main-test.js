/**
 * Created by BartCallant on 8/12/15.
 */

jest.dontMock('../scripts/components/main/Main.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Main = require('../scripts/components/main/Main.jsx');

describe('Main', () =>
{
    var mainNode;

    beforeEach(() =>
    {
        var gameStore = require('../stores/gameStore.js');
        var main = TestUtils.renderIntoDocument(<Main />);
        mainNode = ReactDOM.findDOMNode(main);
    });

    it('To Be Defined', () =>
    {
        expect(mainNode).toBeDefined();
    });

    it('To Have Childnodes', () =>
    {
        expect(mainNode.childNodes.length).toBeGreaterThan(0);
    });

    it('To have the classname "header"', () =>
    {
        expect(mainNode.classList.contains('header')).toBe(true);
    });
});