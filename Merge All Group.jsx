/*
  Merge All Group

  このスクリプトについて
    アクティブなドキュメントのすべてのグループを統合するスクリプト.
    ただし,最上位がグループの場合はその個所は統合されません.

  使用方法
    ファイル→スクリプト→参照から実行.

  バージョン情報
    2017/12/06 Ver 1.0.0 Release
*/
/// <reference path="C:/lib/photoshop.d.ts/dist/cs6/index.d.ts"/>
(function () {
    var data = {
        scriptName: "Merge All Group",
        version: 1.0
    };
    if (app.locale == "ja_JP") {
        data.scriptName = "すべてのグループを統合";
    }
    function main() {
        var actDoc = app.activeDocument;
        if (actDoc == null) {
            return 0;
        }
        var curLayer;
        var curVisible;
        // アートボード回避
        if (actDoc.layers.length - 1 == 1) {
            actDoc = actDoc.layers[0];
        }
        for (var i = actDoc.layers.length - 1; i >= 0; i--) {
            curLayer = actDoc.layers[i];
            if (curLayer.typename == "LayerSet") {
                curVisible = curLayer.visible;
                curLayer = curLayer.merge();
                curLayer.visible = curVisible;
            }
        }
        return 0;
    }
    app.activeDocument.suspendHistory(data.scriptName, "main()");
}).call(this);
