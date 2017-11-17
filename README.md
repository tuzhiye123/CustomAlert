|Title       |Description     |
|:----------:|:-------------:|
|CustomAlert|从底部向上的弹窗|

## CustomAlert

一个自定义 js 小工具。从底部向上弹出的弹窗，可以自适应高度，超过max-height就会出现滚动条。
**弹窗有滚动条，背景window也可以滚动，滚动弹窗，背景window不会随之滚动。**
没有通过init来创建element，相应的div等标签写在html，因为这个自定义弹窗在不同的页面中，显示的样式可能多种多样，所以放在html中方便修改，
后面有时间再看看放进init创建element方不方便。

## Usage（使用）

1）用空的div来承载，其中`id`为`test_alert1`，可以随便命名，里面`class name`为`custom_alert_mask_layer`,`custom_alert_div`,
`custome_alert_content`的div需要一起复制下来即可，注意`class name`为`custome_alert_content`下一层div必须要有。
```
<div id="test_alert1">
            <div class="custom_alert_mask_layer"></div>
            <div class="custom_alert_div">
                <div class="custome_alert_content">
                    <div>

                        <!-- 需要注意这里面才是你要进行绘制的内容，class name为custome_alert_content下一层div必须要有-->
                        <div class="test_title">test title</div>
                        <ul data-role="listview" id="test_alert1_ul">
                            <li>test1</li>
                            <li>test2</li>
                            <li>test3</li>
                            <li>test4</li>
                            <li>test5</li>
                            <li>test6</li>
                            <li>test7</li>
                            <li>test8</li>
                            <li>test9</li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
```
2）在script或者js文件中，调用
```
$("#test_alert1").createAlert('open');
```
注意：id为test_alert1是你第一步命名的，需要一致.

## Methods（方法）

|Name        |Param     |Description|
|:----------:|:-------------:|:-------------:|
|open          |none|打开弹窗|
|close          |none|关闭弹窗|
|isOpenAlert          |none|判断弹窗是否打开，返回true或false|
|changeColor          |color|改变弹窗的背景颜色|
|fixAlertHeight          |none|改变弹窗的高度，注意此时高度没有超过max-height|

## Attention（注意）

**如果下载下来的项目运行，报错: Origin null is not allowed by Access-Control-Allow-Origin.**

**需要在html头部加入Access-Control-Allow-Origin.**








