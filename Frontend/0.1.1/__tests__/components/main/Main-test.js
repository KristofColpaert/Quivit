/**
 * Created by BartCallant on 8/12/15.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
jest.dontMock('../../../node_modules/object-assign/');

jest.dontMock('../../../scripts/components/main/Main.jsx');
jest.dontMock('../../../scripts/stores/gameStore.js');

const Main = require('../../../scripts/components/main/Main.jsx');

describe('Main', () =>
{
    var mainNode;

    beforeEach(() =>
    {
        var main = TestUtils.renderIntoDocument(<Main />);
        mainNode = ReactDOM.findDOMNode(main);
    });

    it('To Be Defined', () =>
    {
        expect(mainNode).toBeDefined();
    });

    it('To Have 3 childnodes', () =>
    {
        expect(mainNode.childNodes.length).toBe(3);
    });

    it("First child has to be a header", () =>
    {
        var fc = mainNode.firstChild;
        expect(fc.nodeName).toBe("HEADER");
        expect(fc.classList.contains('header')).toBe(true);
    });

    it("Second child has to be a content-holder", () =>
    {
       expect(mainNode.children[1].classList.contains("content-holder")).toBe(true);
    });

    it("Last child has to be a footer", () =>
    {
        var lc = mainNode.lastChild;

        expect(lc.nodeName).toBe("FOOTER");
        expect(lc.classList.contains('footer')).toBe(true);
    });
});