angular
	.module('uai.module.core')
	.factory('TranslationService', function($http) {
		
		var TranslationService = {};

		TranslationService.read = function() {
			return $http.get('translations.json');
		}

		return TranslationService;
	})