import helper from './../library/helper.js';
import MediumEditor from './../../vendor/medium/medium-editor.js';
import 'imports-loader?$=jquery!jquery-sortable';
import 'imports-loader?$=jquery!blueimp-file-upload';
import activateInsertPlugin from 'medium-editor-insert-plugin-webpack';

class ArticleEditors {

	constructor($timeout, $http) {
		this.restrict = 'AE';
		// this.scope    = {};
		// this.require  = 'modalEditor';
		// console.log( this );
	}

	controller($scope, $element, $attrs, $timeout, $rootScope) {
		var editors = {title: void 0, lead: void 0, content: void 0};

		$rootScope.$on('mdl_data', function (events, data) {
		  console.log(data); // 'Data to send'
		});
		
		$scope.tempSave  = void 0;
		$scope.message   = void 0;
		$scope.tags      = [];
		$scope.uploading = false;

		$scope.data = {
			title 		: void 0,
			lead 		: void 0,
			content 	: void 0,
			image 		: {
				id 	: void 0,
				url : void 0
			},
			tags 		: [],
			source 		: void 0,
			channel 	: {
				slug : void 0,
				name : void 0
			},
			slug		: void 0
		};

		$scope.data = $scope.$parent.data ? $.extend($scope.data, $scope.$parent.data) : $scope.data;
		$scope.tags = $scope.data.tags;

		var $this = $.extend({}, helper);
		// ------------------------------------------------------------------------

		// Tags Autocomplete
		$scope.loadTags = function(query) {
			var config, temp;

			temp = JSON.parse(window.localStorage.token);
			return $http.get(self.MainApp.baseURL + 'api/v1/tags?q=' + query);
		};

		// ------------------------------------------------------------------------

		// Temporary Save
		$scope.saveTemp = function() {

		}

		// ------------------------------------------------------------------------

		$scope.cancelClick = function(){
			window.history.back();
		};
		// ------------------------------------------------------------------------

		// Save
		$scope.saveClick = function() {
			var data = $scope._save(angular.copy($scope.data));

			self.prepSave(data);
		};

		// ------------------------------------------------------------------------

		$scope._save = function (data) {
			// Cover Image
			var $fid = $($element).find('.fileupload-pool.cover-picture input[type=hidden][name=fid]');
			if ($fid.length) {
				data.image = $.extend(data.image, { id : $fid.val() });
			} else {
				data.image = $.extend(data.image, { id : void 0 });
			}

			// Title and Lead (fuck! I don't know why but contentedit directive sometimes makes noises Ã Â² _Ã Â² )
			if ($($element).find('.eb-title').length) {
				data.title = $($element).find('.eb-title').text();
			}
			if ($($element).find('.eb-lead').length) {
				data.lead = $($element).find('.eb-lead').text();
			}

			// Tags
			var tags = [];
			$.each($scope.tags, function() {
				tags.push(this.text);
			});
			data.tags    = tags;

			// Content
			data.content = self.editors.content.serialize()['editor-content'].value.replace(/contenteditable(=(\"|\')true(\"|\')|)/ig, ''); //revert this commit 1f38d8598b7cdb99e3dba420b6fe06b59a3101ac

			return data;
		};

		// ------------------------------------------------------------------------

		// Browse Cover Picture File
		$scope.browseFile = function (event) {
			var $el = $(event.currentTarget || event.srcElement);

			$el.parent('.fileupload-pool').find('.file-upload').trigger('click');
		};

		// ------------------------------------------------------------------------

		// Remove Preview
		$scope.removePreview = function(event) {
			var $el = $(event.currentTarget || event.srcElement);
			var id = $($el).closest('.on-preview').find("input[name='fid']").val();
			if(!$($el).closest('.eb-listicle-item')[0]){
				$scope.data.image.id = void 0;
			}
			if(!$scope.data.images){
				$scope.data.images = [];
			}
			$scope.data.images.push({id: id, destroy: true});
		};

		// ------------------------------------------------------------------------

		// Get Image from URL
		$scope.getImage = function(event) {
			var $el = $(event.currentTarget || event.srcElement);
		};

		// ------------------------------------------------------------------------

		// Set Channel
		$scope.setChannel = function($event, slug) {
			var $el = $($event.currentTarget || $event.srcElement);

			$scope.data.channel = {
				slug : slug,
				name : $el.text()
			}
			if(typeof toggleSelectCategory == 'function'){
				toggleSelectCategory();
			}
		};

		// ------------------------------------------------------------------------

		// Close Message popup
		$scope.closeMessage = function($event) {
			$scope.message = void 0;
		};

		// ------------------------------------------------------------------------
		// $timeout(function() {
		// 	// Title
		// 	var editor = new MediumEditor();
		// 	activateInsertPlugin($);

		// 	if ($element.find('.eb-title').length) {
		// 		var titleEditor = new $this.titleEditorApp($element.find('.eb-title'), {
		// 			placeholder: 'Title'
		// 		});

		// 		editors.title = titleEditor;
		// 	}

		// 	// Lead
		// 	if ($element.find('.eb-lead').length) {
		// 		var titleEditor = new $this.titleEditorApp($element.find('.eb-lead'), {
		// 			placeholder: 'Subtitle: it will be shown in feed'
		// 		});

		// 		editors.lead = titleEditor;
		// 	}

		// 	// Content
		// 	if ($element.find('.eb-article').length) {
		// 		var contentEditor = new MediumEditor('#editor-content', {
		// 			toolbar: {
		// 				buttons: ['bold', 'italic', 'underline', 'anchor', 'h1', 'h2', 'quote', "orderedlist", "unorderedlist"],
		// 			},
		// 			paste: {
		// 				cleanPastedHTML: true,
		// 				cleanTags: ["meta", "script", "style", "label"]
		// 			},
		// 			placeholder: {
		// 				text: 'Write your content here ------- block the text to show text tool'
		// 			}
		// 		});

		// 		$('#editor-content').mediumInsert(
		// 		{
		// 	        editor: contentEditor,
		// 	        addons: {
		// 	        	images: {
		// 	        		deleteScript: null,
		// 	        		autoGrid: 0,
		// 	        		fileUploadOptions: {
		// 	        			url: self.uploadCoverUrl+"?type=body",
		// 	        		},
		// 	        		styles: {
		// 	        		    wide: { label: '<span class="icon-align-justify"></span>' },
		// 	        		    left: null,//{ label: '<span class="icon-align-left"></span>' },
		// 	        		    right: { label: '<span class="icon-align-right"></span>' },
		// 	        		    grid: null
		// 	        		}
		// 	        	},
		// 	        	embeds: {
		// 	        		placeholder: 'Paste a YouTube, Facebook, Twitter, Instagram link/video and press Enter',
  //       					oembedProxy: '',
		// 	        		styles: {
		// 	        		    wide: null,
		// 	        		    left: null,
		// 	        		    right: null
		// 	        		}
		// 	        	},
		// 	        	embeds: {
		// 	        		placeholder: 'Paste a YouTube, Facebook, Twitter, Instagram link/video and press Enter',
  //       					oembedProxy: '',
		// 	        		styles: {
		// 	        		    wide: null,
		// 	        		    left: null,
		// 	        		    right: null
		// 	        		}
		// 	        	},
		// 	        }
		// 	    });

		// 		editors.content = contentEditor;
		// 	}

		// 	// ------------------------------------------------------------------------

		// 	// Set window.onbeforeunload (Simple, too lazy to check whether the content has been changed :P)
		// 	window.onbeforeunload = function() {
		// 		return 'Apa kamu yakin mau menutup post editor? Semua perubahan akan hilang! :(';
		// 	};
		// }, 50);
	}
}
export default ArticleEditors;