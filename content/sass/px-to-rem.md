

[Sass基础——Rem与Px的转换](https://www.w3cplus.com/preprocessor/sass-px-to-rem-with-mixin-and-function.html)

```sass
$baseFontSizePx: 16px !default;//变量的值可以根据自己需求定义

@mixin remCalc($property, $values...) {
  $pxValues: '';
  $remValues: '';
  $baseFontSize: $baseFontSizePx / ($baseFontSizePx * 0 + 1);
  @each $value in $values {
    $pxValues: #{$pxValues + ' ' + $value * $baseFontSize}px;
    $remValues: #{$remValues + ' ' + $value}rem;
  }
  #{$property}: $pxValues;
  #{$property}: $remValues;
}

@mixin pxCalc($property, $values...) {
  $pxValues: '';
  $remValues: '';
  $baseFontSize: $baseFontSizePx / ($baseFontSizePx * 0 + 1);
  @each $value in $values {
    $pxValues: #{$pxValues + ' ' + $value}px;
    $remValues: #{$remValues + ' ' + $value / $baseFontSize}rem;
  }
  #{$property}: $pxValues;
  #{$property}: $remValues;
}

@function pxToRem($px){ @return $px / $baseFontSizePx * 1rem; }


.wrapper {
  @include remCalc(width,32);
  @include remCalc(margin,16,8,32,64);
  @include remCalc(border,16);
}


.px {
  @include pxCalc(width,32);
  @include pxCalc(margin,16,8,32,64);
  @include pxCalc(border,16,solid,red);
}

```

