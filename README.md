Для сборки [Stylus][1] и JavaScript используется [gruntjs.com][2]
Для сборки спрайтов используется [Glue][3] >= 0.9.4

Для работы требуется: Node.js. 


### Установка Grunt

    sudo npm install -g grunt-cli

Перезапустите консоль.

Для дальнейшей установки перейдите в папку с проектом и выполните коману:

    npm install



### Использование Grunt в проекте

* Переходим в папку с проектом.
* Выолняем команду `grunt` – запустится событие, которое будет отслеживать изменения в папке `/layout/assets/`
* JS и CSS скомпилируется в папку `/layout/media/`


### Использование Glue в проекте

Для сборки спрайта достаточно выполнить bash-script:

    source .glue


[1]: http://learnboost.github.io/stylus/
[2]: http://gruntjs.com
[3]: https://glue.readthedocs.org/en/latest/installation.html