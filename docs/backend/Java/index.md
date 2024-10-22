# Java

| 网站                                                     | 备注 |
| -------------------------------------------------------- | ---- |
| [download](https://www.oracle.com/cn/java/technologies/) |      |

##  基本数据类型

| 基本类型 | 存储大小                   | 初始化默认值                                                 | 取值范围                                                   | 包装类型  |
| :------- | :------------------------- | :----------------------------------------------------------- | :--------------------------------------------------------- | :-------- |
| byte     | 1字节（8位）               | 0                                                            | -128~127                                                   | Byte      |
| short    | 2字节（16位）              | 0                                                            | -32768~32767                                               | Short     |
| int      | 4字节（32位）              | 0                                                            | -2^31 ~ 2^31 - 1                                           | Integer   |
| long     | 8字节（64位）              | 0L。"L"理论上不分大小写，但若写成"l"容易与数字"1"混淆，不容易分辨，所以最好大写。 | -2^63 ~ 2^63 - 1                                           | Long      |
| float    | 4字节（32位）              | 0.0f                                                         | 符合IEEE754标准的浮点数，1.4E-45 ~ 3.4028235E38            | Float     |
| double   | 8字节（64位）              | 0.0d                                                         | 符合IEEE754标准的浮点数，4.9E-324 ~ 1.7976931348623157E308 | Double    |
| char     | 2字节（16位）              | ‘\u0000’                                                     | \u0000 ~ \uffff（十进制等效值为 0~65535，本质也是数值）    | Character |
| boolean  | 1字节（8位）/4字节（32位） | false                                                        | true/false                                                 | Boolean   |
