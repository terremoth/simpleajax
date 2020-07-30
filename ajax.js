export default function ajax(params, callback) {
    function objToParams(obj){
      return "?" + Object
            .keys(obj)
            .map(function(key){
              return key+"="+obj[key];
            })
            .join("&");
    }

    params = params || {};
    var ajaxParams = {
        method      : params.method       || 'get',
        url         : params.url          || location.href,
        async       : params.async        || true,
        user        : params.user         || undefined,
        pass        : params.pass         || undefined,
        headers     : params.header       || {},
        data        : params.data         || false,
        dataType    : params.dataType     || 'text',
        as          : params.as           || 'text'
    };
    
    var ajax = new XMLHttpRequest();
    callback = callback || function(data){return data;};
    
    ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            if (typeof callback === 'function') {
                callback(this.responseText);
            } else {
                ___CACHE.push(this.responseText);
            }
            return true;
        }
    };
    var method = ajaxParams.method.toLowerCase();
    
    if (method === 'get' && ajaxParams.data) {
        if (typeof ajaxParams.data === 'object') { 
            ajaxParams.data = objToParams(ajaxParams.data);
            ajaxParams.url = ajaxParams.url+ajaxParams.data;
        } 
    }
    
    ajax.open(ajaxParams.method, ajaxParams.url, ajaxParams.async);
    
    if (method === 'post') {
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }
    
    if ( ! objEmpty(ajaxParams.headers)) {
        var headers = ajaxParams.headers, header;
        for (header in headers) {
            ajax.setRequestHeader(header, headers[header]);
        };
    }

    ajax.send(ajaxParams.data);
}
