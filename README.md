# kartochki

Шаблон карточек решений. Здесь только дизайн и код, никаких личных данных: вопросы живут в чате.

Подключение в карточке:

```html
<div id="k-root"></div>
<script src="https://cdn.jsdelivr.net/gh/SpringFlower99/kartochki@v1/k.js"></script>
<script>K({tag:'school', title:'…?', deadline:'…', ifnot:'…', options:[{em:'👍', label:'…', desc:'…', send:'…', main:true}], where:'…'})</script>
```

Новая версия дизайна = новый тег (`v2`, `v3`…), чтобы старые карточки не ломались.
