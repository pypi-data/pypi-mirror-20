'use strict';

SwaggerUi.Models.Oauth2Model = Backbone.Model.extend({
    defaults: {
        scopes: {}
    },

    initialize: function () {
        if(this.attributes && this.attributes.scopes) {
            var attributes = _.cloneDeep(this.attributes);
            var i, scopes = [];
            for(i in attributes.scopes) {
                var scope = attributes.scopes[i];
                if(typeof scope.description === 'string') {
                    scopes[scope] = attributes.scopes[i];
                    scopes.push(attributes.scopes[i]);
                }
            }
            attributes.scopes = scopes;
            this.attributes = attributes;
        }
        this.on('change', this.validate);
    },

    setScopes: function (name, val) {
        var auth = _.extend({}, this.attributes);
        var index = _.findIndex(auth.scopes, function(o) {
            return o.scope === name;
        });
        auth.scopes[index].checked = val;

        this.set(auth);
        this.validate();
    },

    validate: function () {
      var valid = false;
      var scp = this.get('scopes');
      var idx =  _.findIndex(scp, function (o) {
         return o.checked === true;
      });

      if(scp.length > 0 && idx >= 0) {
          valid = true;
      }

      if(scp.length === 0) {
          valid = true;
      }

      this.set('valid', valid);

      return valid;
    }
});
