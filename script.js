let url = new URL('http://localhost:3000/posts');
let author = document.getElementById('author');
let formId = document.getElementById('formId');
let ul = document.getElementById('info');
let submit = document.getElementById('submit');

let getJSON = function(url, data) {
  return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr = typeof XMLHttpRequest != 'undefined'
      ? new XMLHttpRequest() : new ActiveXObject(
        'Microsoft.XMLHTTP'
      )
      xhr.open('get', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
          let status = xhr.status;
          if(status === 200) {
            console.log(`We have your info succsesfuly: ${url}`);
            resolve(xhr.response);
          } else {
            reject(status);
          }       
      };
      xhr.onprogress = function (event) {
        if(event.lengthComputable) {
          console.log(`Got it from ${event.loaded} from ${event.total}`);
        } else {
          console.log(`Get ${event.loaded}`);
        }
      };
      
      xhr.onerror = function() {
          reject(`Error fetching ${url}`);
      };
      xhr.send(data);
  });
};

getJSON(url)
.then(function (data) {
  console.log('Success', data);
  let output = '<ul> info';
  for(let i in data) {
    output += '<li>' + data[i].tittle + ' ' + data[i].author + ' ' + 'id' + data[i].id + '</li>';
  }
  output += '</ul>';
  let ul = document.getElementById('info');
  ul.innerHTML = output; 
}, function (status) {
    console.log(`Epic Fail of ${status}`);
  });

let saveJSON = function(url, data) {
  return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr = typeof XMLHttpRequest != 'undefined'
      ? new XMLHttpRequest() : new ActiveXObject(
        'Microsoft.XMLHTTP'
      )
      xhr.open('post', url, true);
      xhr.setRequestHeader(
          'Content-type', 'application/json; charset=utf-8'
      );

      xhr.responseType = 'json';

      xhr.onload = function() {
          let status = xhr.status;
          if(status === 200) {
            console.log(`We have your info succsesfuly: ${url}`);
            resolve(xhr.response);
          } else {
            reject(status);
          } 
      };
      xhr.onerror = function(e) {
          reject(`Error fetching ${url}` );
      };
      xhr.send(data);
  });
};

let getFormData = function(form) {
  let obj = {};
  let elements = form;
  for(let i = 0; i < elements.lenght; ++i) {
    let element = elements[i];
    let name = element.name;
    let value = element.value;
    if(name) {
      obj[name] = value;
    };
  };
  return obj;
}

let form = document.forms.info;
form.addEventListener('submit', () => {
  saveJSON(url, JSON.stringify(
    getFormData(form)
  ))
  .then(() => url.innerHTML = getFormData)
  .catch(error => console.log('Something went wrong', error))
});