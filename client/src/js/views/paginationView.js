import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
	_parentElement = document.querySelector('.pagination');

	addHandlerClick(handler) {
		this._parentElement.addEventListener('click', function (e) {
			const btn = e.target.closest('.btn--inline');
			if (!btn) return;

			const gotoPage = +btn.dataset.goto;

			handler(gotoPage);
		});
	}

	_generateMarkup() {
		const curPage = this._data.page;
		const numPages = Math.ceil(
			this._data.results.length / this._data.resultsPerPage
		);

		const prevButton = `
        <button data-goto ="${
					curPage - 1
				}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        `;
		const nextButton = `
        <button data-goto ="${
					curPage + 1
				}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}/${numPages}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;

		// const numPages = Math.ceil(
		// 	this._data.results.length / this._data.resultsPerPage
		// );
		//* Page 1 and other pages
		if (curPage === 1 && numPages > 1) {
			return nextButton;
		}

		//*Last Page
		if (curPage === numPages && numPages > 1) {
			return prevButton;
		}

		//*Other page
		if (curPage < numPages) {
			return prevButton + nextButton;
		}

		//* Page 1 and NO other pages
		return '';
	}
}

export default new PaginationView();
