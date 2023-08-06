# fyve

A Python port of [five.js](https:#github.com/jackdcrawford/five), a library to overcomplicate `5`.

### Usage

**Import the module**
```python
from fyve import Fyve
five = Fyve()
```

**Basic 5**
```python
five()  # returns 5
```

## The Law of Fives
```python
five.law() # The Law of Fives states simply that: All things happen in fives, or are divisible by or are multiples of five, or are somehow directly or indirectly appropriate to 5. The Law of Fives is never wrong.
```

##### Addition
```python
five() + five() # 10
```

##### Multiplication
```python
five() * five() # 25
```

##### Division
```python
five() # five() # 1
```

##### Different sorts of 5
```python
five.upHigh() # ⁵
five.downLow() # ₅
five.tooSlow() # 5, with a ~500 millisecond delay
five.roman() # V
five.morseCode() # .....
five.negative() # -5
five.loud() # FIVE
five.loud('piglatin') # IVEFAY
five.smooth() # S
```

##### Cryptography
```python
five.mdFive() # 30056e1cab7a61d256fc8edd970d14f5
five.golden() # 1.618033988749895
```

##### 5 goes multilingual
```python
five.arabic() # خمسة
five.azerbaijani() # beş
five.basque() # bost
five.belarusian() # пяць
five.bosnian() # pet
five.bulgarian() # пет
five.catalan() # cinc
five.chinese() # 五
five.chinese('pinyin') # wǔ
five.chinese('financial') # 伍
five.choctaw() # tahlapi
five.croatian() # pet
five.czech() # pět
five.dothraki() # mek
five.dovah() # hen
five.dutch() # vijf
five.elvish() # lempe
five.english() # five
five.esperanto() # kvin
five.estonian() # viis
five.finnish() # viisi
five.french() # cinq
five.german() # fünf
five.greek() # πέντε
five.hebrew() # חמש
five.hindi() # पांच
five.hungarian() # öt
five.icelandic() # fimm
five.indonesian() # lima
five.irish() # cúig
five.italian() # cinque
five.japanese() # 五
five.kannada() # ಐದು
five.klingon() # vagh
five.korean() # 오
five.latin() # quinque
five.latvian() # pieci
five.lithuanian() # penki
five.maltese() # ħamsa
five.mongolian() # таван
five.nepali() # पाँच
five.norwegian() # fem
five.persian() # پنج
five.piglatin() # ivefay
five.polish() # pięć
five.portuguese() # cinco
five.punjabi() # ਪੰਜ
five.romanian() # cinci
five.russian() # пять
five.serbian() # pet
five.slovakian() # päť
five.slovenian() # pet
five.spanish() # cinco
five.swedish() # fem
five.tamil() # ஐந்து
five.telugu() # ఐదు
five.thai() # ห้า
five.turkish() # beş
five.ukrainian() # п’ять
five.welsh() # pump
```

##### Different radices
```python
five.binary() # 101
five.octal() # 5
five.hex() # 5
five.base(4) # 11
five.base(3) # 12
```

##### Assertion
```python
five.isFive(10) # False
```

##### Filter, Map and Reduce
```python
five.filter([5, True, 5]) # [5, 5]
five.map([1, 2, 3]) # [5, 5, 5]
five.reduce([1, 2, 3]) # 5
```

##### Novelty
```python
five.fab() # ['Juwan Howard','Ray Jackson','Jimmy King','Jalen Rose','Chris Webber']
five.jackson() # ['Jackie','Tito','Jermaine','Marlon','Michael']
five.furious() # ['Tigress','Viper','Crane','Monkey','Mantis']
five.luniz() # ‘I Got 5 on It’
five.r() # '£5'
five.funk() # '5 bad boys with the power to rock you'
five.high() # 'o/'
five.members() #['Sean Conlon', 'Ritchie Neville', 'Scott Robinson', 'Jason \'J\' Brown', 'Abz Love']
five.discography() #['5ive', 'Invincible', 'Kingsize']
five.singles() #['Slam Dunk (Da Funk)', 'When the Lights Go Out', 'Got the Feelin\'', 'Everybody Get Up', 'It\'s the Things You Do', 'Until the Time Is Through', 'If Ya Gettin\' Down', 'Keep On Movin\'', 'Don\'t Wanna Let You Go', 'We Will Rock You', 'Let\'s Dance', 'Closer to Me', 'Rock the Party', 'I Wish It Could Be Christmas Everyday']
```

##### Rotation
```python
five.rot("fyve.py") # 'kdajMud'
```

#### Iterator
```python
    f = five.forever()
    f.__next__() # 5
```

##### Unicode
```python
five.oclock() # '🕔'

five.guys() # '🍔'
```

### Development
##### The code
All of the code is included in one file:
```
fyve/fyve.py
```

### Credits

Credit to [Jack Crawford](https:#github.com/jackdcrawford) for creating the original five.js.

### License

MIT