type TGroupUser = {
  total?: number;
  status?: Status[];
  roles?: Role[];
};

type TUserRole = {
  role?: number;
  name?: string;
  count?: number;
};

type TUserStatus = {
  status?: number;
  name?: string;
  count?: number;
};
