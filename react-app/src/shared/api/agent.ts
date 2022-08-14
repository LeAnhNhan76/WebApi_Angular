import axios from "axios";
// import { AppActions } from "../../states/app/appSlice";
// import { store } from "../../states/store";

const errorHandler = (error: any, reject: any) => {
  reject(error);
}

const beforeRequest = () => {
  //store.dispatch(AppActions.showLoading())
}

const afterRequest = () => {
  //store.dispatch(AppActions.hiddenLoading())
}

const getAsync = (uri: any) => {
  beforeRequest();
  return new Promise((resolve, reject) => {
    axios
      .get(uri)
      .then((result) => resolve(result.data))
      .catch((error) => errorHandler(error, reject))
      .finally(afterRequest);
  });
};

const getWithParamsAsync = (uri: any, params: any, paramsSerializer: any) => {
  beforeRequest();
  return new Promise((resolve, reject) => {
    axios
      .get(uri, {
        params: params,
        paramsSerializer: paramsSerializer,
      })
      .then((result) => resolve(result.data))
      .catch((error) => errorHandler(error, reject))
      .finally(afterRequest);
  });
}

const getWithoutLoadingAsync = (uri: any) => {
  return new Promise((resolve, reject) => {
    axios
      .get(uri)
      .then((result) => resolve(result.data))
      .catch((error) => errorHandler(error, reject));
  });
};

const getWithParamsWithoutLoadingAsync = (uri: any, params: any) => {
  return new Promise((resolve, reject) => {
    axios
      .get(uri, {
        params: params,
      })
      .then((result) => resolve(result.data))
      .catch((error) => errorHandler(error, reject));
  });
};

const postAysnc = (uri: any, obj: any) => {
  beforeRequest();
  return new Promise((resolve, reject) => {
    axios
      .post(uri, obj)
      .then(resolve)
      .catch((error) => errorHandler(error, reject))
      .finally(afterRequest);
  });
};

const postWithoutLoadingAsync = (uri: any, obj: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(uri, obj)
      .then(resolve)
      .catch((error) => errorHandler(error, reject));
  });
};

const postMultipartAsync = (uri: any, formData: any) => {
  var ax = axios.create({
    headers: {
      "content-type": "multipart/form-data"
    }
  });
  return new Promise((resolve, reject) => {
    ax
      .post(uri, formData)
      .then(resolve)
      .catch((error) => errorHandler(error, reject));
  });
}

const putAsync = (uri: any, obj: any, params: any) => {
  beforeRequest();
  return new Promise((resolve, reject) => {
    axios
      .put(uri, obj, {
        params,
      })
      .then(resolve)
      .catch((error) => errorHandler(error, reject))
      .finally(afterRequest);
  });
};

const patchAsync = (uri: any, obj: any) => {
  beforeRequest();
  return new Promise((resolve, reject) => {
    axios
      .patch(uri, obj)
      .then(resolve)
      .catch((error) => errorHandler(error, reject))
      .finally(afterRequest);
  });
};

const deleteAsync = (uri: any) => {
  beforeRequest();
  return new Promise((resolve, reject) => {
    axios
      .delete(uri)
      .then(resolve)
      .catch((error) => errorHandler(error, reject))
      .finally(afterRequest);
  })
}

export const apiService = {
  getAsync,
  getWithParamsAsync,
  getWithoutLoadingAsync,
  getWithParamsWithoutLoadingAsync,
  postAysnc,
  postWithoutLoadingAsync,
  postMultipartAsync,
  putAsync,
  patchAsync,
  deleteAsync
}