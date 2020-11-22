// 1) Устанавливаем класс .anim-items всем элементам, которые хотим анимировать
// 2) Устанавливаем класс .non-anim только тем элементам, которые мы хотим анимировать только один раз
// 3) В css прописываем стили для элементов с классом .anim-items, скрывающие эти элементы со страницы (transform: translate(0px, 120%); opacity: 0; transition: all .5s ease .5s;)
// 4) В css прописываем стили для класса .active (описываем появление элемента)

let animItems = document.querySelectorAll('.anim-items');

if (animItems.length > 0) {
	// запускаем функцию при скроле 
	window.addEventListener('scroll', animOnScroll);

	function animOnScroll() {
		animItems.forEach(item => {
			const itemHeight = item.offsetHeight; // высота каждого отдельного элемента
			const itemOffset = offset(item).top; // высота элемента от начала страницы 
			const animStartCoeff = 4; // при видимости картинки на 1/4 запускается анимация 

			let itemPointAnim = window.innerHeight - itemHeight / animStartCoeff;
			// если высота элемента больше выстоты окна браузера, то ->
			if (itemHeight > window.innerHeight) {
				itemPointAnim = window.innerHeight - window.innerHeight / animStartCoeff;
			}

			if ((pageYOffset > itemOffset - itemPointAnim) && pageYOffset < (itemOffset + itemHeight)) {
				item.classList.add('active');
			} else if (!item.classList.contains('non-anim')) {
				item.classList.remove('active');
			}
		})
	}

	// Вспомогательная функция, вычесляющая top и left от границы страницы до элемента 
	function offset(el) {
		const rect = el.getBoundingClientRect(); // расположение элемента относительно viewport (возвращает объект)
		const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft; // просколенная ширина
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop; // проскроленная высота 
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
	}

	// Для отложенного старта при отсутсвии скрола (вначале загрузки страницы)
	setTimeout(() => {
		animOnScroll();
	}, 2000);

}