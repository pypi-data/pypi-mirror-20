# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version 0.2.3
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* To set this up run the following command:

    ```
    pip install symbolic-quantum-computation
    ```

    To update:

    ```
    pip install --upgrade symbolic-quantum-computation
    ```

    To run use:

    ```
    sqc --exp EXP
    ```
    Example:
    ```
    sqc --exp 'a+b'
    ```

* Configuration
* Dependencies
* Database configuration
* To run tests use:

    ```
    sqc -t
    ```

* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact

*About AST

Для реализации сокращения формулы мы будем использовать модель абстрактного синтаксического дерева
в библиотеки ast.py

Нам понадобятся методы:

ast.parse() - позволяет преобразовать строку в дерево

ast.NodeVisitor() - метод рекурсивного обхода дерева,
с его помощью будем искать в дереве поддеревья, которые можно сократить в соответствии с правилами

ast.NodeTransformer() - метод для рекурсивного изменения абстрактного синтаксического дерева,
с помощью этого метода будем преобразовывать формулу в соответствии с правилами

ast.copy_location() - копирование позиций в коде с одного узла ast в другой,
с помощью этого метода мы будем изменять поддеревья (не факт что нужно будет)

ast.dump() - преобразование дерева в формулу

Список операций, которые распознаёт библиотека ast:

Сложение +  Add
Вычитание - Sub
Умножение * Mult
Деление / Div
Взятие модуля % Mod
Возведение в степень ** Pow
Битовый сдвиг влево << LShift
Битовый сдвиг вправо >> RShift
Битовое Или | BitOr
Битовое ИСКЛЮЧАЮЩЕЕ ИЛИ ^ BitXor
Битовое И & BitAnd
Двойное деление // FloorDiv
Битовое инвертирование (1->0, 0->1) ~ Invert
Логическое Не not Not
Унарное сложение + UAdd
Унарное вычитание - USub