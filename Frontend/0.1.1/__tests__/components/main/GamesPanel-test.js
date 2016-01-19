/**
 * Created by BartCallant on 8/12/15.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
jest.dontMock('../../../node_modules/object-assign/');

/*
jest.dontMock('../../../scripts/helpers/offlineHelper.js');
jest.dontMock('../../../scripts/components/main/GamesPanel.jsx');

const GamesPanel = require('../../../scripts/components/main/GamesPanel.jsx');


describe('GamesPanel', () =>
{

    var gamesPanelNode;

    beforeEach(() =>
    {
        gamesPanelNode =  TestUtils.renderIntoDocument(<GamesPanel title="Test Title" games={[]} />);
        //gamesPanelNode = ReactDOM.findDOMNode(comp);
    });

    it('To Be Defined', () =>
    {
        expect(gamesPanelNode).toBeDefined();
    });

    it('Should have an H3 element', () =>
    {
        var h2 = TestUtils.scryRenderedDOMComponentsWithTag(gamesPanelNode, 'h2');
        expect(h2.length).toBeGreaterThan(0)
    });

    it('Text in H3 should be "Test Title"', () =>
    {
        var firstH2 = TestUtils.scryRenderedDOMComponentsWithTag(gamesPanelNode, 'h2')[0];
        expect(firstH2.innerHTML).toBe("Test Title");
    });

    it('Defined games to be 0, so there should be 1 child element', () =>
    {
        var gpNode = ReactDOM.findDOMNode(gamesPanelNode);
        expect(gpNode.children.length).toBe(1);
    });

});

 */