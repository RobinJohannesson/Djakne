
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
  ctrl.subCategories = categoryService.subCategories;
  ctrl.upload = upload;
  ctrl.product = {};

  function upload() {
    console.log(ctrl.product);
    uploadService.upload(ctrl.product);
  }

}