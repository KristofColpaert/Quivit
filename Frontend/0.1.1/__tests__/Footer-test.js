/**
 * Created by BartCallant on 8/12/15.
 */

jest.dontMock('../scripts/components/general/Footer.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Footer = require('../scripts/components/general/Footer.jsx');

describe('Footer', () =>
{
    var footerNode;

    beforeEach(() =>
    {
        var footer = TestUtils.renderIntoDocument(<Footer />);
        footerNode = ReactDOM.findDOMNode(footer);
    });

    it('To Be Defined', () =>
    {
        expect(footerNode).toBeDefined();
    });

    it('To Have Childnodes', () =>
    {
        expect(footerNode.childNodes.length).toBeGreaterThan(0);
    });

    it('To have the classname "footer"', () =>
    {
        expect(footerNode.classList.contains('footer')).toBe(true);
    });
});