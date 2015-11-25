/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';

    // %REMOVE_START%
    // The configuration options below are needed when running CKEditor from source files.
    //config.plugins = 'a11yhelp,about,clipboard,dialog,filetools,image,image2,lineutils,link,magicline,notification,notificationaggregator,pastefromword,scayt,specialchar,table,tabletools,tweetabletext,uploadimage,uploadwidget,videodetector,widget,wsc,youtube';
    config.plugins = 'dialogui,dialog,about,basicstyles,clipboard,button,toolbar,enterkey,entities,floatingspace,wysiwygarea,indent,indentlist,fakeobjects,link,list,undo';
    config.skin = 'moono-dark';
    // %REMOVE_END%

    config.toolbarGroups = [
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'forms', groups: [ 'forms' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'others', groups: [ 'others' ] },
        '/',
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors', groups: [ 'colors' ] }
    ];


    config.extraPlugins = 'uploadimage,image2,uploadwidget,oembed,attach';
    config.uploadUrl = '/rest/uploadForEditor';
    config.filebrowserUploadUrl = '/rest/uploadForEditor';

    //config.extraPlugins = 'image2';
    //config.extraPlugins = 'youtube';
   /// config.extraPlugins = 'uploadwidget';
};
