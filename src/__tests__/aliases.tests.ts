
import { expect } from 'chai';
import { jsonToGraphQLQuery } from '../';

describe('jsonToGraphQLQuery() - aliases', () => {

    it('supports multiple aliases for one type', () => {
        const query = {
            query: {
                lorem: {
                    __aliasFor: 'Posts',
                    __args: {
                        arg1: 20,
                    },
                    id: true
                },
                larem: {
                    __aliasFor: 'Posts',
                    __args: {
                        arg2: 10,
                    },
                    id: true
                }
            }
        };
        expect(jsonToGraphQLQuery(query)).to.equal(
            'query { lorem: Posts (arg1: 20) { id } larem: Posts (arg2: 10) { id } }'
        );
    });

    it('supports aliases on primitive types', () => {
        const query = {
            query: {
                lorem: {
                    __aliasFor: 'ipsum',
                    __value: true,
                },
                dolor: true,
                sit: { amet: { __aliasFor: 'consectetur', __value: true } }
            }
        };
        expect(jsonToGraphQLQuery(query)).to.equal(
            'query { lorem: ipsum dolor sit { amet: consectetur } }'
        );
    });
});
