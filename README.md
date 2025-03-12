# Тестовое задание

**Выполнил:**  Глазков Павел

### Задание:

```
На портале открытых данных есть метод получения списка библиотек Москвы 
https://data.mos.ru/opendata/526?isRecommendationData=false&pageSize=10&pageIndex=0

Необходимо написать 2 компонента.

1)Компонент будет отображать:
- картинку https://ru.freepik.com/free-photo/beautiful-milky-way-night-sky_18667464.htm
- поле для ввода
- кнопку для получения списка библиотек
По нажатию на кнопку отобразить те библиотеки (в табличном виде), у которых в полном названии есть указанное слово. 
В столбцах: номер по порядку, название (искомое слово выделить цветом) и адрес.

2) Компонент будет отображать карточку библиотеки в виде поле - значение. 
Открывается при клике на строчку с конкретной библиотекой в первом компоненте.
```

### Запуск

1. Установка
``` 
npm install 
````
2. Добавить api_key для доступа к данным портала data.mos.ru
в файл src/environments/environment.ts :

```
export const environment: IEnvironmentConfig = { api_key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' };
```
> где "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" - API Key полученный на портале data.mos.ru

3. Запуск:

```
npm run start
```