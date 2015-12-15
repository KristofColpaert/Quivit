/**
 * Created by BartCallant on 8/12/15.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

jest.dontMock('../../../scripts/components/general/Error.jsx');
const Error = require('../../../scripts/components/general/Error.jsx');


describe('Error', () =>
{
    var error, errorNode;

    beforeEach(() =>
    {
        error = TestUtils.renderIntoDocument(<Error />);
        errorNode = ReactDOM.findDOMNode(error);
    });

    it('To Be Defined', () =>
    {
        expect(errorNode).toBeDefined();
    });

    it('To Have Childnodes', () =>
    {
       expect(errorNode.childNodes.length).toBeGreaterThan(0);
    });
});