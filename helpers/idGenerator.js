const { v4: uuidv4 } = require('uuid');

    const idGenerator = () => {
      const id = uuidv4()
      return id;
    }

    module.exports = idGenerator