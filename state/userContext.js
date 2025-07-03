let currentUserId = null;

module.exports = {
  setUserId: (id) => {
    currentUserId = id;
  },
  getUserId: () => currentUserId,
};
