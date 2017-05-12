
// ------------------------------------------------------------
// 	Upload Controller
// ------------------------------------------------------------

'use strict';

angular.module('matentusApp')
	.controller('UploadCtrl', UploadCtrl);

 UploadCtrl.$inject = ['categoryService', 'productService', 'uploadService'];

function UploadCtrl(categoryService, productService, uploadService) {
  var ctrl = this;

  ctrl.categories = categoryService.categories;
  ctrl.suppliers = productService.suppliers;

  ctrl.upload = upload;
  ctrl.product = {};

  function upload() {
    uploadService.upload(ctrl.product);
    ctrl.product = {};
  }

}