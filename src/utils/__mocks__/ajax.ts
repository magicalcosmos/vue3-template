export const mockStatus = {
  success: true,
};

const func = (params: any, bool?: Function) => {
  return new Promise((resolve, reject) => {
    const data: any = {
      data: params,
    };
    if (bool !== undefined) {
      data.isQuery = bool;
    }
    if (mockStatus.success) {
      resolve(data);
    } else {
      reject();
    }
  });
};
export default {
  get: func,
  post: func,
  put: func,
  delete: func,
};
