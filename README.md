# kartochki

Шаблон карточек решений. Здесь только дизайн и код, никаких личных данных: вопросы живут в чате.

Подключение в карточке:

```html
<div id="k-root"></div>
<script src="https://cdn.jsdelivr.net/gh/SpringFlower99/kartochki@v1/k.js"></script>
<script>K({tag:'school', title:'…?', deadline:'…', ifnot:'…', options:[{em:'👍', label:'…', desc:'…', send:'…', main:true}], where:'…'})</script>
```

Новая версия дизайна = новый тег (`v2`, `v3`…), чтобы старые карточки не ломались.

## Дорога (`road.js`)

Карта входа и выхода для навыка vhod-vyhod: дорога проекта, дела по дням, вопросы карточками `k.js`. Только дизайн и код, без данных. Сделано с главного аккаунта Медины, 28.11.2026.

```html
<div class="rw" id="rw"></div>
<script src="https://cdn.jsdelivr.net/gh/SpringFlower99/kartochki@v1/k.js"></script>
<script src="https://cdn.jsdelivr.net/gh/SpringFlower99/kartochki@road-v1/road.js"></script>
<script>ROAD({project:'…', mode:'entry', updated:'…', next:{…}, today:'…', road:[…], days:[…]})</script>
```

Новая версия дизайна дороги = новый тег (`road-v2`, `road-v3`…).
