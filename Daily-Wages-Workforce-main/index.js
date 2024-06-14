"use strict";

class FireAnalytics {
    constructor(endpoint, apiKey, appName='default') {
        this.endpoint = endpoint;
        this.apiKey = apiKey;
        this.appName = appName;
    }

    sendEvent(content = null, sendBeacon = false) {
        if(content != null) {
            var headers = {
                'x-api-key': this.apiKey 
            };
            var data = JSON.stringify(content);
            content['app_name'] = this.appName;
            if(sendBeacon && window.navigator && window.navigator.sendBeacon) {
                if(window.navigator.sendBeacon(this.endpoint, new Blob([data], headers)))
                    return;
            }
            fetch(this.endpoint, {
                method: 'POST',
                headers: headers,
                body: data
            })
                .then(function (response) {})
                .catch(function (err) {})
        }
    }
}

module.exports = (endpoint, apiKey, appName) => {
    return new FireAnalytics (endpoint, apiKey, appName)
};