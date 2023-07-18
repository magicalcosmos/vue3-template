import request from '@/utils/request';

export default function crud(prefix) {
  var path = prefix;
  if (path.indexOf('/') !== 0) {
    path = prefix;
  }

  return {
    filter: function(params) {
      // console.log('api filter')
      return request.get(path, { params: params });
    },
    delete: function(id) {
      return request.delete(path + '/' + id);
    },
    get: function(id) {
      return request.get(path + '/' + id);
    },
    create: function(domain) {
      return request.post(path, domain);
    },
    update: function(domain) {
      return request.put(path + '/' + domain.id, domain);
    }
  };
}
