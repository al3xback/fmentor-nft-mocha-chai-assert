import { assert } from 'chai';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-nft-mocha-chai-assert/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it('should have a number type of card image width and height', () => {
		const cardImgEl = document.querySelector('.card__image img');
		const cardImgWidth = parseInt(cardImgEl.getAttribute('width'));
		const cardImgHeight = parseInt(cardImgEl.getAttribute('height'));

		assert.typeOf(cardImgWidth, 'number');
		assert.typeOf(cardImgHeight, 'number');
	});

	it("should have a title element that contains 'Equilibrium #3429' word", () => {
		const cardTitleEl = document.querySelector('.card__title');
		const cardTitle = cardTitleEl.textContent.trim();

		assert.equal(cardTitle, 'Equilibrium #3429');
	});

	it('should have two children inside of the article element', () => {
		const articleEl = document.querySelector('article');
		const articleChildrenEls = articleEl.children;

		assert.lengthOf(articleChildrenEls, 2);
	});

	it('should have an empty alt attribute value of card image element', () => {
		const cardImgEl = document.querySelector('.card__image img');
		const cardImgAlt = cardImgEl.getAttribute('alt');

		assert.isEmpty(cardImgAlt);
	});
});
