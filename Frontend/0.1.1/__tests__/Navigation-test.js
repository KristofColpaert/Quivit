/**
 * Created by BartCallant on 8/12/15.
 */

jest.dontMock('../scripts/components/general/Navigation.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Navigation = require('../scripts/components/general/Navigation.jsx');

describe('Navigation', () =>
{
    var navigationNode;

    beforeEach(() =>
    {
        var navigation = TestUtils.renderIntoDocument(<Navigation />);
        navigationNode = ReactDOM.findDOMNode(navigation);
    });

    it('To Be Defined', () =>
    {
        expect(navigationNode).toBeDefined();
    });

    it('To Have Childnodes', () =>
    {
        expect(navigationNode.childNodes.length).toBeGreaterThan(0);
    });

    it('To have the classname "header"', () =>
    {
        expect(navigationNode.classList.contains('header')).toBe(true);
    });
});