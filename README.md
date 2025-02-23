# Game of Life — Игра "Жизнь"

**Game of Life** — это клеточный автомат, придуманный британским математиком Джоном Конвеем в 1970 году. Эта игра моделирует поведение клеток в решетке, где каждая клетка может быть живой или мертвой, и её состояние изменяется на основе определенных правил.

В данном проекте реализована визуализация игры с возможностью изменения параметров скорости и состояния клеток.

## Описание игры

Игровое поле представляет собой сетку клеток, где каждая клетка может быть в одном из двух состояний: "живая" или "мертвая". Состояние клеток меняется по определенным правилам на основе количества живых соседей у каждой клетки. Игра может быть запущена в автоматическом режиме, или можно вручную делать шаги, чтобы наблюдать изменения.

## Правила игры

**Место действия игры** — размеченная на клетки плоскость, которая может быть безграничной, ограниченной или замкнутой.

Каждая клетка на этой поверхности имеет восемь соседей, окружающих её, и может находиться в двух состояниях: быть `«живой»` (заполненной) или `«мёртвой»` (пустой).

**Распределение живых клеток в начале игры называется первым поколением. Каждое следующее поколение рассчитывается на основе предыдущего по таким правилам:**

- в пустой (мёртвой) клетке, с которой соседствуют три живые клетки, зарождается жизнь;
- если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить; в противном случае (если живых соседей меньше двух или больше трёх) клетка умирает («от одиночества» или «от перенаселённости»).

**Игра прекращается, если:**

- на поле не останется ни одной «живой» клетки;
- конфигурация на очередном шаге в точности (без сдвигов и поворотов) повторит себя же на одном из более ранних шагов (складывается периодическая конфигурация);
- при очередном шаге ни одна из клеток не меняет своего состояния (частный случай предыдущего правила, складывается стабильная конфигурация).

Игрок не принимает активного участия в игре. Он лишь расставляет или генерирует начальную конфигурацию «живых» клеток, которые затем изменяются согласно правилам. Несмотря на простоту правил, в игре может возникать огромное разнообразие форм.



## Основные функции

- **Изменение состояния клеток:** Кликните на клетку, чтобы изменить её состояние (с живой на мертвую или наоборот).
- **Управление игрой:**
  - **Старт/Пауза:** Запускает или приостанавливает игру.
  - **Следующий шаг:** Выполняет один шаг игры.
  - **Сброс:** Сбрасывает все клетки в исходное состояние (мертвые).
- **Регулировка скорости игры:** Изменяйте скорость игры с помощью ползунка, чтобы замедлить или ускорить процесс.
- **Паттерн "Глайдер":** Игра начинается с заданным шаблоном "Глайдер", который будет двигаться по полю.

## Реализация

Этот проект был реализован в рамках домашнего задания курса **КСЕ** (Концепции cовременного eстествознания).
