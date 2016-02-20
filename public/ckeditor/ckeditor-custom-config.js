/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
    config.toolbarGroups = [
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'insert', groups: [ 'insert' ] },

        { name: 'tools', groups: [ 'tools' ] },
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'others', groups: [ 'others' ] },
        '/',
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors', groups: [ 'colors' ] }
    ];

    config.extraPlugins = 'uploadimage,image2,uploadwidget,oembed,attach,filebrowser,popup,templates,lineheight,widgetbootstrap,widgettemplatemenu,uploadcare';
    config.uploadUrl = '/rest/uploadForEditor';
    //config.filebrowserUploadUrl = '/rest/uploadForEditor';dev
    config.filebrowserUploadUrl = '/rest/upload2';
    //config.filebrowserUploadUrl = '/rest/uploadAndReturnHtml';
    config.baseFloatZIndex = 9000;
    config.font_defaultLabel = 'Helvetica';
    config.fontSize_defaultLabel = '16';

    config.font_names = config.font_names +
        ';Helvetica/Arial, Helvetica, sans-serif;';

    UPLOADCARE_PUBLIC_KEY = "261288daa9c826873147";
    //console.log('>>>>>>', UPLOADCARE_PUBLIC_KEY);
};

CKEDITOR.on( 'dialogDefinition', function( ev ) {
    var dialogName = ev.data.name;
    var dialogDefinition = ev.data.definition;
    console.log("dialogName ", dialogName);
    if ( dialogName == 'image2') {
        dialogDefinition.removeContents('Upload');
        dialogDefinition.removeContents('upload');
    }
});

CKEDITOR.on( 'onAttachmentUpload', function( ev ) {
    console.log("!!!!!!!!");
});
