
枚举类型的实现

## 使用

### 简单枚举类型

``` js
new Enum(['madoka', 'homura']).madoka
// => 0
new Enum(['madoka', 'homura'])[0]
// => 'madoka'
```

### 自定义起点的枚举

``` js
new Enum(['madoka', 'homura'], 3).madoka
// => 3
new Enum(['madoka', 'homura'], 3)[3]
// => 'madoka'
```

### 全值定义的枚举

``` js
new Enum({ madoka: 3, homura: 0, mami: 2 })
new Enum({ 2: 'mami', 3: 'madoka', 0: 'homura' })
```

### 按索引序、列出枚举索引或者枚举值

``` js
const MahouShoujos = new Enum({ madoka: 3, homura: 0, mami: 2 })

Enum.listIndex(MahouShoujos)
// => [0, 2, 3]
Enum.listValue(MahouShoujos)
// => ['homura', 'mami', 'madoka']
```

### 将普通对象转为枚举

这一功能主要用于使代码编辑器提供正确的语法提示

``` js
const MahouShoujos = { madoka: 3, homura: 0, mami: 2 }
Enum.transToEnum(MahouShoujos1)

MahouShoujos[3]
// => 'madoka'

MahouShoujos1 instanceof Enum
// => true
```

## 其他

es6编写，没有依赖，但使用时需进行 babel 转码
