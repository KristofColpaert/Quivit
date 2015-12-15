/**
 * Created by BartCallant on 8/12/15.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
jest.dontMock('../../../node_modules/object-assign/');

jest.dontMock('../../../scripts/components/main/GamesPanel.jsx');

const GamesPanel = require('../../../scripts/components/main/GamesPanel.jsx');

describe('GamesPanel', () =>
{
    var gamesPanelNode;

    beforeEach(() =>
    {
        var comp = TestUtils.renderIntoDocument(<GamesPanel title="Test Title" games={[]} />);
        gamesPanelNode = ReactDOM.findDOMNode(comp);
    });

    it('To Be Defined', () =>
    {
        expect(gamesPanelNode).toBeDefined();
    });
});