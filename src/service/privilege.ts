const Privilege = {
  /**
   * user privilege settings
   * @param list role list
   * @param role
   */
  hasPrivilege(list, role) {
    let has = false;
    if (list instanceof Array) {
      list.some(r => {
        if ((r & role) > 0) {
          has = true;
          return;
        }
      });
    } else {
      has = (list & role) > 0;
    }
    return has;
  },
};

export default Privilege;
