angular.module('jucardi-multiselect-dropdown', []).directive('multiselectDropdown', function(){
    var directive = {
        scope:{           
            model: '=',
            options: '=',
            onChanged: '=',
            settings: '=',
            label: '='
        },
        templateUrl: '../src/multiselect-dropdown.html',
        controller: ['$scope', function($scope){
            var map = {};

            function init() {
                if ($scope.settings                == null) $scope.settings                = {};
                if ($scope.settings.singleSelect   == null) $scope.settings.singleSelect   = false;
                if ($scope.settings.defaultText    == null) $scope.settings.defaultText    = 'Select';
                if ($scope.settings.selectedMode   == null) $scope.settings.selectedMode   = 'default';
                if ($scope.settings.width          == null) $scope.settings.width          = 0;
                if ($scope.settings.labelBreakLine == null) $scope.settings.labelBreakLine = false;
                
                $scope.btnStyle = { }
                
                if ($scope.settings.width > 0)
                    $scope.btnStyle['width'] = $scope.settings.width + 'px';
                    
                if ($scope.settings.labelBreakLine)
                    $scope.btnStyle['clear'] = 'both';
            }
            
            // Public Methods
            
            function selectAll() {
                clear();
                for (var i=0; i < $scope.options.length; i++) {
                    $scope.model.push($scope.options[i].value);
                }
                onChanged();
            }
            
            function deselectAll() {
                clear();
                onChanged();
            }
            
            function setSelectedItem(value){
                if ($scope.settings.singleSelect) $scope.model = [];
                var index = getSelectedIndex(value);

                if (index >= 0) {
                    $scope.model.splice(index, 1);
                    
                } else {
                    $scope.model.push(value);
                }
                onChanged();
            }
            
            function isSelected(value) {
                return getSelectedIndex(value) >= 0;
            }
            
            function getDisplayText() {
                if ($scope.settings.selectedMode == 'labels') return getLabels();
                if ($scope.settings.selectedMode == 'count')  return getCountText();
                
                return $scope.settings.defaultText;
            }
            
            // Private Methods
            
            function clear() {
                var amount = $scope.model.length;
                for (var i=0; i < amount; i++) {
                    $scope.model.splice(0, 1);
                }
            }
            
            function getSelectedIndex(value) {
                for (var i=0; i < $scope.model.length; i++) {
                    if (value === $scope.model[i]) return i;
                }
                
                return -1;
            }
            
            function onChanged() {
                if ($scope.onChanged != null) $scope.onChanged();
            }
            
            function getLabels() {
                if ($scope.model.length == $scope.options.length) return 'All selected';

                var labels = [];
                for (var i=0; i < $scope.model.length; i++) {
                    labels.push(map[$scope.model[i]]);
                }
                
                return labels.length > 0 ? labels.join(', ') : $scope.settings.defaultText;
            }
            
            function getCountText() {
                if ($scope.model.length == $scope.options.length) return 'All selected';
                return $scope.model.length > 0 ? $scope.model.length + ' selected' : $scope.settings.defaultText;
            }

            function generateMap() {
                map = {};
                for (var i=0; i < $scope.options.length; i++) {
                    map[$scope.options[i].value] = $scope.options[i].label;
                }
            }
            
            $scope.$watch('options', generateMap);

            angular.extend($scope, {
                selectAll:       selectAll,
                deselectAll:     deselectAll,
                setSelectedItem: setSelectedItem,
                isSelected:      isSelected,
                getDisplayText:  getDisplayText
            });
            
            init();
       }]
   };
   
   return directive;
});